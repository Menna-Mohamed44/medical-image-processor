import styles from "../styles/Instructions.module.css"

function Instructions() {
  return (
    <div className={styles.instructions}>
      <div className={styles.container}>
        <h2 className={styles.title}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Upload Your Image</h3>
            <p>Click the upload area or drag and drop an image file to get started.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Select a Filter</h3>
            <p>Choose from various filters in the tabs section to apply different effects.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Download Result</h3>
            <p>Once you're satisfied with the result, download your processed image.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions