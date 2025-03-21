'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ChatInterface({ recipient, onClose }) {
  const [messages, setMessages] = useState([
    // Demo messages - would come from API in production
    {
      id: 1,
      sender: 'recipient',
      text: 'Hi there! How can I help you with your project today?',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hello! I need help with my website redesign. Are you available next week?',
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    },
    {
      id: 3,
      sender: 'recipient',
      text: 'Yes, I have availability next week. Could you tell me more about the project scope?',
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  
  // Demo recipient data - would be provided by props in production
  const demoRecipient = {
    id: '1',
    name: 'John Doe',
    title: 'Full Stack Developer',
    avatar: '/avatars/placeholder.jpg',
    status: 'online',
  };
  
  // Use props or demo data
  const chatRecipient = recipient || demoRecipient;
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // In a real app, we would send the message to an API here
    // Then add the recipient's reply after a short delay to simulate a response
    setTimeout(() => {
      const recipientReply = {
        id: messages.length + 2,
        sender: 'recipient',
        text: 'Thanks for the details. I think I can help with that. Would you like to schedule a call to discuss further?',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, recipientReply]);
    }, 2000);
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center overflow-hidden mr-3">
            <span className="text-xl font-semibold">{chatRecipient.name.charAt(0)}</span>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-indigo-600 ${
              chatRecipient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          <div>
            <h3 className="font-medium">{chatRecipient.name}</h3>
            <p className="text-xs text-indigo-200">{chatRecipient.title}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:text-indigo-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span
                  className={`block text-xs mt-1 ${
                    message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-4 py-2"
          >
            <span className="sr-only">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
} 