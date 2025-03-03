import axios from "axios";
import { API_URL } from "../config";

// Cliente público: solo para endpoints que no requieren autenticación
const publicApiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para manejar errores de API
publicApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Public API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default publicApiClient;
