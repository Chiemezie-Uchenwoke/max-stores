import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
export {AuthContext};

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (user){
                // setCurrentUser({...user})    
                // setCurrentUser({user})    
                // Only keep the properties you need
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified
                });
                setUserLoggedIn(true)
            } else{
                setCurrentUser(null)
                setUserLoggedIn(false)
            }
            setLoading(false)
          
        })
    
        return unsubscribe
      }, [])

      const value = {
        currentUser,
        userLoggedIn,
        loading
      }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )    
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider;