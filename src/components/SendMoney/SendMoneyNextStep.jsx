import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SendMoneyNextStep = () => {
    const [disabled , setDisabled] = useState(false);
    const [pinError , setPinError] = useState("");
        const axiosSecure = useAxiosSecure();
        const [charge , setCharge] = useState(0)
        const {phoneNumber} = useParams();

        const userStringify = localStorage.getItem('user');
        const userParse = JSON.parse(userStringify);
        const email = userParse?.email;

        const {data : balance } = useQuery({
            queryKey : ['balance'],
            queryFn : async() => {
                    const res = await axiosSecure(`/balance?email=${email}`)
                    console.log(res.data);
                    return res.data
            }
    })

    const {data : sendMoneyInfo } = useQuery({
            queryKey : ['info'],
            queryFn : async() => {
                     const res = await axiosSecure(`/sendMoneyInfo?number=${phoneNumber}`)

                     console.log(sendMoneyInfo);
                     const amount = parseInt(res?.data?.amount)
                     if(amount > 100){
                         setCharge(5)
                     }
                    return res.data
            }
    })


    const handleSubmit = () => {
            const element = document.getElementById('amount');
            const  amount = parseInt(element.innerText);
            const currentBalance = parseInt(balance?.balance);
            const pinElement = document.getElementById("pin");
            const pin = pinElement.value;

            // const balance = balance;
            console.log( "amount : " , amount , "balance : " , currentBalance  , "pin" , pin);

            axiosSecure(`pinMatch/${email}/${pin}`)
            .then(res => {
                console.log("pin koi " , res.data)
                setPinError(res.data)

                 if(res.data.error === 'Sorry! Pin does not match'){{
                    toast.error('Your Pin does not match. Please try again.');
                    setDisabled(true);
                    return;
                }
    
                }
                else if(amount < 50 ){
                
                    toast.error('Sorry you can not do transactions below 50 taka')
                    setDisabled(true);
                    return ;
                }
                else if( amount >= currentBalance){
                        toast.error("You don't have enough money")
                        setDisabled(true)
                        return ;
                }

                axiosSecure(`/haveNumber/${phoneNumber}`)
                .then(res => {
                    
                    
                    if(!res.data){
                            axiosSecure.post(`/sendMoney/${phoneNumber}?amount=${amount}`)
                            .then(res => {
                                console.log(res.data)
                                if(res.data.insertedId){
                                        toast.success('Send money has been successful')
                                }
                            })
                            .catch(error => {
                                console.error(error.message)
                            })
                    }
                    else{
                            axiosSecure.patch(`/sendMoney/${phoneNumber}?amount=${amount}`)
                            .then(res => {
                                console.log(res.data)
                                if(res.data){
                                    toast.success('send money has been succesful')
                                }
                            })
                    }
                })
            })
            .catch(error => {
                console.error(error.message)
            })

            
            

            
           
            
            
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mt-10">Send Money</h1>
             <h1 className="text-2xl font-semibold text-center my-10 mb-3">Your Current Balance</h1>
             <div className="p-5 border border-teal-600 rounded max-w-[300px] flex gap-5 mx-auto">
                <h2 className="text-xl font-semibold">Balance : </h2>
                <h2 className="text-lg font-semibold">{balance?.balance}</h2>

             </div>

                

<div className="p-5 border border-teal-600 rounded max-w-[400px]  mx-auto my-4">
    <h2 className="text-xl font-bold  mb-2 text-center">To </h2>
    <div className="flex gap-5">
    <h2 className="text-xl font-semibold">Phone Number :  </h2>
    <h2 className="text-lg font-semibold">{sendMoneyInfo?.phoneNumber}</h2>
    </div>
</div>
<div className="p-5 border border-teal-600 rounded max-w-[400px] flex justify-between  mx-auto my-4">
           <div className="text-center border-r-2 pr-6">
            <h2 className="text-xl font-semibold">Amount</h2>
           <h2 className="text-xl font-semibold"id="amount"> {sendMoneyInfo?.amount}</h2>
           </div>
           {/* 2 */}
           <div className="text-center border-r-2 pr-6">
            <h2 className="text-xl font-semibold">Charge</h2>
           <h2 className="text-xl font-semibold">{charge}</h2>
           </div>
           {/* 3 */}
           <div className="text-center">
            <h2 className="text-xl font-semibold">Total Amount</h2>
           <h2 className="text-xl font-semibold"> {parseInt(sendMoneyInfo?.amount) + charge}</h2>
           </div>
            
</div>
<div className="p-2  max-w-[400px] mx-auto my-4">
        <input type="password"className="w-full input px-3 rounded-none border-teal-600 text-lg font-semibold p-2"placeholder="Pin"id="pin"required />
        <span className="mt-1 text-red-600 text-lg">{pinError.error}</span>

</div>
        <div className="max-w-[400px] mx-auto my-4">
                <button className="bg-teal-700 btn hover:bg-teal-600 text-white w-full"onClick={handleSubmit}disabled={disabled}>Submit</button>
        </div>

        </div>
    );
};

export default SendMoneyNextStep;