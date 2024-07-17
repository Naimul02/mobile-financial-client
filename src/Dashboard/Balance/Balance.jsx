import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../useAxiosPublic/useAxiosPublic";


const Balance = () => {
    const axiosPublic = useAxiosPublic();
    const userStringify = localStorage.getItem('user');
            const userParse = JSON.parse(userStringify);
            const email = userParse?.email;
            console.log("Home " , email);

    
    const {data : balance , refetch} = useQuery({
            queryKey : ['balance'],
            queryFn : async() => {
                    const res = await axiosPublic(`/balance?email=${email}`)
                    console.log(res.data);
                    return res.data
            }
    })
    return (
        <div>
            <h1 className="text-2xl font-semibold text-center">Your Current Balance</h1>
             <div className="p-5 border rounded max-w-[300px] flex gap-5 text-center">
                <h2 className="text-xl font-semibold">Balance : </h2>
                <h2 className="text-lg font-semibold">{balance?.balance} tk</h2>

             </div>
        </div>
    );
};

export default Balance;