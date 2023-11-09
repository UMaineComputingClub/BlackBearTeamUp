// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA03rnRgSgBafBXx8166E-MA6N0JI_huxs",
    authDomain: "teamup-71d39.firebaseapp.com",
    projectId: "teamup-71d39",
    storageBucket: "teamup-71d39.appspot.com",
    messagingSenderId: "84760428579",
    appId: "1:84760428579:web:37a563f22f52dc9ceab196"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getFirestore(app);

export default app