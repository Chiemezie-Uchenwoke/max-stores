import "./Header.css";
import logo from "../../assets/logo.png"
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const todayDate = new Date().toString().slice(0, 15);
const topText = ["Premium products at affordable prices", `today is ${todayDate}`];

const Header = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [toggler, setToggler] = useState(false);

    /* const handleToggle = () => {
        setToggler(!toggler);
    }
 */
    const handleToggle = () => {
        if (toggler) {
            // Start the remove animation when closing
            document.querySelector(".mobile_dropdown").classList.add("remove-roll");
            setTimeout(() => {
                setToggler(!toggler); // After animation finishes, hide the menu
                document.querySelector(".mobile_dropdown").classList.remove("remove-roll");
            }, 1000); // Delay should match the animation duration
        } else {
            setToggler(!toggler); // Show the menu and trigger the open animation
        }
    }

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
                        <IoMdMenu className="toggler" id="toggler" onClick={handleToggle} />
                        {toggler && (
                            <div className="mobile_dropdown" id="mobile_dropdown">
                                <div className="dropdown_inner">
                                    <MdOutlineClose className="close-icon" onClick={handleToggle} />

                                    <div className="dropdown-links">
                                        <a href="#">home</a>
                                        <a href="#" className="pdt">products</a>
                                        <button>
                                            <HiOutlineShoppingCart className="cart-icon" />
                                            <span className="cart-value">0</span>
                                        </button>
                                        <a href="">sign in</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;