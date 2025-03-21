'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [currentTab, setCurrentTab] = useState('description');
  
  useEffect(() => {
    fetchServiceDetails(params.id);
  }, [params.id]);
  
  const fetchServiceDetails = async (id) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock service data
      const mockService = {
        id: id,
        title: 'Professional Website Development with React, Next.js and Tailwind CSS',
        category: 'development',
        subcategory: 'web development',
        seller: {
          id: 'seller-1',
          name: 'John Smith',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
          level: 'Top Rated Plus',
          rating: 4.9,
          reviewCount: 243,
          responseTime: '1 hour',
          lastDelivery: '1 day ago',
          memberSince: 'Jun 2018',
          location: 'United States',
        },
        images: [
          'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        ],
        description: `
          <p>I will create a professional, modern, and responsive website using React, Next.js, and Tailwind CSS. My services include:</p>
          <ul>
            <li>Custom design based on your requirements</li>
            <li>Fully responsive layout that works on all devices</li>
            <li>SEO optimization</li>
            <li>Integration with APIs and third-party services</li>
            <li>Performance optimization</li>
            <li>Browser compatibility testing</li>
          </ul>
          <p>With over 5 years of experience in web development, I've helped businesses of all sizes establish their online presence with high-quality websites that look great and perform even better.</p>
        `,
        packages: {
          basic: {
            name: 'Basic',
            description: 'Simple landing page with up to 3 sections',
            price: 300,
            deliveryTime: '7 days',
            revisions: 2,
            features: [
              '1 page',
              'Responsive design',
              'Source code',
              'Content upload'
            ]
          },
          standard: {
            name: 'Standard',
            description: 'Multi-page website with up to 5 pages',
            price: 600,
            deliveryTime: '10 days',
            revisions: 3,
            features: [
              'Up to 5 pages',
              'Responsive design',
              'Source code',
              'Content upload',
              'Contact form',
              'Basic SEO'
            ]
          },
          premium: {
            name: 'Premium',
            description: 'Complete website with CMS integration',
            price: 1200,
            deliveryTime: '21 days',
            revisions: 'Unlimited',
            features: [
              'Up to 10 pages',
              'Responsive design',
              'Source code',
              'Content upload',
              'Contact form',
              'Advanced SEO',
              'CMS integration',
              'E-commerce functionality',
              '3 months support'
            ]
          }
        },
        faqs: [
          {
            question: 'Do you provide the source code?',
            answer: 'Yes, all packages include full source code of your website which you own completely after delivery.'
          },
          {
            question: 'Can I request modifications after the project is delivered?',
            answer: 'Yes, I offer revisions based on your package. Additional revisions beyond the included amount can be purchased.'
          },
          {
            question: 'Do you provide hosting services?',
            answer: 'I can help set up hosting, but hosting costs are not included in the packages. I recommend services like Vercel, Netlify, or AWS depending on your needs.'
          },
          {
            question: 'How do we communicate during the project?',
            answer: 'We can communicate via the platform messaging system, email, or schedule calls if needed for complex requirements.'
          },
          {
            question: 'Can you integrate payment gateways?',
            answer: 'Yes, I can integrate payment gateways like Stripe, PayPal, or others depending on your requirements. This is included in the Premium package.'
          }
        ],
        reviews: [
          {
            id: 'review-1',
            user: 'Sarah Johnson',
            rating: 5,
            date: '2 weeks ago',
            content: 'Working with John was an absolute pleasure. He delivered a stunning website that exceeded our expectations, and was always responsive to our feedback. Highly recommended!'
          },
          {
            id: 'review-2',
            user: 'Michael Brown',
            rating: 5,
            date: '1 month ago',
            content: 'Incredible work! The website looks amazing and works flawlessly across all devices. John was professional, communicated clearly throughout the process, and delivered on time.'
          },
          {
            id: 'review-3',
            user: 'Emily Wilson',
            rating: 4,
            date: '2 months ago',
            content: 'Great experience overall. John created a beautiful website for my business and was patient with my revision requests. The only reason for 4 stars instead of 5 is that we had a slight delay in the timeline.'
          }
        ]
      };
      
      setService(mockService);
      setError(null);
    } catch (error) {
      console.error('Error fetching service details:', error);
      setError('Failed to load service details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePackageSelect = (packageKey) => {
    setSelectedPackage(packageKey);
  };
  
  const handleContactSeller = () => {
    // In a real implementation, this would open a chat or message dialog
    alert('Contact seller functionality would be implemented here');
  };
  
  const handlePurchase = () => {
    // In a real implementation, this would navigate to the checkout or create an order
    alert(`Purchase ${selectedPackage} package functionality would be implemented here`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
        <svg className="h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
        <p className="text-gray-600 text-center mb-6">{error}</p>
        <button 
          onClick={() => router.push('/search')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Return to Search
        </button>
      </div>
    );
  }
  
  if (!service) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/search" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search results
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Service images and description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative h-96 w-full">
                <img 
                  src={service.images[0]} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={service.seller.avatar} 
                      alt={service.seller.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{service.seller.name}</div>
                    <div className="text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span>{service.seller.rating}</span>
                        <span className="mx-1">·</span>
                        <span>{service.seller.reviewCount} reviews</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-6 overflow-x-auto space-x-3 pb-2">
                  {service.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="h-24 w-36 flex-shrink-0 rounded-md overflow-hidden border border-gray-200"
                    >
                      <img 
                        src={image} 
                        alt={`${service.title} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setCurrentTab('description')}
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        currentTab === 'description'
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setCurrentTab('faq')}
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        currentTab === 'faq'
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      FAQ
                    </button>
                    <button
                      onClick={() => setCurrentTab('reviews')}
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        currentTab === 'reviews'
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Reviews
                    </button>
                  </nav>
                </div>
                
                {currentTab === 'description' && (
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: service.description }} />
                )}
                
                {currentTab === 'faq' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    
                    {service.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {currentTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-medium">{service.seller.rating}</span>
                        <span className="mx-1 text-gray-500">·</span>
                        <span className="text-gray-500">{service.seller.reviewCount} reviews</span>
                      </div>
                    </div>
                    
                    {service.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium text-gray-900">{review.user}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    ))}
                    
                    <button className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      See more reviews
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column: Pricing packages */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Service Packages</h2>
                
                <div className="flex space-x-1 mb-6">
                  {Object.keys(service.packages).map((key) => (
                    <button
                      key={key}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                        selectedPackage === key
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handlePackageSelect(key)}
                    >
                      {service.packages[key].name}
                    </button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{service.packages[selectedPackage].name}</span>
                    <span className="text-gray-900 font-bold">${service.packages[selectedPackage].price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{service.packages[selectedPackage].description}</p>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Delivery Time</span>
                    <span className="text-gray-900 font-medium">{service.packages[selectedPackage].deliveryTime}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revisions</span>
                    <span className="text-gray-900 font-medium">{service.packages[selectedPackage].revisions}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {service.packages[selectedPackage].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={handlePurchase}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-3"
                >
                  Purchase Now
                </button>
                
                <button
                  onClick={handleContactSeller}
                  className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Contact Seller
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">About the Seller</h3>
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={service.seller.avatar} 
                      alt={service.seller.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{service.seller.name}</div>
                    <div className="text-sm text-purple-600">{service.seller.level}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-medium text-gray-900">{service.seller.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Member since</div>
                    <div className="font-medium text-gray-900">{service.seller.memberSince}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Avg. response time</div>
                    <div className="font-medium text-gray-900">{service.seller.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last delivery</div>
                    <div className="font-medium text-gray-900">{service.seller.lastDelivery}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 