// components/Home.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chatroom");
    }
  }, [user, navigate]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      {!user && (
        <button onClick={signInWithGoogle}>
          <p>サインイン</p>
        </button>
      )}
    </div>
  );
}

export default Home;
