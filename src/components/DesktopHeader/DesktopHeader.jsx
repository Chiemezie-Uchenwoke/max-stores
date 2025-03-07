import Logo from "../Logo/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useState, useEffect } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";

const todayDate = new Date().toString().slice(0, 15);
const topText = ["Welcome to max stores - we provide you the best", "Premium products at affordable prices", `today is ${todayDate}`];

const DesktopHeader = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const {cartCount} = useContext(CartContext)

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((currentIndex) => (currentIndex + 1) % topText.length);
            }, 3000); // Change text every 3 seconds
            return () => clearInterval(interval); // Clean up the interval
        }, []);

        const headerText = topText[currentIndex];

    return(
        <>
            <header>
                <p>{headerText}</p>
            </header>
            <nav>
                <div className="container">
                    <a href="./index.html">
                        <Logo />
                    </a>

                    <div className="nav-links">
                        <Link className="nav-item" to="/">home</Link>
                        <Link to="/products" className="nav-item">products</Link>
                        <Link to="/cart" className="cart-button">
                            <HiOutlineShoppingCart className="cart-icon" />
                            <span className="cart-value">{cartCount}</span>
                        </Link>
                        <Link to="/signin" className="nav-item">sign in</Link>
                    </div>

                    <MobileHeader />
                </div>
            </nav>
        </>
    )
}

export default DesktopHeader;