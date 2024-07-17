import React from 'react';
import AdminRoute from '../../Routes/AdminRoute/AdminRoute';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../Pages/Navbar/Navbar';
import useAdmin from '../../hooks/useAdmin';

const DashboardLayout = () => {
        const [role] = useAdmin();
        console.log("role" , role)
    
    return (
        <div>
            <Navbar></Navbar>
            
            <div className='flex w-full'>
                {/* left side  */}
                <div className='lg:w-[20%] bg-teal-700 min-h-screen py-5 px-3 '>
                    {
                            role === 'admin' ? 
                            <ul className="menu menu-horizontal px-1 block text-white">
      
                            <li className="font-semibold"><NavLink to="dashboard/users">Users</NavLink></li>
              
                                <li><a>Item 3</a></li>
                            </ul>
                            :
                            <ul className="menu menu-horizontal px-1 block text-white">
      
                            
              
                                <li className="font-semibold"><NavLink to="dashboard/balance">Balance</NavLink></li>
                            </ul>
                    }
                </div>
                {/* right side */}
                <div className='w-[80%] px-10'>
                <h2 className="text-2xl font-semibold text-center mt-4">Dashboard</h2>        
                        <Outlet></Outlet>
                </div>
            </div>
                

        </div>
    );
};

export default DashboardLayout;