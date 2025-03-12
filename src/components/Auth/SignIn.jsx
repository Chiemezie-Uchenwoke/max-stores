import { useState } from "react";
import "./AuthIn.css";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            await doSignInWithEmailAndPassword(email, password);
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            console.error("Sign in error:", error);
            setError(
                error.code === 'auth/invalid-credential' 
                ? 'Invalid email or password' 
                : 'An error occurred. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        
        try {
            await doSignInWithGoogle();
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            console.error("Google sign in error:", error);
            setError('Failed to sign in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <h2>Sign In</h2>
            
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </div>

                <button 
                    type="button" 
                    className="google-signin"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    Sign in with <span className="google">Google</span>
                </button>

                <p>Don&apos;t have an account? <Link to="/signup" className="signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default Login;