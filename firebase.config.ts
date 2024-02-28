import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDauR1npVegutns9dlpNy_P8xQ1fTOdVSM",
  authDomain: "rieltimemasoi.firebaseapp.com",
  projectId: "rieltimemasoi",
  storageBucket: "rieltimemasoi.appspot.com",
  messagingSenderId: "339283335662",
  appId: "1:339283335662:web:bc1c3b7b8b38317a2096ff",
  measurementId: "G-Q5T49W0SV7",
  databaseURL: "https://rieltimemasoi-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
