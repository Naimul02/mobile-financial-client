import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../useAxiosPublic/useAxiosPublic';

const SendMoney = () => {
    const userStringify = localStorage.getItem('user');
    const userParse = JSON.parse(userStringify);
    const email = userParse?.email;
    console.log("email " , email);

    const axiosPublic = useAxiosPublic();

    const {data : user = []} = useQuery({
        queryKey : ['user'],
         queryFn : async() => {
             axiosPublic(`/user?email=${email}`)
             .then(res => {
                console.log("data vai" , res.data);
                return res.data
             })
            
         }
    })

    console.log("user vai : " , user)
    

    return (
        <div>
            <h1 className="text-2xl font-semibold text-center mt-3">Send Money</h1>

            <div className=''>

            </div>
        </div>
    );
};

export default SendMoney;