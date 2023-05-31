// components/SignInButton.js
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <p>サインイン</p>
    </button>
  );
}

export default SignInButton;
