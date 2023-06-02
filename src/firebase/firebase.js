
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyAfeAoehtPzHqbcQUuZqlpmKI5LI5Uu1ZY",
    authDomain: "immo-app-be281.firebaseapp.com",
    projectId: "immo-app-be281",
    storageBucket: "immo-app-be281.appspot.com",
    messagingSenderId: "7842112570",
    appId: "1:7842112570:web:a0cd4ca0b076b466a00103",
  measurementId: "G-SENQ8LHT5E"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// // Import the functions you need from the SDKs you need
// const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBYrxdXqvDeX3j8cqeGto8-3jSUzYppPtY",
//   authDomain: "immo-735c3.firebaseapp.com",
//   projectId: "immo-735c3",
//   storageBucket: "immo-735c3.appspot.com",
//   messagingSenderId: "1045899436457",
//   appId: "1:1045899436457:web:832adeacb530cc7b1e64b8",
//   measurementId: "G-XF4GFVBR18"
// };