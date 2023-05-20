import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import { getAuth } from "firebase/auth";
import { app } from '../../firebase.config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export const AuthContex = createContext(null)

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [toys, setToys] = useState([])


    const googleSignIn = () =>{
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () =>{
            return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoader(null)
        })

        //stop observing after unmount
        return unsubscribe()
    },[])

    const userInfo ={
        user,
        setUser,
        loader,
        setLoader,
        toys,
        setToys,
        googleSignIn,
        logOut
    }

    return (
        <AuthContex.Provider value={userInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthContextProvider;