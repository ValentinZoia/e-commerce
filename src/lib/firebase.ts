import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArxYxPAjDsrGv3JeAzhwFU5kSo4jUNtck",
    authDomain: "ecommerce-ca3d4.firebaseapp.com",
    projectId: "ecommerce-ca3d4",
    storageBucket: "ecommerce-ca3d4.firebasestorage.app",
    messagingSenderId: "824398625717",
    appId: "1:824398625717:web:250fe3e86ce3330d4a37fc"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);