import styles from "../styles/JobDetailsSkeleton.module.css";

export default function JobDetailsSkeleton() {
  return (
    <div className={styles.container}>
      <div className={`${styles.backLinkSkeleton} ${styles.grayBlock}`}></div>

      <div className={styles.cardSkeleton}>
        <div className={styles.header}>
          <div className={`${styles.grayBlock} ${styles.logoBox}`}></div>
          <div className={styles.titleGroup}>
            <div className={`${styles.grayBlock} ${styles.titleLine}`}></div>
            <div className={`${styles.grayBlock} ${styles.subTitleLine}`}></div>
            <div className={`${styles.grayBlock} ${styles.metaLine}`}></div>
          </div>
        </div>

        <div className={`${styles.grayBlock} ${styles.sectionTitle}`}></div>

        <div className={`${styles.grayBlock} ${styles.descLine}`}></div>
        <div className={`${styles.grayBlock} ${styles.descLine}`}></div>
        <div className={`${styles.grayBlock} ${styles.descLine}`}></div>
        <div
          className={`${styles.grayBlock} ${styles.descLine} ${styles.short}`}
        ></div>
        <div className={`${styles.grayBlock} ${styles.descLine}`}></div>
        <div
          className={`${styles.grayBlock} ${styles.descLine} ${styles.short}`}
        ></div>

        <div className={`${styles.grayBlock} ${styles.buttonBox}`}></div>
      </div>
    </div>
  );
}
