'use client';

import { useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ProfileDetail({ profileData }) {
  const [value, onChange] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  
  // Demo profile data - would be replaced with actual data from the database
  const demoProfile = {
    id: '1',
    name: 'John Doe',
    title: 'Full Stack Developer',
    avatar: '/avatars/placeholder.jpg',
    bio: 'Experienced full stack developer with over 10 years of experience building web and mobile applications. Specialized in JavaScript, React, and Node.js.',
    rating: 4.8,
    reviews: 56,
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'GraphQL', 'AWS', 'Docker'],
    hourlyRate: '$45/hr',
    availability: 'Available next week',
    location: 'New York, USA',
    travelDistance: '25 miles',
    contactInfo: {
      email: 'available to premium members',
      phone: 'available to premium members',
    },
    workingHours: '9 AM - 5 PM EST',
    completedJobs: 89,
    memberSince: 'January 2020',
    references: [
      {
        id: '1',
        name: 'Jane Smith',
        company: 'Tech Solutions Inc.',
        avatar: '/avatars/placeholder-2.jpg',
        comment: 'John delivered exceptional quality work for our e-commerce project.',
        rating: 5
      },
      {
        id: '2',
        name: 'Michael Johnson',
        company: 'Digital Marketing Agency',
        avatar: '/avatars/placeholder-3.jpg',
        comment: 'Very professional and delivered on time. Would work with again.',
        rating: 4
      },
    ],
    certificates: [
      { name: 'AWS Certified Developer', year: 2022 },
      { name: 'MongoDB Professional', year: 2021 },
    ]
  };
  
  // Use props or demo data
  const profile = profileData || demoProfile;
  
  // Fake available dates for the calendar (would be fetched from an API in production)
  const getAvailableDates = () => {
    const today = new Date();
    const availableDates = [];
    for (let i = 1; i <= 30; i++) {
      if (i % 3 !== 0) { // Every 3rd day is unavailable
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        availableDates.push(date);
      }
    }
    return availableDates;
  };
  
  const availableDates = getAvailableDates();
  
  // Function to check if a date is in availableDates
  const isDateAvailable = (date) => {
    return availableDates.some(availableDate => 
      availableDate.getDate() === date.getDate() && 
      availableDate.getMonth() === date.getMonth() && 
      availableDate.getFullYear() === date.getFullYear()
    );
  };
  
  // Custom tile content for the calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      return isDateAvailable(date) ? (
        <div className="h-2 w-2 bg-green-500 rounded-full mx-auto mt-1"></div>
      ) : (
        <div className="h-2 w-2 bg-red-500 rounded-full mx-auto mt-1"></div>
      );
    }
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-16 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white bg-opacity-20 shadow-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
              {/* Placeholder - would be an actual Image component in production */}
              <div className="text-white text-5xl font-bold">
                {profile.name.charAt(0)}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <div className="mt-2 sm:mt-0 flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <span className="text-yellow-300 mr-1">★</span>
                  <span className="text-white">{profile.rating} ({profile.reviews} reviews)</span>
                </div>
              </div>
              
              <p className="text-xl text-white text-opacity-90 mb-4">{profile.title}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
                  <span className="mr-1">📍</span> {profile.location}
                </div>
                <div className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
                  <span className="mr-1">💰</span> {profile.hourlyRate}
                </div>
                <div className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
                  <span className="mr-1">🚗</span> {profile.travelDistance} travel distance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'border-b-2 border-indigo-600 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'calendar' 
                  ? 'border-b-2 border-indigo-600 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Availability
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'references' 
                  ? 'border-b-2 border-indigo-600 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              References
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'certificates' 
                  ? 'border-b-2 border-indigo-600 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Skills & Certificates
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="max-w-4xl mx-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{profile.bio}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Profile Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-40 text-gray-500">Member Since</div>
                    <div className="flex-1 font-medium">{profile.memberSince}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-40 text-gray-500">Completed Jobs</div>
                    <div className="flex-1 font-medium">{profile.completedJobs}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-40 text-gray-500">Working Hours</div>
                    <div className="flex-1 font-medium">{profile.workingHours}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-20 text-gray-500">Email</div>
                    <div className="flex-1 font-medium">{profile.contactInfo.email}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-20 text-gray-500">Phone</div>
                    <div className="flex-1 font-medium">{profile.contactInfo.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'calendar' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Availability Calendar</h2>
            <p className="text-gray-600 mb-4">Green dots indicate available dates. Click on a date to request a booking.</p>
            <div className="max-w-md mx-auto">
              <Calendar 
                onChange={onChange} 
                value={value} 
                tileContent={tileContent}
                className="border-0 shadow-md"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'references' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Client References</h2>
            <div className="space-y-4">
              {profile.references.map(reference => (
                <div key={reference.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-gray-500 text-lg font-semibold">{reference.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{reference.name}</h3>
                          <p className="text-gray-500 text-sm">{reference.company}</p>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-lg ${i < reference.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{reference.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h2>
              {profile.certificates.length > 0 ? (
                <div className="space-y-2">
                  {profile.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2 text-indigo-600">🏆</span>
                      <span className="font-medium">{cert.name}</span>
                      <span className="text-gray-500 ml-2">({cert.year})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No certificates added yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 p-6 border-t">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-600">Need help with your project?</p>
            <p className="text-gray-800 font-medium">Contact {profile.name} today!</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-colors">
              Send Message
            </button>
            <button className="bg-white hover:bg-gray-100 text-indigo-600 font-medium px-5 py-2 rounded-lg border border-indigo-600 transition-colors">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 