import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

const MobileHeader = () => {
    const [toggler, setToggler] = useState(false);

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
                <a href="#">home</a>
                <a href="#" className="pdt">
                  products
                </a>
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
  );
};

export default MobileHeader;