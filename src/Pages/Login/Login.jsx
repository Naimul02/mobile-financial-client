import { Link } from "react-router-dom";
import useUserName from "../../hooks/useUserName";
import useAxiosPublic from "../../useAxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";


const Login = () => {
    const [ , refetch] = useUserName();
  const axiosPublic = useAxiosPublic();
        const handleSubmit = (e) => {
            e.preventDefault();
            
            const email = e.target.email.value;
            const pin = e.target.pin.value;
           
            // const pinPattern = /^\d{5}$/;
            //     setPin(pinPattern.test(pin))
    
            console.log( email , pin );
            const userInfo ={
                
                    email,
                    pin,
                  
            }
            axiosPublic.post('/login' , userInfo)
            .then((res) => {
                    console.log(res.data)
                    if(res.data.pin){
                            toast.success("user login successful")
                            e.target.reset();
                             const user ={
                                name : res.data.name,
                                 email
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
                    else if(res.data.error){
                        toast.error(res.data.error)
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
            <h1 className="text-4xl mb-2 font-bold">Login</h1>
            
          </div>
          <div className="border  w-full">
            <form className="card-body"onSubmit={handleSubmit}>
            
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
                
                

            
               
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-800 text-white hover:bg-green-700">Login</button>
              </div>
              
            </form>
            <p className="text-lg text-center pb-2">Are you new here ? <Link to="/register">Register</Link></p>
            
          </div>
        </div>
      </div>
    );
};

export default Login;