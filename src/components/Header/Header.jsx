import "./Header.css";
import logo from "../../assets/logo.png"
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { useState, useEffect } from "react";

const todayDate = new Date().toString().slice(0, 15);
const topText = ["Premium products at affordable prices", `today is ${todayDate}`]
    

const Header = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 1) % topText.length);
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval); // Clean up the interval
    }, []);

    const headerText = topText[currentIndex];

    return (
        <>
            <header>
                <p>{headerText}</p>
            </header>
            <nav>
                <div className="container">
                    <a href="./index.html">
                        <img src={logo} alt="logo" />
                    </a>

                    <div className="nav-links">
                        <a href="#">home</a>
                        <a href="#">products</a>
                        <button>
                            <HiOutlineShoppingCart className="cart-icon" />
                            <span className="cart-value">0</span>
                        </button>
                        <a href="">sign in</a>
                    </div>

                    <div className="mobile">
                        <IoMdMenu />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;