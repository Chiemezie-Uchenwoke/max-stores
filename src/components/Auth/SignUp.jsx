import "./AuthUp.css";
import { Link } from "react-router-dom";

const Register = () => {

    return(
        <div className="register">
            <h2>Sign Up</h2>

            <form>
                <div className="input_group">
                    <input type="text" placeholder="First and last name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </div>

                <button type="button" className="google-signup">
                    Sign in with <span className="google">Google</span>
                </button>

                <p>
                    Already have an account? <Link to="/signin" className="signin">Sign In</Link>
                </p>
            </form>

        </div>
    )
}

export default Register;