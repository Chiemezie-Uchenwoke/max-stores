// import { useState } from 'react'
import './App.css';
import HomePage from "./components/pages/Homepage";
import Products from './components/pages/Products';
import Cart from "./components/pages/Cart";
import SignIn from "./components/pages/SignIn";
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes> 
    </>
  )
}

export default App
