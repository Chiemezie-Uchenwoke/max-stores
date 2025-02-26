import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";

const MobileHeader = () => {
    const [toggler, setToggler] = useState(false);

    const {cartCount} = useContext(CartContext);

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

  return (
      <div className="mobile">
        <IoMdMenu className="toggler" id="toggler" onClick={handleToggle} />
        {toggler && (
          <div className="mobile_dropdown" id="mobile_dropdown">
            <div className="dropdown_inner">
              <MdOutlineClose className="close-icon" onClick={handleToggle} />

              <div className="dropdown-links">
                  <Link className="nav-item" to="/">home</Link>
                  <Link to="/products" className="nav-item">
                    products
                  </Link>
                  <Link to="/cart" className="cart-button">
                    <HiOutlineShoppingCart className="cart-icon" />
                    <span className="cart-value">{cartCount}</span>
                  </Link>
                  <Link to="/signin" className="nav-item">sign in</Link>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default MobileHeader;