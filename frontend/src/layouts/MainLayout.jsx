import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Inserir as páginas com Header/Footer */}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
