'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ChatInterface from '@/components/ui/ChatInterface';

export default function NewMessagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient');
  
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real app, fetch recipient data from API based on ID
    const fetchRecipient = async () => {
      if (!recipientId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - would come from API in production
        const mockRecipients = {
          '101': {
            id: '101',
            name: 'John Doe',
            title: 'Full Stack Developer',
            avatar: '/avatars/placeholder.jpg',
            status: 'online',
          },
          '102': {
            id: '102',
            name: 'Jane Smith',
            title: 'UX/UI Designer',
            avatar: '/avatars/placeholder-2.jpg',
            status: 'offline',
          },
          '103': {
            id: '103',
            name: 'Robert Johnson',
            title: 'DevOps Engineer',
            avatar: '/avatars/placeholder-3.jpg',
            status: 'online',
          }
        };
        
        const recipientData = mockRecipients[recipientId];
        
        if (recipientData) {
          setRecipient(recipientData);
        } else {
          setError('Recipient not found');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipient:', err);
        setError('Failed to load recipient data');
        setLoading(false);
      }
    };
    
    fetchRecipient();
  }, [recipientId]);
  
  const handleCloseChat = () => {
    router.push('/messages');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!recipientId) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              href="/messages"
              className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Messages
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Start a New Conversation</h1>
            <p className="text-gray-600 mb-8">
              Select a professional from the dashboard to start a conversation.
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-xl font-semibold mb-4">No recipient selected</h2>
              <p className="text-gray-600 mb-6">
                Browse our marketplace to find professionals and start a conversation with them.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              href="/messages"
              className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Messages
            </Link>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="rounded-full bg-red-100 p-3 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mr-3"
              >
                Find Professionals
              </Link>
              <Link
                href="/messages"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/messages"
            className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Messages
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Conversation</h1>
          <p className="text-gray-600 mb-6">
            Start a conversation with {recipient.name}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: '600px' }}>
          <ChatInterface recipient={recipient} onClose={handleCloseChat} />
        </div>
      </div>
    </div>
  );
} 