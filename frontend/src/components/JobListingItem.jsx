import styles from "../styles/JobListingItem.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaBriefcase } from "react-icons/fa";

export default function JobListingItem({ job }) {
  const [searchParams] = useSearchParams();
  const [imgError, setImgError] = useState(false);

  return (
    <div className={styles.jobItem}>
      {job.imageUrl && !imgError ? (
        <img
          src={job.imageUrl}
          alt={`${job.company} logo`}
          className={styles.companyLogo}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={styles.companyLogoPlaceholder} aria-hidden="true">
          <FaBriefcase className={styles.placeholderIcon} />
        </div>
      )}
      <div className={styles.jobInfo}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.companyName}>{job.company}</p>
        <p className={styles.location}>
          {job.cityState} ({job.type})
        </p>
      </div>
      <div className={styles.actions}>
        <Link
          to={`/vagas/${encodeURIComponent(job.id)}?${searchParams.toString()}`}
          className={styles.detailsButton}
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
