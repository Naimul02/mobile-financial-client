import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../useAxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useUserName from "../../hooks/useUserName";




const Register = () => {
    
    const axiosPublic = useAxiosPublic();
    const [ , refetch] = useUserName();

        const [pin  , setPin] = useState(0);
        console.log(pin)
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const pin = e.target.pin.value;
        const number = e.target.number.value;
        const pinPattern = /^\d{5}$/;
            setPin(pinPattern.test(pin))

        console.log(name , email , pin , number);
        const userInfo ={
                name,
                email,
                pin,
                number,
                status : 'pending',
                balance : 0
        }
        axiosPublic.post('/createUser' , userInfo)
        .then((res) => {
                console.log(res.data)
                if(res.data.insertedId){
                        toast.success("user created successful")
                        e.target.reset();
                        const user ={
                                name , email
                        }
                        localStorage.setItem("user" , JSON.stringify(user) );

                        const userInfo2 = {
                                email : email
                        }
                        axiosPublic.post('/jwt' , userInfo2)
                        .then(res => {
                                if(res.data.token){
                                    localStorage.setItem('access-token' , res.data.token)
                                }
                        })

                        refetch();
                }
              
        })
        .catch(error => {
            toast.error(error.message)
            
        })

        


    }
    return (
        <div className="hero  min-h-screen">
        <div className="hero-content flex-col  lg:w-[600px]">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl mb-2 font-bold">Register</h1>
            
          </div>
          <div className="border  w-full">
            <form className="card-body"onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text"name="name" placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email"name="email" placeholder="Email" className="input input-bordered" required />
               
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pin</span>
                </label>
                <input type="password" placeholder="5-digit PIN" className="input input-bordered"name="pin" required />
                <p className="text-red-600 text-lg mt-1">{!pin ? "You must have five numbers": pin === 0 && "" } </p>
                

                <div className="form-control">
                    <label>
                  <span className="label-text">Number</span>
                </label>
                <input type="number" placeholder="Phone Number" className="input input-bordered"name="number" required />
               
              </div>
               
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-800 text-white hover:bg-green-700">Register</button>
              </div>
            </form>

            <p className="text-lg text-center pb-2">Alredy have an account ? <Link to="/login">Login</Link></p>
            
          </div>
        </div>
      </div>
    );
};

export default Register;