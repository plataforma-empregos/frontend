/* src/pages/CompaniesPage.jsx (REFATORADO PARA API) */

import React, { useState, useEffect } from "react"; // 1. Importa hooks
import { Link } from "react-router-dom";
// import { mockJobs } from "../data/mockJobs"; // <-- Removido
import styles from "../styles/CompaniesPage.module.css";
import api from "../services/api"; // 2. Importa sua instância 'api'

// 3. Função para gerar slug (movida para dentro ou fora do componente)
const generateSlug = (name) => {
  if (!name) return ""; // Proteção contra nomes indefinidos
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export default function CompaniesPage() {
  // 4. Estados para loading e dados
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 5. Efeito para buscar os dados da API
  useEffect(() => {
    const fetchCompaniesFromJobs = async () => {
      setIsLoading(true);
      try {
        // Busca vagas (usamos 'developer' como termo genérico
        // e 'limit: 50' para ter uma boa amostra de empresas)
        const response = await api.get("/external-jobs", {
          params: { keyword: "developer", limit: 50 },
        });

        const jobs = response.data?.data || [];

        // 6. Reutiliza sua lógica original (do mockJobs)
        const companyMap = new Map();
        jobs.forEach((job) => {
          if (job.company && !companyMap.has(job.company)) {
            companyMap.set(job.company, {
              name: job.company,
              location: job.cityState, // 'cityState' vem do ExternalJobService
              imageUrl: job.imageUrl, // 'imageUrl' vem do ExternalJobService
              slug: generateSlug(job.company),
            });
          }
        });

        setCompanies(Array.from(companyMap.values()));
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompaniesFromJobs();
  }, []); // Array vazio, roda apenas uma vez

  // 7. Renderização (com estado de loading)
  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Buscando Empresas...</h1>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Empresas Parceiras</h1>
      <p className={styles.pageSubtitle}>
        Veja as empresas que estão contratando na plataforma.
      </p>

      <div className={styles.companyList}>
        {companies.map((company) => (
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
