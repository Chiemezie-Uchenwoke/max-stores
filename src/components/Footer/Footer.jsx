import "./Footer.css";
import Logo from "../Logo/Logo";

const Footer = () => {
    const eachYear = new Date().getFullYear();
    return (
        <footer className="top-margin">
            <div className="container">
                <Logo />
                <p>© all rights reserved <span>{eachYear}</span></p>
            </div>
        </footer>
    )
}

export default Footer;