import Logo from "../Logo/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useState, useEffect } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

const todayDate = new Date().toString().slice(0, 15);
const topText = ["Premium products at affordable prices", `today is ${todayDate}`];

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
                        <a href="#">home</a>
                        <a href="#">products</a>
                        <button>
                            <HiOutlineShoppingCart className="cart-icon" />
                            <span className="cart-value">{cartCount}</span>
                        </button>
                        <a href="">sign in</a>
                    </div>

                    <MobileHeader />
                </div>
            </nav>
        </>
    )
}

export default DesktopHeader;