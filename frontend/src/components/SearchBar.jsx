import { useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({
  initialKeyword = "",
  initialLocation = "",
  onCriteriaChange,
  onSearch,
}) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setKeyword(initialKeyword);
    setLocation(initialLocation);
  }, [initialKeyword, initialLocation]);

  const handleInputChange = (field, value) => {
    let newKeyword = keyword;
    let newLocation = location;

    if (field === "keyword") {
      newKeyword = value;
      setKeyword(value);
    } else if (field === "location") {
      newLocation = value;
      setLocation(value);
    }

    if (onCriteriaChange) {
      onCriteriaChange({ keyword: newKeyword, location: newLocation });
    }
  };

  // Função para busca explícita (botão/Enter)
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ keyword, location });
    } else if (onCriteriaChange) {
      onCriteriaChange({ keyword, location });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Nome da vaga ou palavra-chave"
        value={keyword}
        onChange={(e) => handleInputChange("keyword", e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
      />
      <select
        value={location}
        onChange={(e) => handleInputChange("location", e.target.value)}
      >
        <option value="">Selecione a localização</option>
        <option value="Sao Paulo">São Paulo, Brasil</option>
        <option value="Rio de Janeiro">Rio de Janeiro, Brasil</option>
        <option value="Rio Grande do Sul">Rio Grande do Sul, Brasil</option>
        <option value="Minas Gerais">Minas Gerais, Brasil</option>
        <option value="Santa Catarina">Santa Catarina, Brasil</option>
        <option value="Parana">Paraná, Brasil</option>
        <option value="Bahia">Bahia, Brasil</option>
        <option value="Pernambuco">Pernambuco, Brasil</option>
        <option value="Ceara">Ceará, Brasil</option>
      </select>
      <button
        type="button"
        onClick={handleSearchClick}
        className={styles.searchButton}
      >
        Buscar Vaga
      </button>
    </div>
  );
}
