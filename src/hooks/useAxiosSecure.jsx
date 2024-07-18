import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
        baseURL : 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    //request
    axiosSecure.interceptors.request.use(function(config){
            const token = localStorage.getItem('access-token');
            config.headers.authorization = `Bearer ${token}`
            return config;
    } , function(error)  {
        return Promise.reject(error);
    })
    


    // response
    axiosSecure.interceptors.response.use(function(response){
            return response;
    } , function(error){
        const status = error.response.status;
        if(status === 401 || status === 403){
                navigate('/login');
                localStorage.removeItem('user');
        }
            return Promise.reject(error)
    })


    return axiosSecure
};

export default useAxiosSecure;