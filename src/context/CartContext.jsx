import { useState, createContext } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext({
    cartCount: 0,
    setCartCount: () => {}
});
export {CartContext};

const CartProvider = ({children}) => {

    const [cartCount, setCartCount] = useState(0)

    return(
        <CartContext.Provider value={{cartCount, setCartCount}} >
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}