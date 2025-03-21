'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState('received');
  const [loading, setLoading] = useState(true);
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock received reviews data
        const mockReceivedReviews = [
          {
            id: 'r1',
            serviceId: 'srvc1',
            serviceName: 'Professional Logo Design',
            clientId: 'user123',
            clientName: 'Sarah Johnson',
            clientAvatar: '/images/users/sarah.jpg',
            rating: 5,
            comment: "Alex is a genius! The logo design process was smooth and professional from start to finish. He understood my brand vision perfectly and delivered exactly what I was looking for. Highly recommend!",
            date: '2023-11-12T14:30:00.000Z',
          },
          {
            id: 'r2',
            serviceId: 'srvc2',
            serviceName: 'Brand Identity Package',
            clientId: 'user456',
            clientName: 'Michael Chen',
            clientAvatar: '/images/users/michael.jpg',
            rating: 4,
            comment: "Great work on my brand identity package. Alex was professional, responsive, and delivered high-quality work. The only reason I'm not giving 5 stars is because I had to request some minor revisions, but he handled them quickly.",
            date: '2023-10-28T09:15:00.000Z',
          },
          {
            id: 'r3',
            serviceId: 'srvc1',
            serviceName: 'Professional Logo Design',
            clientId: 'user789',
            clientName: 'Emma Wilson',
            clientAvatar: '/images/users/emma.jpg',
            rating: 5,
            comment: "Working with Alex was amazing! He created a stunning logo that perfectly captures my brand's essence. His communication was excellent throughout the process. Will definitely work with him again for future design needs.",
            date: '2023-09-15T16:45:00.000Z',
          }
        ];
        
        // Mock given reviews data
        const mockGivenReviews = [
          {
            id: 'g1',
            serviceId: 'srvc345',
            serviceName: 'Website Development',
            sellerId: 'user234',
            sellerName: 'David Rodriguez',
            sellerAvatar: '/images/users/david.jpg',
            rating: 5,
            comment: "David built an exceptional website for my business. His coding skills are top-notch, and he was very accommodating with my change requests. The website loads quickly and looks beautiful on all devices.",
            date: '2023-10-05T11:20:00.000Z',
          },
          {
            id: 'g2',
            serviceId: 'srvc567',
            serviceName: 'SEO Optimization',
            sellerId: 'user678',
            sellerName: 'Olivia Parker',
            sellerAvatar: '/images/users/olivia.jpg',
            rating: 3,
            comment: "Olivia's SEO service was okay, but I expected more detailed reporting and better results within the timeframe. Communication was good, but I think the strategy could have been more tailored to my specific industry.",
            date: '2023-08-22T13:10:00.000Z',
          }
        ];
        
        // Mock pending reviews data
        const mockPendingReviews = [
          {
            id: 'p1',
            orderId: 'ord123',
            serviceId: 'srvc789',
            serviceName: 'Social Media Strategy',
            sellerId: 'user901',
            sellerName: 'James Thompson',
            sellerAvatar: '/images/users/james.jpg',
            completedDate: '2023-11-05T10:00:00.000Z',
          }
        ];
        
        setReceivedReviews(mockReceivedReviews);
        setGivenReviews(mockGivenReviews);
        setPendingReviews(mockPendingReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <svg key={i} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg key={i} className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    
    return stars;
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
            <Link
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <p className="text-gray-600">
            Manage and view the reviews you&apos;ve received and given on the platform.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('received')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'received'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews Received
              <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                {receivedReviews.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('given')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'given'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews Given
              <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                {givenReviews.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('pending')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Reviews
              <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                {pendingReviews.length}
              </span>
            </button>
          </nav>
        </div>
        
        {/* Reviews Content */}
        <div>
          {/* Received Reviews */}
          {activeTab === 'received' && (
            <div>
              {receivedReviews.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven&apos;t received any reviews yet. Reviews will appear here after clients review your services.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {receivedReviews.map(review => (
                    <div key={review.id} className="bg-white shadow sm:rounded-lg overflow-hidden">
                      <div className="px-6 py-5">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                              {/* In a real app, this would be an actual image */}
                              <span className="font-bold text-lg">{review.clientName.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900 truncate">
                                <Link href={`/profile/${review.clientId}`} className="hover:text-indigo-600">
                                  {review.clientName}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(review.date)}
                              </p>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">for</span>
                              <Link href={`/services/${review.serviceId}`} className="ml-2 text-sm text-indigo-600 hover:text-indigo-800 truncate">
                                {review.serviceName}
                              </Link>
                            </div>
                            <p className="text-gray-700 mt-3">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Given Reviews */}
          {activeTab === 'given' && (
            <div>
              {givenReviews.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews given</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven&apos;t reviewed any services yet. After completing an order, you can leave a review for the service.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {givenReviews.map(review => (
                    <div key={review.id} className="bg-white shadow sm:rounded-lg overflow-hidden">
                      <div className="px-6 py-5">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                              {/* In a real app, this would be an actual image */}
                              <span className="font-bold text-lg">{review.sellerName.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900 truncate">
                                <Link href={`/profile/${review.sellerId}`} className="hover:text-indigo-600">
                                  {review.sellerName}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(review.date)}
                              </p>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">for</span>
                              <Link href={`/services/${review.serviceId}`} className="ml-2 text-sm text-indigo-600 hover:text-indigo-800 truncate">
                                {review.serviceName}
                              </Link>
                            </div>
                            <p className="text-gray-700 mt-3">
                              {review.comment}
                            </p>
                            <div className="mt-4 flex justify-end">
                              <button
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                              >
                                Edit my review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Pending Reviews */}
          {activeTab === 'pending' && (
            <div>
              {pendingReviews.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No pending reviews</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You don&apos;t have any services to review at the moment. After a service is completed, you can leave a review here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingReviews.map(review => (
                    <div key={review.id} className="bg-white shadow sm:rounded-lg overflow-hidden">
                      <div className="px-6 py-5">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                              {/* In a real app, this would be an actual image */}
                              <span className="font-bold text-lg">{review.sellerName.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link href={`/profile/${review.sellerId}`} className="hover:text-indigo-600">
                                  {review.sellerName}
                                </Link>
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending Review
                              </span>
                            </div>
                            <div className="mt-1 mb-2">
                              <Link href={`/services/${review.serviceId}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                                {review.serviceName}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">
                                Completed on {formatDate(review.completedDate)}
                              </p>
                            </div>
                            <div className="mt-4">
                              <Link 
                                href={`/reviews/write?orderId=${review.orderId}`}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Write a Review
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 