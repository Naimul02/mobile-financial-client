import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";

export const  AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const createUser = (email , password) => {
            setLoading(true);
            return createUserWithEmailAndPassword(auth , email , password)
    }
    const signInUser = (email , password) => {
            setLoading(true);
            return signInWithEmailAndPassword(auth , email , password);
    }

    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
                    if(currentUser){
                        setUser(currentUser);
                        setLoading(false);
                    }
            })

            return () => unsubscribe()
    } , [])

    const authInfo = {
        user ,
        createUser,
        signInUser,
        loading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;