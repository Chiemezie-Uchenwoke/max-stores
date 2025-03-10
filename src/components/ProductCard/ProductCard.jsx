import PropTypes from "prop-types"
import { BsCartPlus } from "react-icons/bs"
import "./ProductCard.css"
import { CartContext } from "../../context/CartContext"
import { useContext, useCallback } from "react"

const ProductCard = ({ id, src, alt, name, price }) => {
  const { addToCart, isProductInCart } = useContext(CartContext)

  // Check if product is already in cart
  const isInCart = isProductInCart(id)

  const handleAddToCart = useCallback(() => {
    const product = { id, src, alt, name, price }
    addToCart(product)
  }, [id, src, alt, name, price, addToCart])

  return (
    <div className="product__card">
      <div className="product-img">
        <img src={src || "/placeholder.svg"} alt={alt} />
      </div>
      <div className="product-description">
        <label htmlFor="product-name" className="product__name">
          {name}
        </label>
        <span>
          <label htmlFor="price" className="price">
            ${price}
          </label>
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            style={{ color: isInCart ? "rgba(26, 26, 26, 0.6)" : "#1a1a1a" }}
          >
            {isInCart ? "Added" : <BsCartPlus className="icon" />}
          </button>
        </span>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default ProductCard

