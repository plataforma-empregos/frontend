import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/JobCard.module.css";
import {
  FaBullhorn,
  FaPaintBrush,
  FaChartLine,
  FaCog,
  FaTags,
  FaUsers,
  FaFileAlt,
  FaLaptopCode,
  FaHeartbeat,
  FaGavel,
} from "react-icons/fa";

export default function JobCard() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "Marketing", jobs: 85, icon: <FaBullhorn /> },
    { name: "Design", jobs: 55, icon: <FaPaintBrush /> },
    { name: "Finanças", jobs: 75, icon: <FaChartLine /> },
    { name: "Engenharias", jobs: 158, icon: <FaCog /> },
    { name: "Vendas", jobs: 75, icon: <FaTags /> },
    { name: "Recursos Humanos", jobs: 121, icon: <FaUsers /> },
    { name: "Administrativo", jobs: 96, icon: <FaFileAlt /> },
    { name: "Tecnologia", jobs: 214, icon: <FaLaptopCode /> },
    { name: "Saúde", jobs: 45, icon: <FaHeartbeat /> },
    { name: "Jurídico", jobs: 29, icon: <FaGavel /> },
  ];

  const handleMostrarTodas = () => {
    setSelectedCategory(null);
  };

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
            <button
              key={`${cat.name}-${index}`}
              className={`${styles.categoryCard} ${
                selectedCategory === cat.name ? styles.selected : ""
              }`}
              onClick={() => setSelectedCategory(cat.name)}
              aria-pressed={selectedCategory === cat.name}
            >
              <div className={styles.cardIcon}>{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.jobs} Vagas disponíveis</p>
            </button>
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
