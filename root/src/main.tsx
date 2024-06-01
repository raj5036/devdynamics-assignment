import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { Bounce, ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer 
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </React.StrictMode>,
)
