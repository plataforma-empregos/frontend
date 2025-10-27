import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { routes } from "../App.jsx";

export default function Breadcrumbs() {
  // Chama o hook passando as definições de rota
  const breadcrumbs = useBreadcrumbs(routes);

  // Não renderiza nada se estiver na Home ou se houver apenas 1 breadcrumb (a própria Home)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="p-4 bg-[var(--clr-bg-secondary)] text-sm"
    >
      <ol className="flex items-center space-x-2 text-[var(--clr-text-secondary)]">
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
          <li key={match.pathname} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}

            {index === breadcrumbs.length - 1 ? (
              <span
                className="text-[var(--clr-text-primary)] font-semibold"
                aria-current="page"
              >
                {breadcrumb}
              </span>
            ) : (
              <NavLink
                to={match.pathname}
                className="hover:text-[var(--clr-accent-secondary)] hover:underline"
              >
                {breadcrumb}
              </NavLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
