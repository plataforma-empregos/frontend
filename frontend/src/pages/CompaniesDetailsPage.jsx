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

  const companyNameFromSlug = slug.replace(/-/g, " ");

  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("/external-jobs", {
          params: {
            keyword: companyNameFromSlug,
            limit: 100,
          },
        });

        const allJobs = response.data?.data || [];

        if (allJobs.length === 0) {
          throw new Error("Nenhuma vaga encontrada");
        }

        const firstJob = allJobs.find(
          (job) => generateSlug(job.company) === slug
        );

        if (!firstJob) {
          throw new Error("Empresa não encontrada");
        }

        const details = {
          name: firstJob.company,
          location: firstJob.cityState,
          imageUrl: firstJob.imageUrl,
          description: firstJob.description || "Nenhuma descrição disponível.",
        };

        setCompanyDetails(details);

        const filteredJobs = allJobs.filter(
          (job) => job.company === details.name
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
  }, [slug, companyNameFromSlug]);

  if (isLoading) {
    return (
      <div className={styles.LoadingErrorContainer}>
        <p className={styles.loadingMessage}>Carregando...</p>
      </div>
    );
  }

  if (error || !companyDetails) {
    return (
      <div className={styles.LoadingErrorContainer}>
        <h1 className={styles.pageTitle}>Empresa não encontrada</h1>
        <p className={styles.pageSubtitle}>
          Não conseguimos encontrar informações sobre esta empresa.
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
      </header>

      <p className={styles.companyDescription}>{companyDetails.description}</p>

      <section className={styles.jobsSection}>
        <h2 className={styles.jobsTitle}>
          Vagas abertas em {companyDetails.name}
        </h2>

        {jobsFromThisCompany.length === 0 ? (
          <p className={styles.noJobs}>
            Nenhuma vaga encontrada para esta empresa no momento.
          </p>
        ) : (
          <div className={styles.jobsList}>
            {jobsFromThisCompany.map((job) => (
              <JobListingItem key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CompanyDetailsPage;
