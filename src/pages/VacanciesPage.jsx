import { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import JobListingItem from "../components/JobListingItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/VacanciesPage.module.css";
import { useDebounce } from "use-debounce";

export default function VacanciesPage() {
  const { isAuthenticated } = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [immediateKeyword, setImmediateKeyword] = useState(
    searchParams.get("keyword") || ""
  );
  const [immediateLocation, setImmediateLocation] = useState(
    searchParams.get("location") || ""
  );

  const [debouncedKeyword] = useDebounce(immediateKeyword, 500);
  const [debouncedLocation] = useDebounce(immediateLocation, 500);

  // 🔥 Chamada real para API do backend
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError("");

      const query = new URLSearchParams();
      if (debouncedKeyword) query.append("keyword", debouncedKeyword);
      if (debouncedLocation) query.append("location", debouncedLocation);

      const response = await fetch(`/api/jobs/search?${query.toString()}`);

      if (!response.ok) {
        throw new Error("Falha ao buscar vagas");
      }

      const data = await response.json();
      setFilteredJobs(data.jobs || []);
    } catch (err) {
      setError(err.message);
      setFilteredJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Executa sempre que o usuário muda keyword/location
  useEffect(() => {
    fetchJobs();

    const newSearchParams = new URLSearchParams();
    if (debouncedKeyword) newSearchParams.set("keyword", debouncedKeyword);
    if (debouncedLocation) newSearchParams.set("location", debouncedLocation);

    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });
  }, [debouncedKeyword, debouncedLocation]);

  const handleCriteriaChange = (criteria) => {
    setImmediateKeyword(criteria.keyword);
    setImmediateLocation(criteria.location);
  };

  const displayLimit = 5;
  const jobsToShow = isAuthenticated
    ? filteredJobs
    : filteredJobs.slice(0, displayLimit);

  const hasMoreJobs =
    !isAuthenticated && filteredJobs.length > displayLimit;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Encontre sua Vaga</h1>

      <div className={styles.searchBarContainer}>
        <SearchBar
          initialKeyword={immediateKeyword}
          initialLocation={immediateLocation}
          onCriteriaChange={handleCriteriaChange}
        />
      </div>

      {error && (
        <p className={styles.errorMessage}>
          Erro ao buscar vagas: {error}
        </p>
      )}

      {hasMoreJobs && (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-300 text-blue-800 rounded text-center text-sm">
          Mostrando os primeiros {displayLimit} de {filteredJobs.length} resultados.
          <Link to="/login" className="font-bold underline ml-2">
            Faça login
          </Link>{" "}
          ou
          <Link to="/register" className="font-bold underline ml-1">
            cadastre-se
          </Link>{" "}
          para ver todas as vagas.
        </div>
      )}

      <div className={styles.jobListContainer}>
        {isLoading ? (
          <p className={styles.loadingMessage}>Carregando vagas...</p>
        ) : jobsToShow.length > 0 ? (
          jobsToShow.map((job, index) => (
            <JobListingItem key={job.id || index} job={job} />
          ))
        ) : (
          <p className={styles.noResults}>
            Nenhuma vaga encontrada para "{immediateKeyword}"
            {immediateLocation && ` em ${immediateLocation}`}.
          </p>
        )}
      </div>
    </div>
  );
}
