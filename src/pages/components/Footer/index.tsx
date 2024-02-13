import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.createdBy}>Created by Andrea</p>
      <p className={styles.footerText}>©Forecast Hub 2024</p>
    </footer>
  )
}