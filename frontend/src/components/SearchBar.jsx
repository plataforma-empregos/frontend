import { useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({
  initialKeyword = "",
  initialLocation = "",
  onSearch,
}) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setKeyword(initialKeyword);
    setLocation(initialLocation);
  }, [initialKeyword, initialLocation]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch({ keyword, location });
    }
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Nome da vaga ou palavra-chave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={styles.searchInput}
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={styles.locationSelect}
      >
        <option value="">Selecione a localização</option>
        <option value="Brasil">Brasil</option>
        <option value="Sao Paulo, Brasil">São Paulo, Brasil</option>
        <option value="Rio de Janeiro, Brasil">Rio de Janeiro, Brasil</option>
        <option value="Portugal">Portugal</option>
        <option value="EUA">EUA</option>
        <option value="Remoto">Remoto</option>
      </select>

      <button type="submit" className={styles.searchButton}>
        Buscar Vaga
      </button>
    </form>
  );
}
