import "./Offers.css";
import { FaGift, FaStar, FaFire } from "react-icons/fa";
import OfferCard from "./OfferCard";

const Offers = () => {

    const offerData = [
        { title: "Exclusive Deals", description: "Unbeatable discounts on must-have items.", icon: FaGift, className: "gift-icon"},
        { title: "Premium Quality", description: "Designed for durability & long-lasting performance.", icon: FaStar, className: "star-icon"},
        { title: "Trending Now", description: "Stay ahead with the latest fashion styles.", icon: FaFire, className: "fire-icon"},
      ];

    return (
        <section className="offers container top-margin">
            <div className="offers__inner">
                {offerData.map((offer, index) => {
                    return (
                        <OfferCard key={index} {...offer} />
                    )
                })}
            </div>
        </section>
    )
}

export default Offers;