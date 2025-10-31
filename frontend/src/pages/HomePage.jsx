import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HeroMain from "../components/HeroMain";
import JobCard from "../components/JobCard";
import LoginPromptModal from "../components/LoginPromptModal";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const openLoginPrompt = () => setShowLoginPrompt(true);
  const closeLoginPrompt = () => setShowLoginPrompt(false);

  // Função para lidar com a busca vinda da HomePage
  const handleHomeSearch = (criteria) => {
    const { keyword, location } = criteria;
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.set("keyword", keyword);
    if (location) searchParams.set("location", location);

    // Navega para a página de vagas com os parâmetros
    navigate(`/vagas?${searchParams.toString()}`);
  };

  return (
    <>
      <HeroMain
        isAuthenticated={isAuthenticated}
        onAuthRequired={openLoginPrompt}
        onSearch={handleHomeSearch}
      />
      <JobCard
        isAuthenticated={isAuthenticated}
        onAuthRequired={openLoginPrompt}
      />
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onRequestClose={closeLoginPrompt}
      />
    </>
  );
}
