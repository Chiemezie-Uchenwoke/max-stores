import products from "../products";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGallery.css"

const ProductGallery = () => {
    return(
        <div className="product__grid__container container top-margin">
            {products.slice(0, 10).map((product) => (
                <ProductCard 
                    key={product.id} 
                    id={product.id}
                    src={product.src} 
                    alt={product.alt}
                    price={product.price}
                    name={product.name} 
                />
            ))}
        </div>
    )
}

export default ProductGallery;