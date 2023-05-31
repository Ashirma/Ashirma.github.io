import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../App.css"; // CSSのインポート
import logoutIcon from '../logout-icon.webp';

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        navigate("/");
      }
    });
  
    return () => {
      unsubscribeAuth();
    };
  }, [navigate]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("サインアウトエラー:", error);
    }
  };

  const handleTitleClick = () => {
    navigate("/chat");
  };

  return (
    <header className="header">
      <h2 className="app-title" onClick={handleTitleClick}>front chat app</h2>
      <div className="header-link">
        {currentUser ? (
          <>
            <Link to="/chat">Chat</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/contact">Contact</Link>
            <img src={logoutIcon} alt="logout" onClick={signOutUser} className="logout-icon" />
          </>
        ) : (
          <Link to="/">Sign In</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
