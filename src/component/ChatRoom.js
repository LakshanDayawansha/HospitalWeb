import React, { useState, useEffect, useRef } from 'react';
import './chatroom.css';


const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const clientId = useRef(Math.random().toString(36).substring(7));
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const connectWebSocket = () => {
    setIsConnecting(true);
    const ws = new WebSocket(`ws://localhost:8000/ws/${clientId.current}`);

    ws.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      setIsConnecting(false);
    });

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      addMessage(data.message, false);
    });

    ws.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      setIsConnecting(true);
      setTimeout(connectWebSocket, 3000);
    });

    ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      setIsConnecting(true);
    });

    wsRef.current = ws;
  };

  const addMessage = (content, isSender) => {
    setMessages(prev => [...prev, { text: content, isSender }]);
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    const message = newMessage.trim();
    
    if (message && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        message: message,
        userId: clientId.current
      }));
      
      addMessage(message, true);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <span>Chat Room</span>
        
      </div>
      <div 
        className="messages-container" 
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isSender ? 'sender' : 'receiver'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form 
        className="input-container"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          className="input-field"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={isConnecting ? "Connecting to server..." : "Type a message..."}
          disabled={!isConnected}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!isConnected}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;