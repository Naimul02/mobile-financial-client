import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Main from "../layout/Main/Main";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import Home from "../Pages/Home/Home";
import Balance from "../Dashboard/Balance/Balance";
import SendMoney from "../components/SendMoney/SendMoney";
import SendMoneyNextStep from "../components/SendMoney/SendMoneyNextStep";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path:'/login',
                element : <Login></Login>
            },
            {
                path : '/register',
                element : <Register></Register>
            },
            {
                path : '/sendMoney',
                element : <SendMoney></SendMoney>
            },
            {
                path : '/sendMoneyNextStep/:phoneNumber',
                element : <SendMoneyNextStep></SendMoneyNextStep>
            }
      ]
    },


    
    
    // dashboard
     
    {
        path: 'dashboard',
        element : <DashboardLayout></DashboardLayout>,
        children : [
               {
                path : 'dashboard/users',
                element : <AllUsers></AllUsers>
               },
               {
                path : 'dashboard/balance',
                element : <Balance></Balance>
               }
        ]
    }
    

   
  ]);
  export default router