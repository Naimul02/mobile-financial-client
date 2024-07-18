import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../useAxiosPublic/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const SendMoney = () => {
        const navigate = useNavigate();


    const userStringify = localStorage.getItem('user');
    const userParse = JSON.parse(userStringify);
    const email = userParse?.email;
    console.log("email ", email);


    const axiosSecure = useAxiosSecure();

    const { data: balance, refetch } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/balance?email=${email}`)
            console.log(res.data);
            return res.data
        }
    })


        const handleSubmit = e => {
            e.preventDefault();
            const form = e.target;
            const number = form.number.value;
            const amount = form.amount.value;
            
            
            const info = {
                    phoneNumber : number,
                    amount : amount,
                    email : email
            }
            axiosSecure.post('/sendMoneyInfo' , info)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    navigate(`/sendMoneyNextStep/${number}`)

                }
            })
            .catch(error => {
                toast.error(error.message)
            })


        }

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mt-10">Send Money</h1>

            <div className="p-5 border rounded max-w-[300px] flex gap-5 mx-auto my-4">
                <h2 className="text-xl font-semibold">Available Balance : </h2>
                <h2 className="text-lg font-semibold">{balance?.balance} tk</h2>

            </div>

            {/* send money info */}
            <div className="p-5 border rounded max-w-[500px] mx-auto my-4 ">
                <h2 className="text-2xl font-semibold mb-2">To</h2>
                <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                    <span className="text-lg font-semibold">Number  :  </span>
                    <input type="number" className="grow text-lg font-semibold" placeholder="Phone Number"name="number" />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-4">
                    <span className="text-lg font-semibold">Amount  :  </span>
                    <input type="text" className="grow text-lg font-semibold" placeholder="৳0"name="amount" />
                </label>
                <button className="btn bg-teal-800 hover:bg-teal-700 text-white w-full mt-3">Go Ahead</button>
                
                </form>

            </div>
        </div>
    );
};

export default SendMoney;