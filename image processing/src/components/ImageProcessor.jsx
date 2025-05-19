"use client"

import { useState, useRef } from "react"
import FilterTabs from "./FilterTabs"
import styles from "../styles/ImageProcessor.module.css"

function ImageProcessor({ selectedImage, setSelectedImage, processedImage, setProcessedImage }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.match("image.*")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.match("image.*")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFilterApply = (filterName) => {
    if (!selectedImage) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      // In a real app, this would call your backend API
      // For now, we'll just simulate the filter effect
      simulateFilterEffect(filterName)
      setIsProcessing(false)
    }, 1000)
  }

  const simulateFilterEffect = (filterName) => {
    // This is a placeholder for the actual API call
    // In a real app, you would send the image to your Python backend
    console.log(`Applying filter: ${filterName}`)

    // For demo purposes, we're just setting the processed image to be the same as the original
    // In a real app, this would be the response from your backend
    setProcessedImage(selectedImage)
  }

  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "processed-image.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div id="processor" className={styles.processor}>
      <div className={styles.container}>
        <h2 className={styles.title}>Image Processor</h2>

        <div className={styles.workspace}>
          <div className={styles.uploadSection}>
            <div
              className={styles.uploadArea}
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!selectedImage ? (
                <div className={styles.uploadPrompt}>
                  <svg
                    className={styles.uploadIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p>Click to upload or drag and drop</p>
                  <span>SVG, PNG, JPG or GIF (max. 10MB)</span>
                </div>
              ) : (
                <img src={selectedImage || "/placeholder.svg"} alt="Selected" className={styles.previewImage} />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className={styles.fileInput}
              />
            </div>

            {selectedImage && (
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSelectedImage(null)
                  setProcessedImage(null)
                }}
              >
                Reset
              </button>
            )}
          </div>

          <div className={styles.resultsSection}>
            {isProcessing ? (
              <div className={styles.processing}>
                <div className={styles.spinner}></div>
                <p>Processing image...</p>
              </div>
            ) : processedImage ? (
              <>
                <div className={styles.resultImageContainer}>
                  <img src={processedImage || "/placeholder.svg"} alt="Processed" className={styles.resultImage} />
                </div>
                <button className={styles.downloadButton} onClick={handleDownload}>
                  Download
                </button>
              </>
            ) : (
              <div className={styles.noResult}>
                <p>Processed image will appear here</p>
              </div>
            )}
          </div>
        </div>

        <FilterTabs onFilterSelect={handleFilterApply} disabled={!selectedImage || isProcessing} />
      </div>
    </div>
  )
}

export default ImageProcessor