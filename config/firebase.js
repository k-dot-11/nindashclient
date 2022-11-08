// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkMYCHDIzBg_Slocf9IOyMqH1CReoe9-I",
    authDomain: "nindashfdts.firebaseapp.com",
    projectId: "nindashfdts",
    storageBucket: "nindashfdts.appspot.com",
    messagingSenderId: "841319224543",
    appId: "1:841319224543:web:57752f7ff3fa7105cc856a",
    measurementId: "G-F9B07XFZ4Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
