import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useAdmin = () => {
    const userStringify = localStorage.getItem('user');
    const userParse = JSON.parse(userStringify);
    const email = userParse.email;
    

    const axiosPublic = useAxiosPublic();
    const {data : admin , isLoading} = useQuery({
        queryKey : ['admin'],
        queryFn  : async() => {
               const result = await axiosPublic(`/user?email=${email}`)
                if(result.data.role === 'admin'){

                    return result?.data.role;
                }
                return null
        }
    })
    return [admin];
};

export default useAdmin;