// import { useState } from 'react'
import './App.css';
import HomePage from "./components/pages/HomePage";
import Products from './components/pages/Products';
import Cart from "./components/pages/Cart";
import SignIn from "./components/pages/SignIn";
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes> 
    </>
  )
}

export default App
