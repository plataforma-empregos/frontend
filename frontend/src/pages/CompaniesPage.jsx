/* src/pages/CompaniesPage.jsx (CORRIGIDO) */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/CompaniesPage.module.css";
import api from "../services/api";
import SearchBar from "../components/SearchBar";

const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const COMPANIES_PER_PAGE = 9;

export default function CompaniesPage() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState("GEICO");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, [keyword, location]);

  const fetchCompanies = async () => {
    setIsLoading(true);

    try {
      const cacheKey = `companies_${keyword}_${location}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        setAllCompanies(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      const response = await api.get("/external-jobs", {
        params: {
          keyword: keyword || "GEICO",
          location: location || undefined,
          limit: 50,
        },
      });

      const jobs = response.data?.data || [];

      const companyMap = new Map();
      jobs.forEach((job) => {
        if (job.company && !companyMap.has(job.company)) {
          companyMap.set(job.company, {
            name: job.company,
            location: job.cityState,
            imageUrl: job.imageUrl,
            slug: generateSlug(job.company),
          });
        }
      });

      const uniqueCompanies = Array.from(companyMap.values());
      setAllCompanies(uniqueCompanies);

      sessionStorage.setItem(cacheKey, JSON.stringify(uniqueCompanies));
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    } finally {
      setIsLoading(false);
    }
  }; // Paginação

  const totalPages = Math.ceil(allCompanies.length / COMPANIES_PER_PAGE);
  const startIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
  const currentCompanies = allCompanies.slice(
    startIndex,
    startIndex + COMPANIES_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = ({ keyword: kw, location: loc }) => {
    setKeyword(kw || "GEICO");
    setLocation(loc || "");
    setCurrentPage(1);
  };

  return (
    <div
      className={`
        ${styles.pageContainer} 
        ${isLoading ? styles.loadingErrorContainer : ""}
      `}
    >
      <h1 className={styles.pageTitle}>Empresas Parceiras</h1>

      <SearchBar
        initialKeyword={keyword}
        initialLocation={location}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <p className={styles.loadingMessage}>Buscando Empresas...</p>
      ) : (
        <>
          <p className={styles.pageSubtitle}>
            Total de empresas encontradas: {allCompanies.length}
          </p>

          <div className={styles.companyList}>
            {currentCompanies.map((company) => (
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

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &larr; Anterior
              </button>

              <span>
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
