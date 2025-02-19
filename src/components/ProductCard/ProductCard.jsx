import PropTypes from 'prop-types';
import { BsCartPlus } from "react-icons/bs";
import "./ProductCard.css"
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

const ProductCard = ({src, alt, name, price}) => {
    const {setCartCount} = useContext(CartContext)

    const updateCart = () => {
        setCartCount(prevCount => prevCount + 1);
    }

    return(
        <div className="product__card">
            <div className="product-img">
                <img src={src} alt={alt} />
            </div>
            <div className="product-description">
                <label htmlFor="product-name" className='product__name'>{name}</label>
                <span>
                    <label htmlFor="price" className="price">${price}</label>
                    <button onClick={updateCart}><BsCartPlus className="icon"/></button>
                </span>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default ProductCard;