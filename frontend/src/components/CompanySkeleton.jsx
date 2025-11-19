import styles from "../styles/CompanySkeleton.module.css";

export default function CompanySkeleton() {
  return (
    <div className={styles.skeletonItem}>
      <div className={`${styles.grayBlock} ${styles.logoCircle}`}></div>

      <div className={styles.content}>
        <div className={`${styles.grayBlock} ${styles.titleLine}`}></div>
        <div className={`${styles.grayBlock} ${styles.locationLine}`}></div>
      </div>
    </div>
  );
}
