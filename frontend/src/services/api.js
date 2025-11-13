import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",

  withCredentials: true,
});

// Enviar mensagem de contato
export const sendContactMessage = async (data) => {
  try {
    const response = await api.post("/contact", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem de contato:", error);
    throw error;
  }
};

// Inscrever-se na newsletter
export const subscribeNewsletter = async (email) => {
  try {
    const response = await api.post("/newsletter", { email });
    return response.data;
  } catch (error) {
    console.error("Erro ao inscrever e-mail:", error);
    throw error;
  }
};

export default api;
