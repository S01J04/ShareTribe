'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MessagesPage() {
  const router = useRouter();
  const messageInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    fetchConversations();
  }, []);
  
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
    }
  }, [activeConversation]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const fetchConversations = async () => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock conversations data
      const mockConversations = [
        {
          id: 'conv-1',
          participant: {
            id: 'user-1',
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            online: true
          },
          lastMessage: {
            text: 'I just reviewed your proposal and I think it looks great! When can we schedule a call to discuss further?',
            timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
            isRead: false
          },
          unreadCount: 2
        },
        {
          id: 'conv-2',
          participant: {
            id: 'user-2',
            name: 'Michael Brown',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            online: false
          },
          lastMessage: {
            text: 'Thanks for the update. The designs are looking great. I have a few minor changes to suggest.',
            timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
            isRead: true
          },
          unreadCount: 0
        },
        {
          id: 'conv-3',
          participant: {
            id: 'user-3',
            name: 'Emily Wilson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            online: true
          },
          lastMessage: {
            text: "Hello! I'm interested in your web development service. Could you provide more details about your process and timeline?",
            timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
            isRead: true
          },
          unreadCount: 0
        },
        {
          id: 'conv-4',
          participant: {
            id: 'user-4',
            name: 'David Miller',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            online: false
          },
          lastMessage: {
            text: "The project has been completed successfully. I've just sent the final files. Please let me know if you need any adjustments.",
            timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
            isRead: true
          },
          unreadCount: 0
        },
        {
          id: 'conv-5',
          participant: {
            id: 'user-5',
            name: 'Jessica Lee',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            online: true
          },
          lastMessage: {
            text: "I've checked the revisions you made and everything looks perfect now. Thank you for your attention to detail!",
            timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
            isRead: true
          },
          unreadCount: 0
        }
      ];
      
      setConversations(mockConversations);
      
      // Set first conversation as active by default if no active conversation
      if (!activeConversation && mockConversations.length > 0) {
        setActiveConversation(mockConversations[0]);
      }
      
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchMessages = async (conversationId) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get selected conversation
      const conversation = conversations.find(c => c.id === conversationId);
      
      if (!conversation) return;
      
      // Generate mock messages data based on the conversation
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const mockMessages = [
        {
          id: `msg-${conversationId}-1`,
          conversationId,
          sender: {
            id: 'current-user',
            name: 'You',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          },
          text: 'Hi there! Thanks for reaching out about the project.',
          timestamp: new Date(yesterday.setHours(10, 30)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-2`,
          conversationId,
          sender: {
            id: conversation.participant.id,
            name: conversation.participant.name,
            avatar: conversation.participant.avatar
          },
          text: 'Hello! I was looking at your profile and I think your skills would be perfect for our project.',
          timestamp: new Date(yesterday.setHours(10, 45)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-3`,
          conversationId,
          sender: {
            id: 'current-user',
            name: 'You',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          },
          text: "I'd be happy to discuss it further. Could you provide more details about what you're looking for?",
          timestamp: new Date(yesterday.setHours(11, 15)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-4`,
          conversationId,
          sender: {
            id: conversation.participant.id,
            name: conversation.participant.name,
            avatar: conversation.participant.avatar
          },
          text: "We need a complete website redesign for our e-commerce store. The current site is outdated and not mobile-friendly. We'd like something modern, responsive, and optimized for conversions.",
          timestamp: new Date(yesterday.setHours(11, 30)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-5`,
          conversationId,
          sender: {
            id: 'current-user',
            name: 'You',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          },
          text: "That sounds like a project I can definitely help with. I have extensive experience with e-commerce sites. What's your timeline and budget for this project?",
          timestamp: new Date(yesterday.setHours(13, 0)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-6`,
          conversationId,
          sender: {
            id: conversation.participant.id,
            name: conversation.participant.name,
            avatar: conversation.participant.avatar
          },
          text: "We'd like to launch the new site in about 2 months. Our budget is around $5,000-$7,000. Does that work for you?",
          timestamp: new Date(yesterday.setHours(14, 30)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-7`,
          conversationId,
          sender: {
            id: 'current-user',
            name: 'You',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
          },
          text: "That timeline and budget are reasonable for what you're looking for. I'll prepare a detailed proposal with my approach, deliverables, and timeline. I should have it ready for you by tomorrow.",
          timestamp: new Date(yesterday.setHours(15, 0)).toISOString(),
          isRead: true
        },
        {
          id: `msg-${conversationId}-8`,
          conversationId,
          sender: {
            id: conversation.participant.id,
            name: conversation.participant.name,
            avatar: conversation.participant.avatar
          },
          text: conversation.lastMessage.text,
          timestamp: conversation.lastMessage.timestamp,
          isRead: conversation.lastMessage.isRead
        }
      ];
      
      setMessages(mockMessages);
      
      // Mark conversation as read when opening
      if (conversation.unreadCount > 0) {
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === conversationId 
              ? { 
                  ...conv, 
                  unreadCount: 0, 
                  lastMessage: { ...conv.lastMessage, isRead: true } 
                } 
              : conv
          )
        );
      }
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg = {
      id: `msg-new-${Date.now()}`,
      conversationId: activeConversation.id,
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
      },
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    // Add new message to messages
    setMessages(prevMessages => [...prevMessages, newMsg]);
    
    // Update conversation last message
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              lastMessage: {
                text: newMessage.trim(),
                timestamp: new Date().toISOString(),
                isRead: false
              }
            }
          : conv
      )
    );
    
    // Clear input
    setNewMessage('');
    
    // Focus on input again
    messageInputRef.current?.focus();
  };
  
  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
  };
  
  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatConversationTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const groupMessagesByDate = (messages) => {
    const grouped = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateString = date.toLocaleDateString();
      
      if (!grouped[dateString]) {
        grouped[dateString] = [];
      }
      
      grouped[dateString].push(message);
    });
    
    return grouped;
  };
  
  const getDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }
  };
  
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Conversations List */}
            <div className="md:col-span-1 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {loading && !conversations.length ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No conversations found
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredConversations.map((conversation) => (
                      <li key={conversation.id}>
                        <button
                          className={`w-full text-left p-4 hover:bg-gray-50 focus:outline-none ${
                            activeConversation?.id === conversation.id ? 'bg-purple-50' : ''
                          }`}
                          onClick={() => handleConversationSelect(conversation)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative flex-shrink-0">
                              <div className="h-12 w-12 rounded-full">
                                <img
                                  src={conversation.participant.avatar}
                                  alt={conversation.participant.name}
                                  className="h-full w-full object-cover rounded-full"
                                />
                              </div>
                              {conversation.participant.online && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h2 className="text-sm font-medium text-gray-900 truncate">
                                  {conversation.participant.name}
                                </h2>
                                <p className="text-xs text-gray-500">
                                  {formatConversationTime(conversation.lastMessage.timestamp)}
                                </p>
                              </div>
                              <p className={`text-sm truncate ${
                                  conversation.unreadCount > 0
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500'
                                }`}
                              >
                                {conversation.lastMessage.text}
                              </p>
                            </div>
                            {conversation.unreadCount > 0 && (
                              <div className="ml-2 flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-600 text-white text-xs font-medium">
                                  {conversation.unreadCount}
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Message Thread */}
            <div className="md:col-span-2 flex flex-col" style={{ height: 'calc(100vh - 130px)' }}>
              {activeConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full">
                        <img
                          src={activeConversation.participant.avatar}
                          alt={activeConversation.participant.name}
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                      {activeConversation.participant.online && (
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-900">
                        {activeConversation.participant.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {activeConversation.participant.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {loading ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col justify-center items-center h-full text-gray-500">
                        <svg className="h-12 w-12 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation by sending a message</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {Object.keys(groupedMessages).map((date) => (
                          <div key={date} className="space-y-4">
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                              </div>
                              <div className="relative flex justify-center">
                                <span className="px-2 bg-gray-50 text-sm text-gray-500">
                                  {getDateLabel(date)}
                                </span>
                              </div>
                            </div>
                            
                            {groupedMessages[date].map((message) => (
                              <div key={message.id} className={`flex ${message.sender.id === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-md ${message.sender.id === 'current-user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                  {message.sender.id !== 'current-user' && (
                                    <div className="flex-shrink-0 mr-3">
                                      <div className="h-8 w-8 rounded-full">
                                        <img
                                          src={message.sender.avatar}
                                          alt={message.sender.name}
                                          className="h-full w-full object-cover rounded-full"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <div className={`flex flex-col ${message.sender.id === 'current-user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-4 py-2 rounded-lg ${
                                        message.sender.id === 'current-user'
                                          ? 'bg-purple-600 text-white mr-3'
                                          : 'bg-white text-gray-900 border border-gray-200 ml-1'
                                      }`}
                                    >
                                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">
                                      {formatMessageTime(message.timestamp)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          ref={messageInputRef}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="submit"
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          disabled={!newMessage.trim()}
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-gray-500">
                  <svg className="h-16 w-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your Messages</h3>
                  <p className="text-center mb-4">Select a conversation to start messaging</p>
                  <Link
                    href="/search"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Find Professionals
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 