import styles from "../styles/JobListingItem.module.css";
import { Link } from "react-router-dom";

export default function JobListingItem({ job }) {
  return (
    <div className={styles.jobItem}>
      <img
        src={job.imageUrl || "https://via.placeholder.com/60"}
        alt={`${job.company} logo`}
        className={styles.companyLogo}
      />
      <div className={styles.jobInfo}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.companyName}>{job.company}</p>
        <p className={styles.location}>
          {job.cityState} ({job.type})
        </p>
      </div>
      <div className={styles.actions}>
        <Link to={`/vagas/${job.id}`} className={styles.detailsButton}>
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
