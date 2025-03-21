'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('recommended');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleFilters, setVisibleFilters] = useState(false);
  
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'recommended';
    
    setSearchQuery(query);
    setSelectedCategory(category);
    setSortOrder(sort);
    
    fetchSearchResults(query, category, sort);
  }, [searchParams]);
  
  const fetchSearchResults = async (query, category, sort) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results
      const mockResults = [
        {
          id: 'service-1',
          title: 'Professional Website Development',
          category: 'development',
          price: 500,
          rating: 4.9,
          reviewCount: 124,
          sellerName: 'John Doe',
          sellerAvatar: '/images/users/john.jpg',
          image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '7 days'
        },
        {
          id: 'service-2',
          title: 'Creative Logo Design',
          category: 'design',
          price: 150,
          rating: 4.8,
          reviewCount: 89,
          sellerName: 'Sarah Johnson',
          sellerAvatar: '/images/users/sarah.jpg',
          image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '3 days'
        },
        {
          id: 'service-3',
          title: 'SEO Optimization Package',
          category: 'marketing',
          price: 300,
          rating: 4.7,
          reviewCount: 56,
          sellerName: 'Michael Brown',
          sellerAvatar: '/images/users/michael.jpg',
          image: 'https://images.unsplash.com/photo-1528900873419-1a37793456dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '10 days'
        },
        {
          id: 'service-4',
          title: 'Professional Content Writing',
          category: 'writing',
          price: 80,
          rating: 4.5,
          reviewCount: 42,
          sellerName: 'Emma Wilson',
          sellerAvatar: '/images/users/emma.jpg',
          image: 'https://images.unsplash.com/photo-1520971981242-aaefdf239aa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '2 days'
        },
        {
          id: 'service-5',
          title: 'Kitchen Remodeling',
          category: 'construction',
          price: 3000,
          rating: 4.9,
          reviewCount: 35,
          sellerName: 'Robert Garcia',
          sellerAvatar: '/images/users/robert.jpg',
          image: 'https://images.unsplash.com/photo-1556912172-45a7e95641ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '30 days'
        },
        {
          id: 'service-6',
          title: 'HVAC Maintenance and Repair',
          category: 'maintenance',
          price: 120,
          rating: 4.7,
          reviewCount: 52,
          sellerName: 'David Miller',
          sellerAvatar: '/images/users/david.jpg',
          image: 'https://images.unsplash.com/photo-1600566752355-9a79f2cd1049?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '1 day'
        },
        {
          id: 'service-7',
          title: 'Mobile App UI Design',
          category: 'design',
          price: 450,
          rating: 4.6,
          reviewCount: 38,
          sellerName: 'Jessica Lee',
          sellerAvatar: '/images/users/jessica.jpg',
          image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '5 days'
        },
        {
          id: 'service-8',
          title: 'Social Media Marketing Campaign',
          category: 'marketing',
          price: 250,
          rating: 4.5,
          reviewCount: 47,
          sellerName: 'Thomas Wright',
          sellerAvatar: '/images/users/thomas.jpg',
          image: 'https://images.unsplash.com/photo-1569017388730-020b5f80a004?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
          deliveryTime: '14 days'
        }
      ];
      
      // Filter by category if needed
      let filteredResults = mockResults;
      if (category !== 'all') {
        filteredResults = mockResults.filter(result => result.category === category);
      }
      
      // Filter by search query if provided
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        filteredResults = filteredResults.filter(result => 
          result.title.toLowerCase().includes(lowercaseQuery) || 
          result.sellerName.toLowerCase().includes(lowercaseQuery) || 
          result.category.toLowerCase().includes(lowercaseQuery)
        );
      }
      
      // Sort results
      switch (sort) {
        case 'price_low':
          filteredResults.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filteredResults.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredResults.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // In a real app, would sort by date
          filteredResults.sort((a, b) => b.id.localeCompare(a.id));
          break;
        default:
          // Default 'recommended' sort (uses rating * review count as a proxy for popularity)
          filteredResults.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
      }
      
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.push(`/search?${params.toString()}`);
  };
  
  const handleSortChange = (e) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/search?${params.toString()}`);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', searchQuery);
    router.push(`/search?${params.toString()}`);
  };
  
  const toggleFilters = () => {
    setVisibleFilters(!visibleFilters);
  };
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories', icon: '🔍' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'marketing', name: 'Marketing', icon: '📊' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'construction', name: 'Construction', icon: '🏗️' },
    { id: 'maintenance', name: 'Maintenance', icon: '🔧' }
  ];
  
  // Price ranges for filtering
  const priceRanges = [
    { id: 'any', name: 'Any price' },
    { id: 'under100', name: 'Under $100' },
    { id: '100to300', name: '$100 to $300' },
    { id: '300to500', name: '$300 to $500' },
    { id: 'over500', name: 'Over $500' }
  ];
  
  // Rating options for filtering
  const ratingOptions = [
    { value: 4.5, label: '4.5 & up' },
    { value: 4, label: '4.0 & up' },
    { value: 3.5, label: '3.5 & up' }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Browse all services'}
            </h1>
            
            <div className="w-full md:w-auto">
              <form onSubmit={handleSearchSubmit} className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm py-2 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-r-md px-4 py-2 text-sm font-medium"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="bg-white shadow w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 flex justify-between items-center"
          >
            <span>Filters</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`md:w-64 ${visibleFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Price</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`price-${range.id}`}
                        name="price"
                        type="radio"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label htmlFor={`price-${range.id}`} className="ml-3 block text-sm text-gray-700">
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Rating</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {ratingOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`rating-${option.value}`}
                        name="rating"
                        type="radio"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label htmlFor={`rating-${option.value}`} className="ml-3 flex items-center text-sm text-gray-700">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star}
                              className={`h-4 w-4 ${star <= Math.floor(option.value) ? 'text-yellow-400' : 'text-gray-300'}`}
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1">{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Link
              href="/search/advanced"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Advanced Search
            </Link>
          </div>
          
          {/* Results Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {loading ? 'Searching...' : `${searchResults.length} services found`}
                </h3>
                <div className="flex items-center">
                  <label htmlFor="sort-by" className="text-sm text-gray-600 mr-2">Sort by:</label>
                  <select
                    id="sort-by"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-32">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-32">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try different keywords or remove filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {searchResults.map((service) => (
                    <div key={service.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="relative h-48 w-full">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow">
                          ${service.price}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center overflow-hidden">
                            <span className="text-sm font-medium text-gray-700">{service.sellerName.charAt(0)}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{service.sellerName}</span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                          <Link href={`/services/${service.id}`} className="hover:text-purple-700">
                            {service.title}
                          </Link>
                        </h3>
                        
                        <div className="flex items-center mb-3">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-sm text-gray-700">{service.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({service.reviewCount})</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                          <div className="text-xs uppercase tracking-wider text-gray-500">
                            {service.category}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {service.deliveryTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 