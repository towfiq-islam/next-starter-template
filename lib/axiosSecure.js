import axios from "axios";
import { getItem, removeItem } from "@/lib/localStorage";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
});

// REQUEST
axiosSecure.interceptors.request.use(config => {
  const token = getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE
axiosSecure.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      isLoggingOut = true;
      console.warn("Auto logout triggered");
      removeItem("token");
    }

    return Promise.reject(error);
  },
);
