import "./Footer.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const eachYear = new Date().getFullYear();
    return (
        <footer className="top-margin">
            <div className="container footer_inner">
                <div>
                    <Logo />
                    <p>© all rights reserved <span>{eachYear}</span></p>
                </div>

                <ul>
                    <h2>contact</h2>
                    <li>Lagos, Nigeria.</li>
                    <li>mobile: +234 706 896 9903</li>
                    <li>Email: max-stores@gmail.com</li>
                </ul>

                <ul>
                    <h2>Navigation</h2>
                    <li><Link className="footer-nav" to="/">home</Link></li>
                    <li><Link className="footer-nav" to="/products">products</Link></li>
                    <li><Link className="footer-nav" to="/cart">cart</Link></li>
                    <li><Link className="footer-nav" to="/signin">signin</Link></li>
                </ul>

                <div>
                    <h2>connect with us</h2>
                    <div className="socials">
                        <button><FaFacebookF /></button>
                        <button><FaInstagram /></button>
                        <button><FaTiktok /></button>
                        <button><FaYoutube /></button>
                        <button><FaPinterestP /></button>
                        <button><FaXTwitter /></button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;