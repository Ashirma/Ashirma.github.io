// components/SignOutButton.js
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function SignOutButton() {
  return (
    <button onClick={() => signOut(auth)}>
      <p>サインアウト</p>
    </button>
  );
}

export default SignOutButton;
