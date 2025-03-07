import PropTypes from "prop-types";

const OfferCard = ({ title, description, icon: Icon, className }) => {
  return (
    <div>
      <Icon className={`offer_icon ${className}`} />

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
};
export default OfferCard;

OfferCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string,
}