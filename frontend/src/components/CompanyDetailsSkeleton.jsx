import styles from "../styles/CompanyDetailsSkeleton.module.css";

export default function CompanyDetailsSkeleton() {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.grayBlock}`}
        style={{ width: "150px", height: "20px", marginBottom: "1rem" }}
      ></div>

      <div className={styles.headerSkeleton}>
        <div className={`${styles.grayBlock} ${styles.logoBox}`}></div>
        <div className={styles.infoBox}>
          <div className={`${styles.grayBlock} ${styles.titleLine}`}></div>
          <div className={`${styles.grayBlock} ${styles.locationLine}`}></div>
        </div>
      </div>

      <div className={styles.descSection}>
        <div className={`${styles.grayBlock} ${styles.descLine}`}></div>
        <div className={`${styles.grayBlock} ${styles.descLine}`}></div>
        <div
          className={`${styles.grayBlock} ${styles.descLine} ${styles.short}`}
        ></div>
      </div>

      <div
        className={`${styles.grayBlock}`}
        style={{ width: "300px", height: "24px", marginBottom: "1.5rem" }}
      ></div>

      <div className={styles.jobsListSkeleton}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.jobItemSkeleton}>
            <div className={`${styles.grayBlock} ${styles.jobLogo}`}></div>
            <div className={styles.jobContent}>
              <div className={`${styles.grayBlock} ${styles.jobTitle}`}></div>
              <div className={`${styles.grayBlock} ${styles.jobMeta}`}></div>
            </div>
            <div className={`${styles.grayBlock} ${styles.jobButton}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
