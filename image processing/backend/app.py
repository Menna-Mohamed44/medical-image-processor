from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
import io
import base64
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Your image processing functions
def warpaffine(image):
    rows, cols, ch = image.shape
    pts1 = np.float32([[50, 50], [200, 50], [50, 200]])
    pts2 = np.float32([[50, 100], [200, 50], [150, 200]])
    points = cv2.getAffineTransform(pts1, pts2)
    img = cv2.warpAffine(image, points, (cols, rows))
    return img

def edge_detection(image):
    edges = cv2.Canny(image, 40, 80, L2gradient=True)
    # Convert to 3 channels for consistency
    edges_3channel = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
    return edges_3channel

def gray_scale(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Convert to 3 channels for consistency
    gray_3channel = cv2.cvtColor(gray_image, cv2.COLOR_GRAY2BGR)
    return gray_3channel

def negative_transformation(image):
    height, width, _ = image.shape
    for i in range(0, height-1):
        for j in range(0, width-1):
            pixel = image[i, j]
            pixel[0] = 255 - pixel[0]
            pixel[1] = 255 - pixel[1]
            pixel[2] = 255 - pixel[2]
    return image

def Gaussian_Blur(image):
    blur = cv2.GaussianBlur(image, (5, 5), cv2.BORDER_DEFAULT)
    return blur

def reduce_noise(image):
    noiseless_image_colored = cv2.fastNlMeansDenoisingColored(image, None, 20, 20, 7, 21)
    return noiseless_image_colored

def sharp_image(image):
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    image_sharp = cv2.filter2D(src=image, ddepth=-1, kernel=kernel)
    return image_sharp

# Helper function to convert base64 to OpenCV image
def base64_to_cv2(base64_string):
    # Remove data URL prefix if present
    if 'base64,' in base64_string:
        base64_string = base64_string.split('base64,')[1]
    
    # Decode base64 string
    img_data = base64.b64decode(base64_string)
    
    # Convert to numpy array
    nparr = np.frombuffer(img_data, np.uint8)
    
    # Decode image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

# Helper function to convert OpenCV image to base64
def cv2_to_base64(image):
    # Convert image to PNG
    _, buffer = cv2.imencode('.png', image)
    
    # Convert to base64
    base64_string = base64.b64encode(buffer).decode('utf-8')
    
    # Add data URL prefix
    return f"data:image/png;base64,{base64_string}"

@app.route('/process-image', methods=['POST'])
def process_image():
    # Get filter type and image from request
    data = request.json
    filter_type = data.get('filter')
    image_data = data.get('image')
    
    if not filter_type or not image_data:
        return jsonify({'error': 'Missing filter type or image data'}), 400
    
    try:
        # Convert base64 to OpenCV image
        image = base64_to_cv2(image_data)
        
        # Apply selected filter
        if filter_type == 'warpaffine':
            processed_image = warpaffine(image)
        elif filter_type == 'edge_detection':
            processed_image = edge_detection(image)
        elif filter_type == 'gray_scale':
            processed_image = gray_scale(image)
        elif filter_type == 'negative_transformation':
            processed_image = negative_transformation(image)
        elif filter_type == 'Gaussian_Blur':
            processed_image = Gaussian_Blur(image)
        elif filter_type == 'reduce_noise':
            processed_image = reduce_noise(image)
        elif filter_type == 'sharp_image':
            processed_image = sharp_image(image)
        else:
            return jsonify({'error': 'Invalid filter type'}), 400
        
        # Convert processed image to base64
        result_image = cv2_to_base64(processed_image)
        
        return jsonify({'processedImage': result_image})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)