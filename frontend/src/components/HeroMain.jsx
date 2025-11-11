import SearchBar from "./SearchBar";
import styles from "../styles/HeroMain.module.css";

export default function HeroMain({
  isAuthenticated,
  onAuthRequired,
  onSearch,
}) {
  const handleSearchAction = (criteria) => {
    if (isAuthenticated) {
      onSearch(criteria);
    } else {
      onAuthRequired();
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Encontre as melhores
          <br />
          <span className={styles.titleSpan}>Oportunidades de Trabalho</span>
        </h1>

        <p className={styles.description}>
          Plataforma ideal para profissionais que buscam crescimento na carreira
          e novas oportunidades no mercado de trabalho. Aqui você encontra vagas
          alinhadas ao seu perfil, conecta-se com empresas que valorizam seu
          talento e dá passos concretos rumo ao desenvolvimento profissional.
        </p>

        <SearchBar onSearch={handleSearchAction} />

        <p className={styles.popular}>
          Em alta:{" "}
          <span>UI Designer, UX Researcher, Dev Android, Administração.</span>
        </p>
      </div>
    </section>
  );
}
