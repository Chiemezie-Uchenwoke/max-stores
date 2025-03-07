import Header from '../Header/Header';
import ProductGallery from '../ProductGallery/ProductGallery';
import Footer from '../Footer/Footer';
import Hero from "../Hero/Hero";
import Offers from '../Offers/Offers';

const HomePage = () => {
    return (
        <>
            <Header /> 
            <Hero />
            <Offers />
            <ProductGallery />
            <Footer />
        </>
    )
}
export default HomePage;