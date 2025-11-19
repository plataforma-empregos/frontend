import styles from "../styles/JobSkeleton.module.css";

export default function JobSkeleton() {
  return (
    <div className={`${styles.skeletonItem} ${styles.circle}`}>
      <div className={`${styles.circle} ${styles.logoCircle}`}></div>

      <div className={styles.content}>
        <div className={`${styles.line} ${styles.titleLine}`}></div>
        <div className={`${styles.line} ${styles.textLine}`}></div>
        <div
          className={`${styles.line} ${styles.textLine}`}
          style={{ width: "20%" }}
        ></div>
      </div>

      <div className={`${styles.line} ${styles.btnBox}`}></div>
    </div>
  );
}
