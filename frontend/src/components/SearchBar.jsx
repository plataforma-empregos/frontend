import { useState } from "react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", { keyword, location });
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Nome da vaga ou palavra-chave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
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
      <button onClick={handleSearch} className={styles.searchButton}>
        Buscar Vaga
      </button>
    </div>
  );
}
