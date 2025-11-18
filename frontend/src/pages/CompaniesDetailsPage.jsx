import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JobListingItem from "../components/JobListingItem";
import styles from "../styles/CompaniesDetailsPage.module.css";
import api from "../services/api";

const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const CompanyDetailsPage = () => {
  const { slug } = useParams();

  const [companyDetails, setCompanyDetails] = useState(null);
  const [jobsFromThisCompany, setJobsFromThisCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/external-jobs", {
          params: { keyword: slug.replace(/-/g, " "), limit: 50 },
        });

        const allJobs = response.data?.data || [];

        const firstJobOfCompany = allJobs.find(
          (job) => generateSlug(job.company) === slug
        );

        if (!firstJobOfCompany) {
          throw new Error("Empresa não encontrada");
        }

        setCompanyDetails({
          name: firstJobOfCompany.company,
          location: firstJobOfCompany.cityState,
          imageUrl: firstJobOfCompany.imageUrl,

          description:
            firstJobOfCompany.description || "Nenhuma descrição disponível.",
        });

        const filteredJobs = allJobs.filter(
          (job) => job.company === firstJobOfCompany.company
        );
        setJobsFromThisCompany(filteredJobs);
      } catch (err) {
        console.error("Erro ao buscar detalhes da empresa:", err);
        setError("Empresa não encontrada.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <p className={styles.loadingMessage}>Carregando...</p>
      </div>
    );
  }

  if (error || !companyDetails) {
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
            // Reutiliza o JobListingItem
            <JobListingItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyDetailsPage;
