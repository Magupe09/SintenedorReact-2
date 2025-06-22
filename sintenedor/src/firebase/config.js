// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDky6AXqzVzXlXd0F4N1Cn5rY3G-Gd1cI",
  authDomain: "kiosco-magupe.firebaseapp.com",
  projectId: "kiosco-magupe",
  storageBucket: "kiosco-magupe.firebasestorage.app",
  messagingSenderId: "136790162070",
  appId: "1:136790162070:web:aabcc845b774e307a560b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db }; // Exporta la instancia de la base de datos para usarla en tus componentes