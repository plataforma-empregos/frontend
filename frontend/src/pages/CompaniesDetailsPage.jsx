/* src/pages/CompanyDetailsPage.jsx (REFATORADO PARA API) */

import React, { useState, useEffect } from "react"; // 1. Importa hooks
import { useParams, Link } from "react-router-dom";
// import { mockJobs } from "../data/mockJobs"; // <-- Removido
import JobListingItem from "../components/JobListingItem";
import styles from "../styles/CompaniesDetailsPage.module.css";
import api from "../services/api"; // 2. Importa sua instância 'api'

// 3. Função de slug (idêntica à da CompaniesPage)
const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const CompanyDetailsPage = () => {
  const { slug } = useParams();

  // 4. Estados para loading e dados
  const [companyDetails, setCompanyDetails] = useState(null);
  const [jobsFromThisCompany, setJobsFromThisCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 5. Efeito para buscar os dados da API
  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        // Busca vagas (usamos o 'slug' como 'keyword',
        // ou um termo genérico se o slug for muito específico)
        const response = await api.get("/external-jobs", {
          params: { keyword: slug.replace(/-/g, " "), limit: 50 },
        });

        const allJobs = response.data?.data || [];

        // 6. Reutiliza sua lógica original para encontrar a empresa
        const firstJobOfCompany = allJobs.find(
          (job) => generateSlug(job.company) === slug
        );

        if (!firstJobOfCompany) {
          throw new Error("Empresa não encontrada");
        }

        // 7. Define os detalhes da empresa
        setCompanyDetails({
          name: firstJobOfCompany.company,
          location: firstJobOfCompany.cityState,
          imageUrl: firstJobOfCompany.imageUrl,
          description:
            "Empresa especializada em soluções inovadoras no setor de tecnologia, comprometida com a excelência e o desenvolvimento contínuo de seus colaboradores.",
        });

        // 8. Define as vagas desta empresa
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
  }, [slug]); // Roda sempre que o slug da URL mudar

  // 9. Renderização (com loading e erro)
  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Carregando...</h1>
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
