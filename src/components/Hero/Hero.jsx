import "./Hero.css";
// import orange from "../../assets/orange.png";
import sneakers from "../../assets/sneakers.png";
import cart from "../../assets/cart6.png";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Hero = () => {

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-description">
                    <div>
                        <p>save up <span className="col">30%</span> off</p>
                        <h1>premium quality at an affordable rate</h1>
                    </div>
                    <Link to="/products" className="shop-now">
                        Shop Now <MdKeyboardDoubleArrowRight className="arrow-right" />
                    </Link>
                </div>
        
                <div className="hero-images">
                    <img src={cart} alt="image of a shopping cart filled with items"/>
                </div>

                <div className="orange">
                    <img src={sneakers} alt="Image of an orange"/>
                </div>
            </div>
        </section>
    )
}
export default Hero;