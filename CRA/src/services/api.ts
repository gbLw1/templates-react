import axios from "axios";
import { AutenticacaoModel, ServiceResult } from "../interfaces";

const defaultOptions = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create(defaultOptions);

let isRefreshing = false;
let refreshFailedCount = 0;
const MAX_REFRESH_FAILED_COUNT = 3;

const refreshToken = async (token: string): Promise<AutenticacaoModel> => {
  return api
    .postForm<ServiceResult<AutenticacaoModel>>("/auth/token", {
      grant_type: "refresh_token",
      lembrarSenha: true,
      refresh_token: token,
    })
    .then(({ data: { data } }) => {
      localStorage.setItem("auth", JSON.stringify(data));
      refreshFailedCount = 0;
      return data as AutenticacaoModel;
    })
    .catch((error) => {
      refreshFailedCount++;
      throw error;
    });
};

const handleRefreshError = (error: any) => {
  localStorage.clear();
  return Promise.reject(error);
};

const shouldRefreshToken = (error: any): boolean => {
  return (
    error.response &&
    error.response.status === 401 &&
    !isRefreshing &&
    refreshFailedCount < MAX_REFRESH_FAILED_COUNT
  );
};

const refreshAuthToken = async (error: any) => {
  isRefreshing = true;
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!auth.refreshToken) {
      return handleRefreshError(error);
    }

    const newToken = await refreshToken(auth.refreshToken);
    error.config.headers.Authorization = `Bearer ${newToken.accessToken}`;
    return api.request(error.config);
  } catch (refreshError) {
    return handleRefreshError(refreshError);
  } finally {
    isRefreshing = false;
  }
};

api.interceptors.request.use((config) => {
  const auth = JSON.parse(
    localStorage.getItem("auth") ?? sessionStorage.getItem("auth") ?? "{}"
  );

  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (shouldRefreshToken(error)) {
      return refreshAuthToken(error);
    }

    return handleRefreshError(error);
  }
);

export default api;
