import styles from "../styles/Hero.module.css"

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Image Processing Lab</h1>
        <p className={styles.subtitle}>Transform your images with powerful filters and effects</p>
        <a href="#processor" className={styles.cta}>
          Start Processing
        </a>
      </div>
      <div className={styles.overlay}></div>
    </div>
  )
}

export default Hero