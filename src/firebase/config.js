import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDH4QugXOE3tr5GHNsmtiYQkTq_QWIl5LM",
  authDomain: "food-donation-d4118.firebaseapp.com",
  projectId: "food-donation-d4118",
  storageBucket: "food-donation-d4118.firebasestorage.app",
  messagingSenderId: "338090388127",
  appId: "1:338090388127:web:f7282afd7f632b26c8d0aa",
  measurementId: "G-YBNGC2HGVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app; 