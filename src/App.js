import logo from "./logo.svg";
import React, { useState } from "react";
import ChatRoom from "./component/ChatRoom";
import Header from "./component/Header";
import docImage from "./doc.webp";
import "./App.css";
import { ChatCircleText } from "phosphor-react";

function WebBody() {
  return (
    <div className="web-body">
      <div className="text-container">
        <div className="text1">Caring</div>
        <div className="text2"> for you, with heart and excellence.</div>
        <div className="section" >
          <div className="text3">Check Our Services</div>
          <div className="text4">Need help? Click the chat icon to talk to us!</div>
        </div>
      </div>
      <div className="image-container">
        <img src={docImage} className="image" alt="logo" />
      </div>
    </div>
  );
}



const FloatingChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-container">
      <div className="chat-icon" onClick={toggleChat}>
      <ChatCircleText size={50} />
      </div>
      {isOpen && (
        <ChatRoom />
      )}
    </div>
  );
};

function App() {
  return (
    <>
    <Header />
    <WebBody />
    <FloatingChatIcon />
    </>
  );
}

export default App;
