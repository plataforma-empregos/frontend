import { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockJobs } from "../data/mockJobs";
import JobListingItem from "../components/JobListingItem";
import SearchBar from "../components/SearchBar";
import styles from "../styles/VacanciesPage.module.css";
import { useDebounce } from "use-debounce";

export default function VacanciesPage() {
  const { isAuthenticated } = useAuth();
  const [allJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setIsLoading(true);
    console.log("Filtering with:", {
      keyword: debouncedKeyword,
      location: debouncedLocation,
    });

    const lowerKeyword = debouncedKeyword.toLowerCase();

    const results = allJobs.filter((job) => {
      const matchKeyword = lowerKeyword
        ? job.title.toLowerCase().includes(lowerKeyword) ||
          job.company.toLowerCase().includes(lowerKeyword) ||
          (job.description &&
            job.description.toLowerCase().includes(lowerKeyword))
        : true;
      const matchLocation = debouncedLocation
        ? job.location === debouncedLocation
        : true;
      return matchKeyword && matchLocation;
    });

    const timer = setTimeout(() => {
      setFilteredJobs(results);
      setIsLoading(false);
    }, 150);

    const newSearchParams = new URLSearchParams();
    if (debouncedKeyword) newSearchParams.set("keyword", debouncedKeyword);
    if (debouncedLocation) newSearchParams.set("location", debouncedLocation);
    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });

    return () => clearTimeout(timer);
  }, [
    debouncedKeyword,
    debouncedLocation,
    allJobs,
    navigate,
    location.pathname,
  ]);

  const handleCriteriaChange = (criteria) => {
    setImmediateKeyword(criteria.keyword);
    setImmediateLocation(criteria.location);
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
          initialKeyword={immediateKeyword}
          initialLocation={immediateLocation}
          onCriteriaChange={handleCriteriaChange}
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
          <p className={styles.loadingMessage}>Filtrando vagas...</p>
        ) : jobsToShow.length > 0 ? (
          jobsToShow.map((job) => <JobListingItem key={job.id} job={job} />)
        ) : (
          <p className={styles.noResults}>
            Nenhuma vaga encontrada para "{immediateKeyword}"{" "}
            {immediateLocation && `em ${immediateLocation}`}.
          </p>
        )}
      </div>
    </div>
  );
}
