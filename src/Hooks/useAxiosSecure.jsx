import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";

const axiosSecure = axios.create({
    baseURL:"https://b12-a11-asset-verse-server-side.vercel.app",
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log(error)
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                    .then(() => {
                        navigate("/login")
                    })
                    .catch(error => console.error(error))
            }
        })
    })

    return axiosSecure;
};

export default useAxiosSecure;