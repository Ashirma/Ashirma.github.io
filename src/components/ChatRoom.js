import React, { useState, useEffect } from "react";
import { collection, query, orderBy, addDoc, onSnapshot, doc, setDoc, getDoc } from "@firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Modal from 'react-modal';
import "../App.css";

Modal.setAppElement('#root'); 

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserInfo, setModalUserInfo] = useState({ displayName: '', photoURL: '' });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
        
        setUser(user);
      }
    });

    const messagesQuery = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        uid: user.uid,
        createdAt: new Date(),
        photoURL: user.photoURL,  // Add user's photo URL
        displayName: user.displayName,  // Add user's display name
      });

      setNewMessage("");
    } catch (error) {
      console.error("メッセージ送信エラー:", error);
    }
  };

  const openModal = (message) => {
    setModalUserInfo({ displayName: message.displayName, photoURL: message.photoURL });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="chatroom default-page">
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.uid === user.uid ? "sent" : ""}`}>
            <img 
              src={message.photoURL} 
              alt={message.displayName} 
              className="profile-icon"
              onClick={() => openModal(message)}
            />
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">
          送信
        </button>
      </form>
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        contentLabel="User Information"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            position: 'relative',
            left: 'auto',
            right: 'auto',
            width: '40%',
            margin: 'auto',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        <div className="chatroom-userinfo">
          <img src={modalUserInfo.photoURL} alt={modalUserInfo.displayName} className="user-image"></img>
          <p className="user-name">Name: {modalUserInfo.displayName}</p>
        </div>
        <div className="modal-buttons">
          <button onClick={closeModal} className="modal-submit-button" style={{ borderRadius: '5px' }}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default ChatRoom;
