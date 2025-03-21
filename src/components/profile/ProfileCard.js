'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfileCard({ profile }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // This would be provided from the parent component in a real scenario
  const demoProfile = {
    id: '1',
    name: 'John Doe',
    title: 'Full Stack Developer',
    avatar: '/avatars/placeholder.jpg',
    rating: 4.8,
    reviews: 56,
    skills: ['JavaScript', 'React', 'Node.js'],
    hourlyRate: '$45/hr',
    availability: 'Available next week',
    location: 'New York, USA',
    travelDistance: '25 miles'
  };

  // Use passed profile or demo profile
  const userProfile = profile || demoProfile;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform translate-y-[-5px]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <div className="rounded-full overflow-hidden w-full h-full bg-gray-200">
              {/* Placeholder for image - replace with actual avatar in production */}
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-semibold">
                {userProfile.name.charAt(0)}
              </div>
            </div>
            
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              userProfile.availability.includes('Available') ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">{userProfile.name}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm text-gray-600">{userProfile.rating} ({userProfile.reviews})</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{userProfile.title}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {userProfile.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-500">
            <span className="mr-1">💰</span>
            <span>{userProfile.hourlyRate}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <span className="mr-1">📍</span>
            <span>{userProfile.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <span className="mr-1">📅</span>
            <span>{userProfile.availability}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <span className="mr-1">🚗</span>
            <span>{userProfile.travelDistance}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 flex justify-between">
        <Link
          href={`/profile/${userProfile.id}`}
          className="text-indigo-600 text-sm hover:text-indigo-800 font-medium"
        >
          View Profile
        </Link>
        <Link
          href={`/messages/new?recipient=${userProfile.id}`}
          className="text-indigo-600 text-sm hover:text-indigo-800 font-medium"
        >
          Contact
        </Link>
      </div>
    </div>
  );
} 