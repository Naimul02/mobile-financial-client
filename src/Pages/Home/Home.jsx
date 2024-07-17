import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../useAxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";


const Home = () => {
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
        <div className="mt-20">
            <h1 className="text-2xl font-semibold text-center my-10 mb-3">Your Current Balance</h1>
             <div className="p-5 border rounded max-w-[300px] flex gap-5 mx-auto">
                <h2 className="text-xl font-semibold">Balance</h2>
                <h2 className="text-lg font-semibold">{balance?.balance}</h2>

             </div>

            {/* send money section */}
             <div className="bg-[url('https://www.veem.com/wp-content/uploads/2020/03/money-transfer-3588301_1920.jpg')] h-[400px] bg-no-repeat bg-cover bg-center w-full flex justify-center items-center mt-10">
                    <div className="border">
                    <Link to="/sendMoney"><button className="btn px-10 bg-teal-600 rounded-none hover:bg-teal-500 text-lg font-semibol text-white">Send Money</button></Link>
                    </div>
             </div>
        </div>
    );
};

export default Home;