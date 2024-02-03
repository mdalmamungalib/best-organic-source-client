import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    //login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //update user
    const updateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser,
            {
                displayName: name,
                photoURL: photo
            });
    };

    // verifyEmail
    const verifyEmail = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    };

    // sing in Google
    const singInWidthGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    //user forgat password
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    // user log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    //unsubscribe user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                axios.post(`${import.meta.env.VITE_SERVER_URL}/jwt`, {email: currentUser.email})
                .then(data => {
                    localStorage.setItem('access-token', data.data.token);
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        updateUser,
        verifyEmail,
        singInWidthGoogle,
        resetPassword,
        logOut,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;