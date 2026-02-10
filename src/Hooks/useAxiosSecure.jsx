import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://b12-a11-asset-verse-server-side.vercel.app",
});

const useAxiosSecure = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (!loading && user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;

        console.log("Axios error status:", statusCode);

        // logout ONLY on auth failure
        if (!loading && (statusCode === 401 || statusCode === 403)) {
          logOut().then(() => navigate("/login"));
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, loading, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
