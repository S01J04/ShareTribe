'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [accountType, setAccountType] = useState('provider'); // 'client' or 'provider'
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock stats data
        const mockStats = {
          provider: {
            balance: 1250.75,
            activeOrders: 3,
            completedOrders: 28,
            totalEarnings: 4500,
            pendingReviews: 2,
            averageRating: 4.8,
            reviewCount: 25,
            profileViews: 124,
            responseRate: 98,
            recentIncome: [
              { date: '2023-11-01', amount: 150 },
              { date: '2023-11-08', amount: 300 },
              { date: '2023-11-15', amount: 200 },
              { date: '2023-11-22', amount: 450 },
              { date: '2023-11-29', amount: 150 },
            ]
          },
          client: {
            activeOrders: 2,
            completedOrders: 15,
            totalSpent: 3600,
            pendingReviews: 1,
            favoriteProviders: 5,
            savedServices: 8,
            recentSpending: [
              { date: '2023-11-01', amount: 100 },
              { date: '2023-11-08', amount: 250 },
              { date: '2023-11-15', amount: 150 },
              { date: '2023-11-22', amount: 350 },
              { date: '2023-11-29', amount: 200 },
            ]
          }
        };
        
        // Mock recent activity data
        const mockActivity = [
          {
            id: 'act-123',
            type: 'order_progress',
            content: 'Your order "Full Website Development" is 40% complete',
            timestamp: '2023-12-05T14:30:00.000Z',
            orderId: 'order-123',
            link: '/orders/order-123'
          },
          {
            id: 'act-122',
            type: 'message',
            content: 'You received a new message from Alex Johnson',
            timestamp: '2023-12-04T11:15:00.000Z',
            senderId: 'user-456',
            link: '/messages?recipient=user-456'
          },
          {
            id: 'act-121',
            type: 'review',
            content: 'James Wilson left you a 5-star review',
            timestamp: '2023-12-03T16:45:00.000Z',
            reviewId: 'rev-789',
            link: '/reviews/rev-789'
          },
          {
            id: 'act-120',
            type: 'order_completed',
            content: 'Your order "SEO Optimization" was completed',
            timestamp: '2023-12-02T09:20:00.000Z',
            orderId: 'order-120',
            link: '/orders/order-120'
          },
          {
            id: 'act-119',
            type: 'payment',
            content: 'You received a payment of $450 for "Logo Design Package"',
            timestamp: '2023-12-01T13:10:00.000Z',
            orderId: 'order-124',
            link: '/orders/order-124'
          }
        ];
        
        setStats(mockStats);
        setRecentActivity(mockActivity);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'order_progress':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case 'message':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        );
      case 'order_completed':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  const toggleAccountType = () => {
    setAccountType(accountType === 'provider' ? 'client' : 'provider');
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
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your account.</p>
          </div>
          
          {/* Toggle button for demo purposes */}
          <button 
            onClick={toggleAccountType}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Switch to {accountType === 'provider' ? 'Client' : 'Provider'} View
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accountType === 'provider' ? (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Available Balance</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{formatCurrency(stats.provider.balance)}</span>
                </div>
                <Link href="/payments" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">Withdraw funds</Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Active Orders</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stats.provider.activeOrders}</span>
                </div>
                <Link href="/orders" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">View orders</Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Rating</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stats.provider.averageRating}</span>
                  <span className="ml-1 text-sm text-gray-600">({stats.provider.reviewCount} reviews)</span>
                </div>
                <Link href="/reviews" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">View reviews</Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Profile Views</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stats.provider.profileViews}</span>
                  <span className="ml-2 text-sm text-green-600">↑ 12%</span>
                </div>
                <Link href="/profile" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">Edit profile</Link>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Active Orders</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stats.client.activeOrders}</span>
                </div>
                <Link href="/orders" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">View orders</Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Spent</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{formatCurrency(stats.client.totalSpent)}</span>
                </div>
                <Link href="/payments/history" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">View payment history</Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Saved Services</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stats.client.savedServices}</span>
                </div>
                <Link href="/saved" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">View saved items</Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Favorite Providers</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stats.client.favoriteProviders}</span>
                </div>
                <Link href="/favorites" className="text-sm text-purple-600 hover:text-purple-800 mt-2 inline-block">View favorites</Link>
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="px-6 py-4">
                      <div className="flex items-start space-x-4">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800">{activity.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                        </div>
                        <Link
                          href={activity.link}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-center">
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
              {recentActivity.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 text-center">
                  <Link
                    href="/notifications"
                    className="text-sm font-medium text-purple-600 hover:text-purple-800"
                  >
                    View all activity
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-6">
                {accountType === 'provider' ? (
                  <>
                    <Link
                      href="/services/new"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create New Service
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Update Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Manage Orders
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/search/advanced"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Services
                    </Link>
                    <Link
                      href="/orders"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Manage Orders
                    </Link>
                    <Link
                      href="/messages"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Messages
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Additional Widget: Earnings/Spending Chart */}
            <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {accountType === 'provider' ? 'Recent Earnings' : 'Recent Spending'}
                </h2>
              </div>
              <div className="p-6">
                <div className="h-48 bg-white">
                  <div className="h-full flex items-end">
                    {accountType === 'provider' 
                      ? stats.provider.recentIncome.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-purple-500 rounded-t" 
                            style={{ height: `${(item.amount / 500) * 100}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">{formatDate(item.date)}</span>
                        </div>
                      ))
                      : stats.client.recentSpending.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-500 rounded-t" 
                            style={{ height: `${(item.amount / 400) * 100}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">{formatDate(item.date)}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <Link
                    href={accountType === 'provider' ? '/earnings' : '/spending'}
                    className="text-sm font-medium text-purple-600 hover:text-purple-800"
                  >
                    View detailed report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 