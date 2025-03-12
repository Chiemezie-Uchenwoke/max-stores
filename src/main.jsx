import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CartProvider from './context/CartContext.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
         <CartProvider>
           <AuthProvider>
               <App />
           </AuthProvider>
         </CartProvider>
     </BrowserRouter>
  </StrictMode>,
)
