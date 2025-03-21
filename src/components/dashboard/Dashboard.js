'use client';

import { useState } from 'react';
import ProfileCard from '@/components/profile/ProfileCard';
import Link from 'next/link';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('recommended');
  
  // Demo data for profiles - would be fetched from API in production
  const demoProfiles = [
    {
      id: '1',
      name: 'John Doe',
      title: 'Full Stack Developer',
      avatar: '/avatars/placeholder.jpg',
      rating: 4.8,
      reviews: 56,
      skills: ['JavaScript', 'React', 'Node.js'],
      hourlyRate: '$45/hr',
      availability: 'Available now',
      location: 'New York, USA',
      travelDistance: '25 miles',
      category: 'development'
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'UX/UI Designer',
      avatar: '/avatars/placeholder-2.jpg',
      rating: 4.7,
      reviews: 42,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      hourlyRate: '$50/hr',
      availability: 'Available next week',
      location: 'San Francisco, USA',
      travelDistance: '15 miles',
      category: 'design'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      title: 'DevOps Engineer',
      avatar: '/avatars/placeholder-3.jpg',
      rating: 4.9,
      reviews: 38,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      hourlyRate: '$55/hr',
      availability: 'Available in 3 days',
      location: 'Austin, USA',
      travelDistance: '20 miles',
      category: 'development'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      title: 'Content Writer',
      avatar: '/avatars/placeholder-4.jpg',
      rating: 4.6,
      reviews: 29,
      skills: ['Copywriting', 'SEO', 'Blogging'],
      hourlyRate: '$35/hr',
      availability: 'Available now',
      location: 'Chicago, USA',
      travelDistance: '10 miles',
      category: 'writing'
    },
    {
      id: '5',
      name: 'Michael Brown',
      title: 'Digital Marketer',
      avatar: '/avatars/placeholder-5.jpg',
      rating: 4.5,
      reviews: 31,
      skills: ['SEO', 'PPC', 'Social Media'],
      hourlyRate: '$40/hr',
      availability: 'Available next week',
      location: 'Miami, USA',
      travelDistance: '30 miles',
      category: 'marketing'
    },
    {
      id: '6',
      name: 'Jessica Davis',
      title: 'Electrical Engineer',
      avatar: '/avatars/placeholder-6.jpg', 
      rating: 4.9,
      reviews: 45,
      skills: ['Electrical Design', 'AutoCAD', 'PLC'],
      hourlyRate: '$60/hr',
      availability: 'Available in 2 days',
      location: 'Detroit, USA',
      travelDistance: '35 miles',
      category: 'construction'
    },
    {
      id: '7',
      name: 'David Miller',
      title: 'Plumber',
      avatar: '/avatars/placeholder-7.jpg',
      rating: 4.7,
      reviews: 52,
      skills: ['Plumbing', 'Repair', 'Installation'],
      hourlyRate: '$45/hr',
      availability: 'Available now',
      location: 'Denver, USA',
      travelDistance: '20 miles',
      category: 'maintenance'
    },
    {
      id: '8',
      name: 'Emily Taylor',
      title: 'HVAC Technician',
      avatar: '/avatars/placeholder-8.jpg',
      rating: 4.8,
      reviews: 37,
      skills: ['HVAC', 'Installation', 'Maintenance'],
      hourlyRate: '$50/hr',
      availability: 'Available next week',
      location: 'Phoenix, USA',
      travelDistance: '25 miles',
      category: 'maintenance'
    }
  ];
  
  // Filter profiles based on selectedCategory
  const filteredProfiles = selectedCategory === 'all' 
    ? demoProfiles 
    : demoProfiles.filter(profile => profile.category === selectedCategory);
  
  // Sort profiles based on sortOrder
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortOrder === 'rating') {
      return b.rating - a.rating;
    } else if (sortOrder === 'reviews') {
      return b.reviews - a.reviews;
    } else if (sortOrder === 'price_low') {
      return parseInt(a.hourlyRate.replace(/\D/g, '')) - parseInt(b.hourlyRate.replace(/\D/g, ''));
    } else if (sortOrder === 'price_high') {
      return parseInt(b.hourlyRate.replace(/\D/g, '')) - parseInt(a.hourlyRate.replace(/\D/g, ''));
    }
    // Default 'recommended' sorting combines rating and number of reviews
    return (b.rating * b.reviews) - (a.rating * a.reviews);
  });
  
  // Categories for the filter
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'writing', name: 'Writing' },
    { id: 'construction', name: 'Construction' },
    { id: 'maintenance', name: 'Maintenance' }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Professionals</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse through our marketplace of skilled professionals. Connect with experts that match your needs and budget.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sortOrder" className="mr-2 text-sm text-gray-600">Sort by:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="price_low">Lowest Price</option>
                <option value="price_high">Highest Price</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Advanced search link */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/search/advanced"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
          >
            <span>Advanced Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Results grid */}
        {sortedProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-500">Try changing your filters or search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-indigo-600 text-sm font-medium text-white">
              1
            </a>
            <a href="#" className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
} 