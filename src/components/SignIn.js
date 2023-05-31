import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import signinImage from '../signin-image.jpg';

function SignIn() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (error) {
      console.error("Google サインインエラー:", error);
    }
  };

  return (
    <div className="signin-container signin-page">
      <div className="signin-form-container">
        <h1>front-chat-app</h1>
        <button onClick={signInWithGoogle}>Googleでサインイン</button>
      </div>
      <div className="signin-image-container">
        <img src={signinImage} alt="background" className="signin-image"/>
      </div>
    </div>
  );
}

export default SignIn;
