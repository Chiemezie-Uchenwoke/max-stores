import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import "./CartItem.css";

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-cont">
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
      </div>
    );
  }

  return (
    <div className="cart-container container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-container-inner">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="f-p">
                <div className="item-image">
                  <img src={item.src || "/placeholder.svg"} alt={item.alt} />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price}</p>
                </div>
              </div>

              <div className="q-t">
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    <FaMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
