'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock order data - in a real app this would come from your API
        // This just simulates finding an order by ID
        const mockOrders = {
          'order-123': {
            id: 'order-123',
            serviceId: 'srvc-789',
            serviceName: 'Full Website Development',
            serviceDescription: 'Complete website development including design, frontend and backend implementation, responsive layouts, and basic SEO setup.',
            sellerId: 'user-456',
            sellerName: 'Alex Johnson',
            sellerAvatar: '/images/users/alex.jpg',
            price: 1200,
            status: 'In Progress',
            dueDate: '2023-12-15T00:00:00.000Z',
            createdAt: '2023-11-20T00:00:00.000Z',
            progress: 40,
            messages: 3,
            timeline: [
              {
                date: '2023-11-20T10:30:00.000Z',
                event: 'Order Placed',
                description: 'You placed an order for Full Website Development'
              },
              {
                date: '2023-11-20T11:45:00.000Z',
                event: 'Order Accepted',
                description: 'Alex Johnson accepted your order'
              },
              {
                date: '2023-11-25T14:20:00.000Z',
                event: 'Requirements Confirmed',
                description: 'Project requirements were confirmed and work started'
              },
              {
                date: '2023-11-30T09:15:00.000Z',
                event: 'First Draft Delivered',
                description: 'Initial design mockups were delivered for review'
              }
            ],
            deliverables: [
              'Responsive website with 5 pages',
              'Custom contact form with email notifications',
              'Mobile-friendly design',
              'Basic SEO optimization',
              'Integration with Google Analytics'
            ],
            revisions: 2,
            additionalInfo: 'Client requested extra attention to mobile responsiveness and loading speed.'
          },
          'order-120': {
            id: 'order-120',
            serviceId: 'srvc-780',
            serviceName: 'SEO Optimization',
            serviceDescription: 'Complete SEO audit and optimization to improve search engine rankings, including keyword research, on-page optimization, and technical SEO fixes.',
            sellerId: 'user-450',
            sellerName: 'James Wilson',
            sellerAvatar: '/images/users/james.jpg',
            price: 450,
            status: 'Completed',
            dueDate: '2023-11-10T00:00:00.000Z',
            createdAt: '2023-10-25T00:00:00.000Z',
            completedAt: '2023-11-08T00:00:00.000Z',
            hasReview: true,
            reviewId: 'rev-123',
            timeline: [
              {
                date: '2023-10-25T14:30:00.000Z',
                event: 'Order Placed',
                description: 'You placed an order for SEO Optimization'
              },
              {
                date: '2023-10-25T16:20:00.000Z',
                event: 'Order Accepted',
                description: 'James Wilson accepted your order'
              },
              {
                date: '2023-10-30T11:45:00.000Z',
                event: 'Initial Audit Completed',
                description: 'Initial SEO audit completed and shared for review'
              },
              {
                date: '2023-11-05T09:30:00.000Z',
                event: 'Optimizations Applied',
                description: 'On-page and technical SEO optimizations applied'
              },
              {
                date: '2023-11-08T15:10:00.000Z',
                event: 'Order Completed',
                description: 'All deliverables submitted and order marked as complete'
              },
              {
                date: '2023-11-10T10:25:00.000Z',
                event: 'Review Submitted',
                description: 'You left a 5-star review'
              }
            ],
            deliverables: [
              'Comprehensive SEO audit report',
              'Keyword research and strategy document',
              'On-page optimization for 10 key pages',
              'Technical SEO improvements',
              'Monthly performance report template'
            ],
            revisions: 1,
            additionalInfo: 'Focus on improving local search visibility and Google Maps ranking.'
          },
          'order-115': {
            id: 'order-115',
            serviceId: 'srvc-775',
            serviceName: 'Content Writing',
            serviceDescription: 'Professional content writing services for blogs, websites, and marketing materials. SEO-optimized and engaging content tailored to your target audience.',
            sellerId: 'user-445',
            sellerName: 'David Brown',
            sellerAvatar: '/images/users/david.jpg',
            price: 150,
            status: 'Cancelled',
            dueDate: '2023-10-20T00:00:00.000Z',
            createdAt: '2023-10-05T00:00:00.000Z',
            cancelledAt: '2023-10-10T00:00:00.000Z',
            timeline: [
              {
                date: '2023-10-05T16:45:00.000Z',
                event: 'Order Placed',
                description: 'You placed an order for Content Writing'
              },
              {
                date: '2023-10-06T09:30:00.000Z',
                event: 'Order Accepted',
                description: 'David Brown accepted your order'
              },
              {
                date: '2023-10-10T14:15:00.000Z',
                event: 'Order Cancelled',
                description: 'You cancelled the order: Changed requirements'
              }
            ],
            deliverables: [
              '5 blog posts (1000 words each)',
              'SEO optimization for target keywords',
              'Meta descriptions and title tags',
              'One round of revisions'
            ],
            revisions: 1,
            cancelReason: 'Changed requirements',
            additionalInfo: 'Changed project direction and will need different content approach.'
          }
        };
        
        const foundOrder = mockOrders[orderId];
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Order not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details');
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Awaiting Delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTimelineIconColor = (event) => {
    switch (event) {
      case 'Order Placed':
      case 'Order Accepted':
        return 'bg-blue-500';
      case 'Requirements Confirmed':
      case 'Initial Audit Completed':
      case 'Optimizations Applied':
      case 'First Draft Delivered':
        return 'bg-purple-500';
      case 'Order Completed':
      case 'Review Submitted':
        return 'bg-green-500';
      case 'Order Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">{error}</h2>
            <p className="mt-1 text-sm text-gray-500">We couldn&apos;t find the order you&apos;re looking for.</p>
            <div className="mt-6">
              <Link
                href="/orders"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Orders
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Order #{order.id}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Service</h4>
                  <Link href={`/services/${order.serviceId}`} className="text-lg font-medium text-purple-600 hover:text-purple-700">
                    {order.serviceName}
                  </Link>
                  <p className="mt-1 text-sm text-gray-600">{order.serviceDescription}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Seller</h4>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <span className="text-sm font-medium text-gray-600">{order.sellerName.charAt(0)}</span>
                    </div>
                    <div className="ml-3">
                      <Link href={`/profile/${order.sellerId}`} className="text-sm font-medium text-gray-900 hover:text-purple-700">
                        {order.sellerName}
                      </Link>
                      <Link href={`/messages?recipient=${order.sellerId}`} className="block text-xs text-purple-600 hover:text-purple-800">
                        Contact Seller
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Deliverables</h4>
                  <ul className="mt-2 space-y-1">
                    {order.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Order Summary</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="text-gray-900 font-medium">{order.id}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date Placed:</span>
                    <span className="text-gray-900">{formatDate(order.createdAt)}</span>
                  </div>
                  
                  {order.status === 'Completed' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date Completed:</span>
                      <span className="text-gray-900">{formatDate(order.completedAt)}</span>
                    </div>
                  )}
                  
                  {order.status === 'Cancelled' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date Cancelled:</span>
                      <span className="text-gray-900">{formatDate(order.cancelledAt)}</span>
                    </div>
                  )}
                  
                  {order.status === 'In Progress' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="text-gray-900">{formatDate(order.dueDate)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revisions:</span>
                    <span className="text-gray-900">{order.revisions}</span>
                  </div>
                  
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center text-base">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">${order.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {order.status === 'In Progress' && (
                    <div className="pt-4">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-xs font-semibold inline-block text-purple-600">
                              Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-purple-600">
                              {order.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div 
                            style={{ width: `${order.progress}%` }} 
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              order.progress < 50 ? 'bg-blue-500' : order.progress < 80 ? 'bg-purple-500' : 'bg-green-500'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 space-y-2">
                    {order.status === 'In Progress' && (
                      <>
                        <Link
                          href={`/messages?orderId=${order.id}`}
                          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Message Seller
                        </Link>
                        <button
                          onClick={() => alert(`Would cancel order ${order.id} in a real app`)}
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Cancel Order
                        </button>
                      </>
                    )}
                    
                    {order.status === 'Completed' && !order.hasReview && (
                      <Link
                        href={`/reviews/write?orderId=${order.id}`}
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Leave a Review
                      </Link>
                    )}
                    
                    {order.status === 'Completed' && order.hasReview && (
                      <Link
                        href={`/reviews/${order.reviewId}`}
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        View Your Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {order.additionalInfo && (
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Additional Information</h4>
              <p className="text-sm text-gray-700">{order.additionalInfo}</p>
            </div>
          )}
          
          {order.status === 'Cancelled' && order.cancelReason && (
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6 bg-red-50">
              <h4 className="text-sm font-medium text-red-800 uppercase tracking-wider mb-2">Cancellation Reason</h4>
              <p className="text-sm text-red-700">{order.cancelReason}</p>
            </div>
          )}
        </div>
        
        {/* Order Timeline */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order Timeline
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              History of your order from placement to completion
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {order.timeline.map((timelineItem, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== order.timeline.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getTimelineIconColor(timelineItem.event)}`}>
                            {timelineItem.event === 'Order Placed' && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            )}
                            {timelineItem.event === 'Order Accepted' && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {timelineItem.event === 'Requirements Confirmed' && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                              </svg>
                            )}
                            {(timelineItem.event === 'First Draft Delivered' || timelineItem.event === 'Initial Audit Completed' || timelineItem.event === 'Optimizations Applied') && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            )}
                            {timelineItem.event === 'Order Completed' && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {timelineItem.event === 'Review Submitted' && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            )}
                            {timelineItem.event === 'Order Cancelled' && (
                              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{timelineItem.event}</p>
                            <p className="mt-1 text-sm text-gray-500">{formatDateTime(timelineItem.date)}</p>
                          </div>
                          {timelineItem.description && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">
                                {timelineItem.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 