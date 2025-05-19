"use client"

import { useState } from "react"
import styles from "../styles/FilterTabs.module.css"

function FilterTabs({ onFilterSelect, disabled }) {
  const [activeTab, setActiveTab] = useState("basic")

  const filters = {
    basic: [
      { id: "gray_scale", name: "Grayscale", description: "Convert image to grayscale" },
      { id: "negative_transformation", name: "Negative", description: "Invert all colors in the image" },
      { id: "edge_detection", name: "Edge Detection", description: "Detect and highlight edges in the image" },
    ],
    enhance: [
      { id: "Gaussian_Blur", name: "Gaussian Blur", description: "Apply a gaussian blur effect" },
      { id: "reduce_noise", name: "Reduce Noise", description: "Remove noise from the image" },
      { id: "sharp_image", name: "Sharpen", description: "Enhance image details and edges" },
    ],
    transform: [{ id: "warpaffine", name: "Warp Affine", description: "Apply geometric transformation to the image" }],
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.filterTabs}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "basic" ? styles.active : ""}`}
          onClick={() => handleTabChange("basic")}
        >
          Basic Filters
        </button>
        <button
          className={`${styles.tab} ${activeTab === "enhance" ? styles.active : ""}`}
          onClick={() => handleTabChange("enhance")}
        >
          Enhancement
        </button>
        <button
          className={`${styles.tab} ${activeTab === "transform" ? styles.active : ""}`}
          onClick={() => handleTabChange("transform")}
        >
          Transformation
        </button>
      </div>

      <div className={styles.filterGrid}>
        {filters[activeTab].map((filter) => (
          <div
            key={filter.id}
            className={`${styles.filterCard} ${disabled ? styles.disabled : ""}`}
            onClick={() => !disabled && onFilterSelect(filter.id)}
          >
            <h3>{filter.name}</h3>
            <p>{filter.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterTabs