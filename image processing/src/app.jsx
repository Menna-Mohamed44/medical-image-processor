"use client"

import { useState } from "react"
import Hero from "./components/Hero"
import ImageProcessor from "./components/ImageProcessor"
import Instructions from "./components/Instructions"
import styles from "./styles/App.module.css"

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)

  return (
    <div className={styles.app}>
      <Hero />
      <Instructions />
      <ImageProcessor
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        processedImage={processedImage}
        setProcessedImage={setProcessedImage}
      />
    </div>
  )
}

export default App