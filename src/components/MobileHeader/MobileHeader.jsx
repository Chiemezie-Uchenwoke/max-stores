import { useState, useEffect, useRef } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaUser, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';
import { IoMdMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

const MobileHeader = () => {
    const [toggler, setToggler] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {cartCount} = useContext(CartContext);
    const { currentUser, userLoggedIn } = useContext(AuthContext);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        if (toggler) {
            document.querySelector(".mobile_dropdown").classList.add("remove-roll");
            setTimeout(() => {
                setToggler(!toggler); 
                document.querySelector(".mobile_dropdown").classList.remove("remove-roll");
            }, 1000); 
        } else {
            setToggler(!toggler); 
        }
    }

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

  return (
      <div className="mobile">
        <IoMdMenu className="toggler" id="toggler" onClick={handleToggle} />
        {toggler && (
          <div className="mobile_dropdown" id="mobile_dropdown">
            <div className="dropdown_inner">
              <MdOutlineClose className="close-icon" onClick={handleToggle} />

              <div className="dropdown-links">
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
            </div>
          </div>
        )}
      </div>
  );
};

export default MobileHeader;