import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { FaBriefcase } from "react-icons/fa";


const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  if (!text) {
    return (
      <p className="text-[var(--clr-text-secondary)] whitespace-pre-line">
        Nenhuma descrição fornecida.
      </p>
    );
  }

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text-[var(--clr-text-secondary)] whitespace-pre-line">
      {isReadMore ? text.slice(0, 350) : text}
      {text.length > 350 && (
        <span
          onClick={toggleReadMore}
          className="text-blue-600 cursor-pointer ml-2 font-semibold"
        >
          {isReadMore ? "...Ver mais" : " Ver menos"}
        </span>
      )}
    </p>
  );
};

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/external-jobs/${jobId}`);

        const jobData = response.data;
        if (!jobData || !jobData.job_title) {
          throw new Error("Dados da vaga não encontrados");
        }

        setJob({
          title: jobData.job_title,
          company: jobData.employer_name,
          // imageUrl: jobData.employer_logo || "https://via.placeholder.com/60",
          imageUrl: jobData.employer_logo || null,
          cityState: jobData.job_city || jobData.job_country || "Remoto",
          type: jobData.job_employment_type || "Não informado",
          description: jobData.job_description,
          applyLink: jobData.job_apply_link,
        });
      } catch (err) {
        console.error("Erro ao buscar detalhes da vaga:", err);
        setError("Vaga não encontrada.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [jobId]);

  if (loading)
    return <p className="text-center p-10">Carregando detalhes da vaga...</p>;

  if (error)
    return (
      <div className="text-center p-10">
        <p className="text-red-500 mb-4">{error}</p>

        <Link
          to={`/vacancies?${searchParams.toString()}`}
          className="text-blue-600 hover:underline"
        >
          &larr; Voltar para Vagas
        </Link>
      </div>
    );

  if (!job) return <p className="text-center p-10">Vaga não encontrada.</p>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Link
        to={`/vacancies?${searchParams.toString()}`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Voltar para Vagas
      </Link>

      <div className="bg-[var(--clr-bg-primary)] p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <JobLogo imageUrl={job.imageUrl} company={job.company} />
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

        <ReadMore>{job.description}</ReadMore>

        {job.applyLink && (
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] px-6 py-2 rounded hover:bg-[var(--clr-accent-tertiary)] transition"
          >
            Candidatar-se
          </a>
        )}
      </div>
    </div>
  );
}

function JobLogo({ imageUrl, company }) {
  const [imgError, setImgError] = useState(false);

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={`${company} logo`}
        className="w-16 h-16 mr-4 rounded object-contain bg-transparent"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="w-16 h-16 mr-4 rounded bg-[var(--clr-bg-secondary,#f3f4f6)] flex items-center justify-center">
      <FaBriefcase className="text-[var(--clr-text-secondary,#6b7280)] w-6 h-6" />
    </div>
  );
}