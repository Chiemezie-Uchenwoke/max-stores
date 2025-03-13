import Logo from "../Logo/Logo";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaUser, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

const todayDate = new Date().toString().slice(0, 15);
const topText = ["Welcome to max stores - we provide you the best", "Premium products at affordable prices", `today is ${todayDate}`];

const DesktopHeader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cartCount } = useContext(CartContext);
    const { currentUser, userLoggedIn } = useContext(AuthContext);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 1) % topText.length);
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval); // Clean up the interval
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        try {
            await doSignOut();
            setDropdownOpen(false);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const headerText = topText[currentIndex];

    return(
        <>
            <header>
                <p>{headerText}</p>
            </header>
            <nav>
                <div className="container">
                    <Link to="/">
                        <Logo />
                    </Link>

                    <div className="nav-links">
                        <Link className="nav-item" to="/">home</Link>
                        <Link to="/products" className="nav-item">products</Link>
                        <Link to="/cart" className="cart-button">
                            <HiOutlineShoppingCart className="cart-icon" />
                            <span className="cart-value">{cartCount}</span>
                        </Link>
                        
                        {userLoggedIn ? (
                            <div className="user-profile-container" ref={dropdownRef}>
                                <div 
                                    className="user-profile" 
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {currentUser?.photoURL ? (
                                        <img 
                                            src={currentUser.photoURL || "/placeholder.svg"} 
                                            alt="User" 
                                            className="user-avatar" 
                                        />
                                    ) : (
                                        <FaUser className="user-icon" />
                                    )}
                                    <span className="user-name">
                                        {currentUser?.displayName?.split(' ')[0] || 'User'}
                                    </span>
                                    <FaCaretDown className="dropdown-icon" />
                                </div>
                                
                                {dropdownOpen && (
                                    <div className="user-dropdown">
                                        <button onClick={handleSignOut} className="signout-button">
                                            <FaSignOutAlt className="signout-icon" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/signin" className="nav-item">sign in</Link>
                        )}
                    </div>

                    <MobileHeader />
                </div>
            </nav>
        </>
    );
};

export default DesktopHeader;