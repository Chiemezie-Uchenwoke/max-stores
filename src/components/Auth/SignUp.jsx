import { useState } from "react";
import "./AuthUp.css";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { updateProfile } from "firebase/auth";
// import { auth } from "../firebase/config";

const Register = () => {
    const [name, setName] = useState("");
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
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            
            // Update the user's display name
            if (name) {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
            }
            
            navigate("/"); // Redirect to home page after successful signup
        } catch (error) {
            console.error("Sign up error:", error);
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already in use');
            } else if (error.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters');
            } else {
                setError('An error occurred. Please try again.');
            }
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

    return(
        <div className="register">
            <h2>Sign Up</h2>
            
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input_group">
                    <input 
                        type="text" 
                        placeholder="First and last name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
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
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </div>

                <button 
                    type="button" 
                    className="google-signup"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    Sign Up with <span className="google">Google</span>
                </button>

                <p>
                    Already have an account? <Link to="/signin" className="signin">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;