import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/Firebase.init';

export const AuthContext=createContext();
const auth = getAuth(app);

const UseContext = ({children}) => {

    const [user, setUser]=useState('')
    const [loading, isLoading]=useState(true)
    const googleProvider=new GoogleAuthProvider();

    // create user 
    const createUser=(email, password)=>{
        isLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
     
    // update User 
    const updateUser=(name, photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })

    }

    // login user 
    const loginUser=(email, password)=>{
        isLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout User 
    const logOut=()=>{
        isLoading(true)
        return signOut(auth)
    }

    const googleLogin=()=>{
        isLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
        const unsubscribed=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            isLoading(false)
        })
        return()=> unsubscribed();
    },[])


    const userInfo={
        user,
        createUser,
        updateUser,
        logOut,
        loginUser,
        googleLogin,
        loading

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UseContext;