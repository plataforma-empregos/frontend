import React from "react";
import { Link } from "react-router-dom";
import { mockJobs } from "../data/mockJobs";
import styles from "../styles/CompaniesPage.module.css";

const companyMap = new Map();

mockJobs.forEach((job) => {
  if (!companyMap.has(job.company)) {
    companyMap.set(job.company, {
      name: job.company,
      location: job.cityState,
      imageUrl: job.imageUrl,
      slug: job.company
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    });
  }
});

const uniqueCompanies = Array.from(companyMap.values());

export default function CompaniesPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Empresas Parceiras</h1>
      <p className={styles.pageSubtitle}>
        Veja as empresas que estão contratando na plataforma.
      </p>

      <div className={styles.companyList}>
        {uniqueCompanies.map((company) => (
          <Link
            to={`/companies/${company.slug}`}
            key={company.slug}
            className={styles.companyCard}
          >
            <img
              src={company.imageUrl}
              alt={`${company.name} logo`}
              className={styles.companyLogo}
            />
            <div className={styles.companyInfo}>
              <h2 className={styles.companyName}>{company.name}</h2>
              <p className={styles.companyLocation}>{company.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
