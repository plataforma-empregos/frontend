import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockJobs } from "../data/mockJobs";
import JobListingItem from "../components/JobListingItem";
import styles from "../styles/CompaniesDetailsPage.module.css";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const CompanyDetailsPage = () => {
  const { slug } = useParams();

  const firstJobOfCompany = mockJobs.find(
    (job) => generateSlug(job.company) === slug
  );

  if (!firstJobOfCompany) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Empresa não encontrada</h1>
        <p className={styles.pageSubtitle}>
          O link que você tentou acessar não existe.
        </p>
        <Link to="/companies" className={styles.backLink}>
          &larr; Voltar para a lista de empresas
        </Link>
      </div>
    );
  }

  const companyDetails = {
    name: firstJobOfCompany.company,
    location: firstJobOfCompany.cityState,
    imageUrl: firstJobOfCompany.imageUrl,
    description:
      "Empresa especializada em soluções inovadoras no setor de tecnologia, comprometida com a excelência e o desenvolvimento contínuo de seus colaboradores.",
  };

  const jobsFromThisCompany = mockJobs.filter(
    (job) => job.company === companyDetails.name
  );

  return (
    <div className={styles.pageContainer}>
      <Link to="/companies" className={styles.backLink}>
        &larr; Voltar para a lista de empresas
      </Link>

      <header className={styles.companyHeader}>
        <img
          src={companyDetails.imageUrl}
          alt={`${companyDetails.name} logo`}
          className={styles.companyLogo}
        />
        <div className={styles.companyInfo}>
          <h1 className={styles.companyName}>{companyDetails.name}</h1>
          <p className={styles.companyLocation}>{companyDetails.location}</p>
        </div>
        <p className={styles.companyDescription}>
          {companyDetails.description}
        </p>
      </header>

      <section className={styles.jobsSection}>
        <h2 className={styles.jobsTitle}>
          Vagas Abertas em {companyDetails.name}
        </h2>

        <div className={styles.jobsList}>
          {jobsFromThisCompany.map((job) => (
            <JobListingItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyDetailsPage;
