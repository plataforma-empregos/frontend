import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import JobListingItem from "../components/JobListingItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/VacanciesPage.module.css";
import api from "../services/api";
import toast from "react-hot-toast";

export default function VacanciesPage() {
  const { isAuthenticated } = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const lastQueryRef = useRef("");

  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    if (!keyword) {
      setIsLoading(false);
      setFilteredJobs([]);
      return;
    }

    const currentQuery = `${keyword}-${location}`.trim();

    // Evita requisições duplicadas!
    if (lastQueryRef.current === currentQuery) return;
    lastQueryRef.current = currentQuery;

    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/external-jobs", {
          params: {
            keyword: keyword,
            location: location,
          },
        });

        const jobsData = response.data?.data || [];

        setFilteredJobs(jobsData);
      } catch (error) {
        console.error("Erro ao buscar vagas (JSearch):", error);
        toast.error(
          "Erro ao buscar vagas. Você pode ter atingido o limite de buscas. Tente mais tarde."
        );
        setFilteredJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [keyword, location]);

  const handleCriteriaChange = (criteria) => {
    setSearchParams(
      { keyword: criteria.keyword, location: criteria.location },
      { replace: true }
    );
  };

  const displayLimit = 5;
  const jobsToShow = isAuthenticated
    ? filteredJobs
    : filteredJobs.slice(0, displayLimit);
  const hasMoreJobs = !isAuthenticated && filteredJobs.length > displayLimit;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Encontre sua Vaga</h1>

      <div className={styles.searchBarContainer}>
        <SearchBar
          initialKeyword={keyword}
          initialLocation={location}
          onSearch={handleCriteriaChange}
          searchNavigate={null}
        />
      </div>

      {hasMoreJobs && (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-300 text-blue-800 rounded dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100 text-center text-sm">
          Mostrando os primeiros {displayLimit} de {filteredJobs.length}{" "}
          resultados.
          <Link
            to="/login"
            className="font-bold underline ml-2 hover:text-blue-600 dark:hover:text-blue-200"
          >
            Faça login
          </Link>{" "}
          ou
          <Link
            to="/register"
            className="font-bold underline ml-1 hover:text-blue-600 dark:hover:text-blue-200"
          >
            cadastre-se
          </Link>{" "}
          para ver todas as vagas.
        </div>
      )}

      <div className={styles.jobListContainer}>
        {isLoading ? (
          <p className={styles.loadingMessage}>Buscando vagas...</p>
        ) : jobsToShow.length > 0 ? (
          jobsToShow.map((job) => <JobListingItem key={job.id} job={job} />)
        ) : (
          <p className={styles.noResults}>
            {keyword
              ? `Nenhuma vaga encontrada para "${keyword}" ${
                  location ? `em ${location}` : ""
                }.`
              : "Digite um termo para iniciar a busca."}
          </p>
        )}
      </div>
    </div>
  );
}
