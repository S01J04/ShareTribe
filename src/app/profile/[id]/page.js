'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('services');
  
  useEffect(() => {
    fetchProfileData(params.id);
  }, [params.id]);
  
  const fetchProfileData = async (id) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock profile data
      const mockProfile = {
        id: id,
        name: 'John Smith',
        title: 'Full Stack Developer & UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        coverImage: 'https://images.unsplash.com/photo-1557682250-0b875eb9287d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
        location: 'San Francisco, CA',
        memberSince: 'June 2018',
        lastActive: '2 hours ago',
        languages: ['English (Native)', 'Spanish (Fluent)', 'French (Basic)'],
        skills: [
          'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 
          'PostgreSQL', 'GraphQL', 'REST API', 'UI/UX Design', 'Figma', 
          'Tailwind CSS', 'Responsive Design', 'AWS', 'Firebase'
        ],
        about: `I'm a full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Next.js, and Node.js, with a strong focus on creating intuitive user interfaces and responsive designs.

My approach combines technical expertise with creative problem-solving to deliver high-quality solutions that meet client needs. I'm particularly passionate about creating seamless user experiences and optimizing application performance.

I've worked with clients ranging from startups to established companies across various industries including e-commerce, finance, healthcare, and education.`,
        education: [
          {
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science in Computer Science',
            years: '2014 - 2018'
          }
        ],
        workHistory: [
          {
            company: 'TechInnovate Solutions',
            position: 'Senior Full Stack Developer',
            years: '2020 - Present',
            description: 'Lead developer for client projects, responsible for architecture decisions and implementing core features. Mentored junior developers and ensured code quality through code reviews and best practices implementation.'
          },
          {
            company: 'WebWorks Digital',
            position: 'Front-end Developer',
            years: '2018 - 2020',
            description: 'Developed responsive web applications using React and collaborated with designers and back-end developers to implement user interfaces and integrate with APIs.'
          }
        ],
        stats: {
          completedProjects: 132,
          onTimeDelivery: 98,
          onBudget: 100,
          repeatClients: 85,
          rating: 4.9,
          totalReviews: 97
        },
        services: [
          {
            id: 'service-1',
            title: 'Professional Website Development with React, Next.js and Tailwind CSS',
            description: 'I will create a modern, responsive website with the latest technologies to ensure fast performance and great user experience.',
            image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: 600,
            rating: 4.9,
            reviewCount: 43
          },
          {
            id: 'service-2',
            title: 'Custom Web Application Development',
            description: 'I will develop a tailored web application to meet your specific business needs with secure authentication and data management.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: 1500,
            rating: 5.0,
            reviewCount: 21
          },
          {
            id: 'service-3',
            title: 'UI/UX Design for Web and Mobile Applications',
            description: 'I will create intuitive, user-friendly designs for your application with a focus on usability, accessibility, and modern aesthetics.',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: 800,
            rating: 4.8,
            reviewCount: 33
          }
        ],
        reviews: [
          {
            id: 'review-1',
            clientName: 'Sarah Johnson',
            clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            rating: 5,
            date: '2 weeks ago',
            serviceTitle: 'Professional Website Development',
            content: 'John delivered exceptional work on our company website. He was communicative throughout the entire process, incorporated all of our feedback, and delivered ahead of schedule. The site looks great, performs well, and has already helped increase our conversions. Highly recommended!'
          },
          {
            id: 'review-2',
            clientName: 'Michael Brown',
            clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            rating: 5,
            date: '1 month ago',
            serviceTitle: 'Custom Web Application Development',
            content: 'Working with John was a fantastic experience. He took our complex requirements and created an elegant, user-friendly application that exceeded our expectations. His technical knowledge is impressive, and he was able to suggest several improvements to our initial concept. Great communication and professionalism throughout.'
          },
          {
            id: 'review-3',
            clientName: 'Emily Wilson',
            clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
            rating: 4,
            date: '2 months ago',
            serviceTitle: 'UI/UX Design for Web and Mobile Applications',
            content: 'John created beautiful designs for our mobile app. He has a great eye for detail and created an intuitive interface that our users love. The only reason for 4 stars instead of 5 is that we had a slight delay in the project timeline, though this was partly due to changes in our requirements. Would definitely work with him again.'
          }
        ]
      };
      
      setProfile(mockProfile);
      setError(null);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleContactClick = () => {
    // In a real implementation, this would open a message dialog
    alert('Contact functionality would be implemented here');
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
  
  if (!profile) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Cover Image */}
      <div className="relative h-64 w-full bg-gradient-to-r from-purple-600 to-indigo-600">
        {profile.coverImage && (
          <Image 
            src={profile.coverImage} 
            alt="Cover" 
            className="h-full w-full object-cover opacity-40"
            width={1920}
            height={384}
          />
        )}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 sm:-mt-32 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="sm:flex items-start">
              <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                <div className="relative">
                  <div className="h-32 w-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow">
                    <Image 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="h-full w-full object-cover"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
                    <p className="text-gray-600 mb-2">{profile.title}</p>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-400 mr-2">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium text-gray-900 ml-1">{profile.stats.rating}</span>
                        <span className="text-gray-500 ml-1">({profile.stats.totalReviews} reviews)</span>
                      </div>
                      <div className="text-gray-500 flex items-center">
                        <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={handleContactClick}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Contact Me
                    </button>
                    <Link
                      href={`/messages/new?recipientId=${profile.id}`}
                      className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-center"
                    >
                      Message
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{profile.stats.completedProjects}</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{profile.stats.onTimeDelivery}%</div>
                    <div className="text-sm text-gray-600">On-Time Delivery</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{profile.stats.onBudget}%</div>
                    <div className="text-sm text-gray-600">On-Budget</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{profile.stats.repeatClients}%</div>
                    <div className="text-sm text-gray-600">Repeat Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About, Skills, etc. */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">About</h2>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  {profile.about.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Skills</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Languages</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {profile.languages.map((language, index) => (
                    <li key={index} className="text-gray-700">{language}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Education</h2>
              </div>
              <div className="p-6">
                {profile.education.map((edu, index) => (
                  <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}>
                    <div className="font-medium text-gray-900">{edu.institution}</div>
                    <div className="text-gray-700">{edu.degree}</div>
                    <div className="text-sm text-gray-500 mt-1">{edu.years}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Work History</h2>
              </div>
              <div className="p-6">
                {profile.workHistory.map((work, index) => (
                  <div key={index} className={index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}>
                    <div className="font-medium text-gray-900">{work.position}</div>
                    <div className="text-purple-600">{work.company}</div>
                    <div className="text-sm text-gray-500 mt-1 mb-2">{work.years}</div>
                    <p className="text-gray-700">{work.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column: Services & Reviews Tabs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'services'
                        ? 'border-b-2 border-purple-500 text-purple-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-purple-500 text-purple-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Reviews ({profile.stats.totalReviews})
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">My Services</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.services.map((service) => (
                        <Link 
                          key={service.id} 
                          href={`/services/${service.id}`}
                          className="block group"
                        >
                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="h-48 bg-gray-200 relative">
                              <Image 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-full object-cover"
                                width={500}
                                height={250}
                              />
                              <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow">
                                ${service.price}
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-purple-600 line-clamp-2">
                                {service.title}
                              </h3>
                              
                              <div className="flex items-center mb-2">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span className="text-sm text-gray-700">{service.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({service.reviewCount})</span>
                              </div>
                              
                              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Client Reviews</h2>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-medium">{profile.stats.rating}</span>
                        <span className="mx-1 text-gray-500">·</span>
                        <span className="text-gray-500">{profile.stats.totalReviews} reviews</span>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      {profile.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                <Image 
                                  src={review.clientAvatar} 
                                  alt={review.clientName} 
                                  className="h-full w-full object-cover"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{review.clientName}</div>
                                <div className="text-sm text-gray-500">{review.serviceTitle}</div>
                              </div>
                            </div>
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
                    </div>
                    
                    <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      Load more reviews
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 