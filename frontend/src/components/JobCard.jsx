import { Link } from "react-router-dom";
import styles from "../styles/JobCard.module.css";
import {
  FaBullhorn,
  FaPaintBrush,
  FaUserShield,
  FaCog,
  FaTags,
  FaNetworkWired,
  FaFileAlt,
  FaLaptopCode,
  FaHeadset,
} from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";

export default function JobCard({ isAuthenticated, onAuthRequired }) {
  const categories = [
    { name: "Marketing", icon: <FaBullhorn /> },
    { name: "UX/UI Design", icon: <FaPaintBrush /> },
    { name: "Data Security", icon: <FaUserShield /> },
    { name: "Engenharias", icon: <FaCog /> },
    { name: "Vendas", icon: <FaTags /> },
    { name: "Network Analyst", icon: <FaNetworkWired /> },
    { name: "Administrativo", icon: <FaFileAlt /> },
    { name: "Developer", icon: <FaLaptopCode /> },
    { name: "Technical Support", icon: <FaHeadset /> },
    { name: "Database Administrator", icon: <FaDatabase /> },
  ];

  const handleShowAllClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      onAuthRequired();
    }
  };

  return (
    <div className={styles.categoryGrid}>
      <div className={styles.container}>
        <div className={styles.categoryHeader}>
          <h2 className={styles.categoryTitle}>
            Explore por <span>categorias</span>
          </h2>

          <Link
            to="/vacancies"
            className={`${styles.showAllButton} ${styles.showAllButtonDesktop}`}
            onClick={handleShowAllClick}
          >
            Mostrar Todas as Vagas
          </Link>
        </div>

        <div className={styles.cardContainer}>
          {categories.map((cat, index) => (
            <Link
              key={`${cat.name}-${index}`}
              to={`/vacancies?keyword=${encodeURIComponent(cat.name)}`}
              onClick={
                !isAuthenticated
                  ? (e) => {
                      e.preventDefault();
                      onAuthRequired();
                    }
                  : undefined
              }
              className={styles.categoryCard}
            >
              <div className={styles.cardIcon}>{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>
                {cat.jobs > 0 ? `${cat.jobs} Vagas disponíveis` : "Ver vagas"}
              </p>
            </Link>
          ))}
        </div>

        <div className={styles.showAllContainerMobile}>
          <Link
            to="/vacancies"
            className={styles.showAllButton}
            onClick={handleShowAllClick}
          >
            Mostrar Todas as Vagas
          </Link>
        </div>
      </div>
    </div>
  );
}
