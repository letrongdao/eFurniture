import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyEfLknPMvR65jK2P0r7d0YaA8JV30jCg",
  authDomain: "efurniture-7dbd5.firebaseapp.com",
  projectId: "efurniture-7dbd5",
  storageBucket: "efurniture-7dbd5.appspot.com",
  messagingSenderId: "882407449874",
  appId: "1:882407449874:web:5af90b34fe92a1f584ffcb",
  measurementId: "G-XB106M3EMQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);