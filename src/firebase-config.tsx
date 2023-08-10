import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHJOP6l9qnjPXu5tBZfaZOV-aH42zVJiM",
    authDomain: "weather-app-6e496.firebaseapp.com",
    projectId: "weather-app-6e496",
    storageBucket: "weather-app-6e496.appspot.com",
    messagingSenderId: "217685752081",
    appId: "1:217685752081:web:bd95ec9bf14679816fb4b0",
    measurementId: "G-6LDM0T004X"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)