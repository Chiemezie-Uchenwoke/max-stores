import products from "../products";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGallery.css"

const AllProductGallery = () => {
    return(
        <div className="product__grid__container container top-margin">
            {products.map((product) => (
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

export default AllProductGallery;