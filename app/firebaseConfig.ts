// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "flee-marketplace.firebaseapp.com",
  projectId: "flee-marketplace",
  storageBucket: "flee-marketplace.firebasestorage.app",
  messagingSenderId: "237380741343",
  appId: "1:237380741343:web:d415f07b4e4fd3f14ca16a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
