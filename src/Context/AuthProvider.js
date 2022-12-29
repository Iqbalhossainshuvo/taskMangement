import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import {
  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,
 

} from 'firebase/auth'
import app from '../Firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  console.log(user)
  //1. Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

 

 
  // 4. Google Signin
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  // 5. Logout
  const logout = () => {
     localStorage.removeItem('aircnc-token')
    return signOut(auth)
  }

  //6. Login with Password
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

 

  useEffect(() => {
    //this part will execute once the component is mounted.
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => {
      //this part will execute once the component is unmounted.
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    createUser,
    signInWithGoogle,
    logout,
    signin,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
