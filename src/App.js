import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import Profile from './components/Profile';
import Contact from './components/Contact';

// 新しいLayoutコンポーネント
function Layout({ children }) {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <Header />}
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
