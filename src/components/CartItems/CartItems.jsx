import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import "./CartItem.css";

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useContext(CartContext);
  const { userLoggedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleCheckout = () => {
    if (!userLoggedIn) {
      // Redirect to sign in page
      navigate("/signin");
    } else {
      // Show thank you message and clear cart
      setPurchaseComplete(true);
      
      // Clear cart after 3 seconds
      setTimeout(() => {
        console.log("Before clearing cart:", cartItems);

        clearCart();
        console.log("After clearing cart state");

        // Reset purchase complete state after another 2 seconds
        setTimeout(() => {
          setPurchaseComplete(false);
        }, 2000);
      }, 3000);
    }
  };

  // Thank you message component
  const ThankYouMessage = () => (
    <div className="thank-you-container container">
      <div className="thank-you-message">
        
        <h2>Thank You for Your Purchase <FaCheckCircle className="check-icon" /></h2>
        <p>Your order has been received and is being processed.</p>
        {currentUser && (
          <p className="customer-email">
            A confirmation email will be sent to {currentUser.email}
          </p>
        )}
        <div className="order-processing">
          <div className="processing-indicator">
            <div className="processing-bar"></div>
          </div>
          <Link to="/products" className="back-to-products">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  if (purchaseComplete) {
    return <ThankYouMessage />;
  }

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

          <button className="checkout-btn" onClick={handleCheckout}>
            {userLoggedIn ? "Complete Purchase" : "Sign in to Checkout"}
          </button>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;