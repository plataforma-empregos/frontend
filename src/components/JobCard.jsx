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
    { name: "Marketing", jobs: 85, icon: <FaBullhorn /> },
    { name: "UX/UI Design", jobs: 55, icon: <FaPaintBrush /> },
    { name: "Data Security", jobs: 75, icon: <FaUserShield /> },
    { name: "Engenharias", jobs: 158, icon: <FaCog /> },
    { name: "Vendas", jobs: 75, icon: <FaTags /> },
    { name: "Network Analyst", jobs: 121, icon: <FaNetworkWired /> },
    { name: "Administrativo", jobs: 96, icon: <FaFileAlt /> },
    { name: "Developer", jobs: 214, icon: <FaLaptopCode /> },
    { name: "Technical Support", jobs: 45, icon: <FaHeadset /> },
    { name: "Database Administrator", jobs: 29, icon: <FaDatabase /> },
  ];

  const handleMostrarTodas = () => {};

  return (
    <div className={styles.categoryGrid}>
      <div className={styles.container}>
        <div className={styles.categoryHeader}>
          <h2 className={styles.categoryTitle}>
            Explore por <span>categorias</span>
          </h2>
          <Link
            to="/vagas"
            className={`${styles.showAllButton} ${styles.showAllButtonDesktop}`}
            onClick={handleMostrarTodas}
          >
            Mostrar Todas as Vagas
          </Link>
        </div>

        <div className={styles.cardContainer}>
          {categories.map((cat, index) => (
            <Link
              key={`${cat.name}-${index}`}
              to={`/vagas?query=${encodeURIComponent(cat.name)}`}
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
            to="/vagas"
            className={styles.showAllButton}
            onClick={handleMostrarTodas}
          >
            Mostrar Todas as Vagas
          </Link>
        </div>
      </div>
    </div>
  );
}
