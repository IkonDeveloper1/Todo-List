// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTcgCVH08QwKTtGl42CGDbTsS_QZCrDMw",
  authDomain: "todo-list-b4e72.firebaseapp.com",
  projectId: "todo-list-b4e72",
  storageBucket: "todo-list-b4e72.firebasestorage.app",
  messagingSenderId: "915182177705",
  appId: "1:915182177705:web:19443c359de6e2bc7748b8",
  measurementId: "G-NKB31K6ZQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }