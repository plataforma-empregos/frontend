import { useParams, Link } from "react-router-dom";
import { mockJobs } from "../data/mockJobs";
import { useEffect, useState } from "react";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const foundJob = mockJobs.find((j) => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
    } else {
      setError("Vaga não encontrada.");
    }
    setLoading(false);
  }, [jobId]);

  if (loading)
    return <p className="text-center p-10">Carregando detalhes da vaga...</p>;
  if (error)
    return <p className="text-center p-10 text-red-500">Erro: {error}</p>;
  if (!job) return <p className="text-center p-10">Vaga não encontrada.</p>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Link
        to="/vacancies"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Voltar para Vagas
      </Link>
      <div className="bg-[var(--clr-bg-primary)] p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={job.imageUrl || "https://picsum.photos/seed/placeholder/60/60"}
            alt={`${job.company} logo`}
            className="w-16 h-16 mr-4 rounded"
          />
          <div>
            <h1 className="text-2xl font-bold text-[var(--clr-text-primary)]">
              {job.title}
            </h1>
            <p className="text-lg text-[var(--clr-text-secondary)]">
              {job.company}
            </p>
            <p className="text-sm text-[var(--clr-text-muted)]">
              {job.cityState} - {job.type}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-[var(--clr-text-primary)]">
          Descrição da Vaga
        </h2>
        <p className="text-[var(--clr-text-secondary)] whitespace-pre-line">
          {job.description || "Nenhuma descrição fornecida."}
        </p>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] px-6 py-2 rounded hover:bg-[var(--clr-accent-tertiary)] transition"
        >
          Candidatar-se
        </a>
      </div>
    </div>
  );
}
