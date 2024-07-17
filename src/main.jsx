import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Main from './layout/Main/Main.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.jsx'
import AuthProvider, { AuthContext } from './AuthProvider/AuthProvider.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <RouterProvider router={router}>
          <Main></Main>

        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>

    <ToastContainer />
  </React.StrictMode>,
)
