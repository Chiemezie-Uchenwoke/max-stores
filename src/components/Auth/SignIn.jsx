import "./AuthIn.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-form">
            <h2>Sign In</h2>

            <form>
                <div className="input-group">
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign In</button>
                </div>

                <button type="button" className="google-signin">
                    Sign in with <span className="google">Google</span>
                </button>

                <p>Don&apos;t have an account? <Link to="/signup" className="signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default Login;
