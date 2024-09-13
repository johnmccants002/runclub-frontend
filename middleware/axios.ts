import axios from "axios";
import useAuthStore from "@/stores/auth";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status, "INTERCEPTED STATUS");
    console.log(error.config.url, "REQUEST URL"); // Log the request URL

    if (error.response && error.response.status === 401) {
      // If a 401 error is returned (token expired or invalid), log the user out
      useAuthStore.getState().logout(); // Call logout from your auth store
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
