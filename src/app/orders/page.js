'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({
    active: [],
    completed: [],
    cancelled: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock orders data - in a real app this would come from your API
        const mockOrders = {
          active: [
            {
              id: 'order-123',
              serviceId: 'srvc-789',
              serviceName: 'Full Website Development',
              sellerId: 'user-456',
              sellerName: 'Alex Johnson',
              sellerAvatar: '/images/users/alex.jpg',
              price: 1200,
              status: 'In Progress',
              dueDate: '2023-12-15T00:00:00.000Z',
              createdAt: '2023-11-20T00:00:00.000Z',
              progress: 40,
              messages: 3
            },
            {
              id: 'order-124',
              serviceId: 'srvc-790',
              serviceName: 'Logo Design Package',
              sellerId: 'user-457',
              sellerName: 'Sophia Lee',
              sellerAvatar: '/images/users/sophia.jpg',
              price: 300,
              status: 'Awaiting Delivery',
              dueDate: '2023-12-05T00:00:00.000Z',
              createdAt: '2023-11-25T00:00:00.000Z',
              progress: 85,
              messages: 5
            }
          ],
          completed: [
            {
              id: 'order-120',
              serviceId: 'srvc-780',
              serviceName: 'SEO Optimization',
              sellerId: 'user-450',
              sellerName: 'James Wilson',
              sellerAvatar: '/images/users/james.jpg',
              price: 450,
              status: 'Completed',
              dueDate: '2023-11-10T00:00:00.000Z',
              createdAt: '2023-10-25T00:00:00.000Z',
              completedAt: '2023-11-08T00:00:00.000Z',
              hasReview: true,
              reviewId: 'rev-123'
            },
            {
              id: 'order-121',
              serviceId: 'srvc-781',
              serviceName: 'Mobile App UI Design',
              sellerId: 'user-451',
              sellerName: 'Emma Garcia',
              sellerAvatar: '/images/users/emma.jpg',
              price: 750,
              status: 'Completed',
              dueDate: '2023-11-01T00:00:00.000Z',
              createdAt: '2023-10-15T00:00:00.000Z',
              completedAt: '2023-10-29T00:00:00.000Z',
              hasReview: false
            }
          ],
          cancelled: [
            {
              id: 'order-115',
              serviceId: 'srvc-775',
              serviceName: 'Content Writing',
              sellerId: 'user-445',
              sellerName: 'David Brown',
              sellerAvatar: '/images/users/david.jpg',
              price: 150,
              status: 'Cancelled',
              dueDate: '2023-10-20T00:00:00.000Z',
              createdAt: '2023-10-05T00:00:00.000Z',
              cancelledAt: '2023-10-10T00:00:00.000Z',
              cancelReason: 'Changed requirements'
            }
          ]
        };
        
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Overdue';
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return '1 day left';
    } else {
      return `${diffDays} days left`;
    }
  };
  
  const filterOrders = (tab) => {
    if (!searchQuery.trim()) {
      return orders[tab];
    }
    
    const query = searchQuery.toLowerCase();
    return orders[tab].filter(order => 
      order.serviceName.toLowerCase().includes(query) ||
      order.sellerName.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query)
    );
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Orders</h1>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full sm:w-64 rounded-full border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm py-2 pl-10 pr-4"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('active')}
                className={`whitespace-nowrap py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active
                <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                  {orders.active.length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('completed')}
                className={`whitespace-nowrap py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed
                <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                  {orders.completed.length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`whitespace-nowrap py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'cancelled'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cancelled
                <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                  {orders.cancelled.length}
                </span>
              </button>
            </nav>
          </div>
          
          {/* Orders List */}
          <div>
            {filterOrders(activeTab).length === 0 ? (
              <div className="text-center py-12">
                {searchQuery ? (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No matching orders</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search.</p>
                  </>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'active' ? 'When you purchase services, your active orders will appear here.' : 
                       activeTab === 'completed' ? 'Your completed orders will appear here.' : 
                       'Your cancelled orders will appear here.'}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab === 'active' ? 'Due Date' : 'Completed On'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filterOrders(activeTab).map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                              <span className="text-sm font-medium text-gray-600">{order.sellerName.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                <Link href={`/services/${order.serviceId}`} className="hover:text-purple-700">
                                  {order.serviceName}
                                </Link>
                              </div>
                              <div className="text-sm text-gray-500">
                                by{' '}
                                <Link href={`/profile/${order.sellerId}`} className="text-purple-700 hover:text-purple-800">
                                  {order.sellerName}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          {activeTab === 'active' && (
                            <div className="mt-2">
                              <div className="relative pt-1">
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                  <div 
                                    style={{ width: `${order.progress}%` }} 
                                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                      order.progress < 50 ? 'bg-blue-500' : order.progress < 80 ? 'bg-purple-500' : 'bg-green-500'
                                    }`}
                                  ></div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{order.progress}% complete</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {activeTab === 'active' ? (
                            <div>
                              <div>{formatDate(order.dueDate)}</div>
                              <div className={`text-sm mt-1 font-medium ${
                                getTimeLeft(order.dueDate) === 'Overdue' ? 'text-red-600' : 
                                getTimeLeft(order.dueDate) === 'Due today' ? 'text-orange-600' : 'text-gray-600'
                              }`}>
                                {getTimeLeft(order.dueDate)}
                              </div>
                            </div>
                          ) : activeTab === 'completed' ? (
                            formatDate(order.completedAt)
                          ) : (
                            formatDate(order.cancelledAt)
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm font-bold text-gray-900">${order.price.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">USD</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {activeTab === 'active' ? (
                            <div className="space-y-2">
                              <Link
                                href={`/messages?orderId=${order.id}`}
                                className="text-purple-600 hover:text-purple-900 block"
                              >
                                {order.messages > 0 ? `Messages (${order.messages})` : 'Contact Seller'}
                              </Link>
                              <button
                                className="text-red-600 hover:text-red-900 block"
                                onClick={() => alert(`Would cancel order ${order.id} in a real app`)}
                              >
                                Cancel Order
                              </button>
                            </div>
                          ) : activeTab === 'completed' ? (
                            <div className="space-y-2">
                              {order.hasReview ? (
                                <Link
                                  href={`/reviews/${order.reviewId}`}
                                  className="text-purple-600 hover:text-purple-900 block"
                                >
                                  View Review
                                </Link>
                              ) : (
                                <Link
                                  href={`/reviews/write?orderId=${order.id}`}
                                  className="text-purple-600 hover:text-purple-900 block"
                                >
                                  Leave Review
                                </Link>
                              )}
                              <Link
                                href={`/orders/${order.id}`}
                                className="text-gray-600 hover:text-gray-900 block"
                              >
                                View Details
                              </Link>
                            </div>
                          ) : (
                            <Link
                              href={`/orders/${order.id}`}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              View Details
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 