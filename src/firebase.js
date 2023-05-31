import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8271VJQdAAbeL6dJzryb-E9HsZWQMa6k",
  authDomain: "fir-e0923.firebaseapp.com",
  projectId: "fir-e0923",
  storageBucket: "fir-e0923.appspot.com",
  messagingSenderId: "351981183169",
  appId: "1:351981183169:web:cfa14f57c308f569a03440"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Add the following line to export signOut
const signOut = () => auth.signOut();

export { auth, provider, db, signOut };