// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcFfi-ybwqKWnTPRdCFq4BqnD2dAfdsBw",
  authDomain: "taskmangment-f0db5.firebaseapp.com",
  projectId: "taskmangment-f0db5",
  storageBucket: "taskmangment-f0db5.appspot.com",
  messagingSenderId: "305413681117",
  appId: "1:305413681117:web:4c2ae8f1e08107ae87d034",
  measurementId: "G-J2T3Y0WT70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app