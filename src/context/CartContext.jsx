import { useState, createContext, useCallback, useEffect, useRef } from "react"
import PropTypes from "prop-types"

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getTotalPrice: () => {},
  isProductInCart: () => {},
})

export { CartContext }

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const initialLoadDone = useRef(false)

  // Load cart data from localStorage on initial render
  useEffect(() => {
    if (!initialLoadDone.current) {
      const storedCartItems = localStorage.getItem("cartItems")
      // console.log("Stored cart items:", storedCartItems)
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems)
        // console.log("Parsed cart items:", parsedCartItems)
        setCartItems(parsedCartItems)
        const newCartCount = parsedCartItems.reduce((total, item) => total + item.quantity, 0)
        // console.log("New cart count:", newCartCount)
        setCartCount(newCartCount)
      }
      initialLoadDone.current = true
    }
  }, [])

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    if (initialLoadDone.current) {
      // console.log("Saving cart items:", cartItems)
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Add item to cart
  const addToCart = useCallback((product) => {
    // console.log("Adding to cart:", product)
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex !== -1) {
        // If product exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // If product doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })

    // Update total cart count
    setCartCount((prevCount) => prevCount + 1)
  }, [])

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    // console.log("Removing from cart:", productId)
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId)

      if (existingItem) {
        // Decrease cart count by the quantity of the removed item
        setCartCount((prevCount) => prevCount - existingItem.quantity)

        // Remove the item from cart
        return prevItems.filter((item) => item.id !== productId)
      }
      return prevItems
    })
  }, [])

  // Update item quantity
  const updateQuantity = useCallback(
    (productId, newQuantity) => {
      console.log("Updating quantity:", productId, newQuantity)
      if (newQuantity <= 0) {
        removeFromCart(productId)
        return
      }

      setCartItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === productId) {
            // Update cart count based on quantity change
            const quantityDifference = newQuantity - item.quantity
            setCartCount((prevCount) => prevCount + quantityDifference)

            return { ...item, quantity: newQuantity }
          }
          return item
        })
      })
    },
    [removeFromCart],
  )

  // Calculate total price
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  // Check if a product is in the cart
  const isProductInCart = useCallback(
    (productId) => {
      return cartItems.some((item) => item.id === productId)
    },
    [cartItems],
  )

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem("cartItems");
    console.log("Cart cleared from context");
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        isProductInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

