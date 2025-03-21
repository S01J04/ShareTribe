'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdvancedSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    query: '',
    category: 'all',
    subcategory: 'all',
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    deliveryTime: 'any',
    location: '',
    onlineOnly: false,
    sortBy: 'recommended'
  });
  
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  
  useEffect(() => {
    // Pre-fill form with any search params from URL
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    
    setFormData(prev => ({
      ...prev,
      query,
      category
    }));
    
    // If there's a query or category, trigger a search
    if (query || category !== 'all') {
      handleSearch({ query, category });
    }
  }, [searchParams, handleSearch]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData(prev => ({
      ...prev,
      category,
      subcategory: 'all' // Reset subcategory when category changes
    }));
  };
  
  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };
  
  const handleClearAll = () => {
    setFormData({
      query: '',
      category: 'all',
      subcategory: 'all',
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      deliveryTime: 'any',
      location: '',
      onlineOnly: false,
      sortBy: 'recommended'
    });
  };
  
  const handleSearch = async (overrideParams = {}) => {
    setIsSearching(true);
    
    // Combine form data with any override params
    const searchParams = { ...formData, ...overrideParams };
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results
      const mockResults = [
        {
          id: 'service-1',
          title: 'Professional Website Development',
          category: 'development',
          subcategory: 'web',
          price: 500,
          rating: 4.9,
          reviewCount: 124,
          sellerName: 'John Doe',
          sellerImage: '/avatars/john.jpg',
          sellerLevel: 'Top Rated',
          image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg',
          deliveryTime: '7 days',
          location: 'New York, USA'
        },
        {
          id: 'service-2',
          title: 'Creative Logo Design',
          category: 'design',
          subcategory: 'logo',
          price: 150,
          rating: 4.8,
          reviewCount: 89,
          sellerName: 'Sarah Johnson',
          sellerImage: '/avatars/sarah.jpg',
          sellerLevel: 'Rising Talent',
          image: 'https://cdn.pixabay.com/photo/2017/03/25/17/55/colorful-2174045_1280.png',
          deliveryTime: '3 days',
          location: 'Los Angeles, USA'
        },
        {
          id: 'service-3',
          title: 'SEO Optimization Package',
          category: 'marketing',
          subcategory: 'seo',
          price: 300,
          rating: 4.7,
          reviewCount: 56,
          sellerName: 'Michael Brown',
          sellerImage: '/avatars/michael.jpg',
          sellerLevel: 'Level 2',
          image: 'https://cdn.pixabay.com/photo/2019/08/06/22/48/artificial-intelligence-4389372_1280.jpg',
          deliveryTime: '10 days',
          location: 'Chicago, USA'
        },
        {
          id: 'service-4',
          title: 'Professional Content Writing',
          category: 'writing',
          subcategory: 'articles',
          price: 80,
          rating: 4.5,
          reviewCount: 42,
          sellerName: 'Emma Wilson',
          sellerImage: '/avatars/emma.jpg',
          sellerLevel: 'Level 1',
          image: 'https://cdn.pixabay.com/photo/2015/09/05/07/28/writing-923882_1280.jpg',
          deliveryTime: '2 days',
          location: 'Online'
        },
        {
          id: 'service-5',
          title: 'Kitchen Remodeling',
          category: 'construction',
          subcategory: 'renovation',
          price: 3000,
          rating: 4.9,
          reviewCount: 35,
          sellerName: 'Robert Garcia',
          sellerImage: '/avatars/robert.jpg',
          sellerLevel: 'Top Rated',
          image: 'https://cdn.pixabay.com/photo/2016/12/30/07/55/kitchen-1940174_1280.jpg',
          deliveryTime: '30 days',
          location: 'Miami, USA'
        },
        {
          id: 'service-6',
          title: 'HVAC Maintenance and Repair',
          category: 'maintenance',
          subcategory: 'hvac',
          price: 120,
          rating: 4.7,
          reviewCount: 52,
          sellerName: 'David Miller',
          sellerImage: '/avatars/david.jpg',
          sellerLevel: 'Level 2',
          image: 'https://cdn.pixabay.com/photo/2017/09/08/02/24/maintenance-2727889_1280.jpg',
          deliveryTime: '1 day',
          location: 'Denver, USA'
        }
      ];
      
      // Filter the results based on search parameters
      let filteredResults = [...mockResults];
      
      // Apply category filter
      if (searchParams.category !== 'all') {
        filteredResults = filteredResults.filter(item => item.category === searchParams.category);
      }
      
      // Apply subcategory filter
      if (searchParams.subcategory !== 'all') {
        filteredResults = filteredResults.filter(item => item.subcategory === searchParams.subcategory);
      }
      
      // Apply price range filter
      if (searchParams.minPrice) {
        filteredResults = filteredResults.filter(item => item.price >= parseInt(searchParams.minPrice, 10));
      }
      
      if (searchParams.maxPrice) {
        filteredResults = filteredResults.filter(item => item.price <= parseInt(searchParams.maxPrice, 10));
      }
      
      // Apply rating filter
      if (searchParams.minRating > 0) {
        filteredResults = filteredResults.filter(item => item.rating >= searchParams.minRating);
      }
      
      // Apply delivery time filter
      if (searchParams.deliveryTime !== 'any') {
        const deliveryDays = parseInt(searchParams.deliveryTime, 10);
        filteredResults = filteredResults.filter(item => {
          const itemDays = parseInt(item.deliveryTime.split(' ')[0], 10);
          return itemDays <= deliveryDays;
        });
      }
      
      // Apply location filter
      if (searchParams.location) {
        filteredResults = filteredResults.filter(item => 
          item.location.toLowerCase().includes(searchParams.location.toLowerCase())
        );
      }
      
      // Apply online only filter
      if (searchParams.onlineOnly) {
        filteredResults = filteredResults.filter(item => item.location === 'Online');
      }
      
      // Apply text search
      if (searchParams.query) {
        const query = searchParams.query.toLowerCase();
        filteredResults = filteredResults.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.sellerName.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.subcategory.toLowerCase().includes(query)
        );
      }
      
      // Sort results
      switch (searchParams.sortBy) {
        case 'price_low':
          filteredResults.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filteredResults.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredResults.sort((a, b) => b.rating - a.rating);
          break;
        case 'deliveryTime':
          filteredResults.sort((a, b) => {
            const aDays = parseInt(a.deliveryTime.split(' ')[0], 10);
            const bDays = parseInt(b.deliveryTime.split(' ')[0], 10);
            return aDays - bDays;
          });
          break;
        // recommended sorting (default)
        default:
          filteredResults.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
      }
      
      setSearchResults(filteredResults);
      
    } catch (error) {
      console.error('Error searching services:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  
  // Categories and subcategories
  const categories = [
    { id: 'all', name: 'All Categories', subcategories: [] },
    { 
      id: 'design', 
      name: 'Design', 
      subcategories: [
        { id: 'all', name: 'All Design' },
        { id: 'logo', name: 'Logo Design' },
        { id: 'web', name: 'Web Design' },
        { id: 'product', name: 'Product Design' }
      ]
    },
    { 
      id: 'development', 
      name: 'Development', 
      subcategories: [
        { id: 'all', name: 'All Development' },
        { id: 'web', name: 'Web Development' },
        { id: 'mobile', name: 'Mobile Development' },
        { id: 'game', name: 'Game Development' }
      ]
    },
    { 
      id: 'marketing', 
      name: 'Marketing', 
      subcategories: [
        { id: 'all', name: 'All Marketing' },
        { id: 'seo', name: 'SEO' },
        { id: 'social', name: 'Social Media' },
        { id: 'content', name: 'Content Marketing' }
      ]
    },
    { 
      id: 'writing', 
      name: 'Writing', 
      subcategories: [
        { id: 'all', name: 'All Writing' },
        { id: 'articles', name: 'Article Writing' },
        { id: 'copywriting', name: 'Copywriting' },
        { id: 'technical', name: 'Technical Writing' }
      ]
    },
    { 
      id: 'construction', 
      name: 'Construction', 
      subcategories: [
        { id: 'all', name: 'All Construction' },
        { id: 'renovation', name: 'Renovation' },
        { id: 'building', name: 'Building' },
        { id: 'landscaping', name: 'Landscaping' }
      ]
    },
    { 
      id: 'maintenance', 
      name: 'Maintenance', 
      subcategories: [
        { id: 'all', name: 'All Maintenance' },
        { id: 'hvac', name: 'HVAC' },
        { id: 'plumbing', name: 'Plumbing' },
        { id: 'electrical', name: 'Electrical' }
      ]
    }
  ];
  
  // Get subcategories for the selected category
  const subcategories = categories.find(cat => cat.id === formData.category)?.subcategories || [];
  
  // Delivery time options
  const deliveryTimeOptions = [
    { value: 'any', label: 'Any time' },
    { value: '1', label: 'Express 24H' },
    { value: '3', label: 'Up to 3 days' },
    { value: '7', label: 'Up to 7 days' },
    { value: '30', label: 'Up to 30 days' }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Advanced Search</h1>
          <p className="text-gray-600 mt-1">Find the perfect service that meets your specific requirements.</p>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Panel */}
          <div className="col-span-1">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-800"
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                >
                  {filtersExpanded ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {filtersExpanded && (
                <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
                  <div>
                    <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="query"
                        id="query"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        placeholder="What are you looking for?"
                        value={formData.query}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      value={formData.category}
                      onChange={handleCategoryChange}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {formData.category !== 'all' && subcategories.length > 0 && (
                    <div>
                      <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                        Subcategory
                      </label>
                      <select
                        id="subcategory"
                        name="subcategory"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                      >
                        {subcategories.map(subcategory => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <span className="block text-sm font-medium text-gray-700 mb-1">Price range</span>
                    <div className="flex items-center space-x-2">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="minPrice"
                          placeholder="Min"
                          min="0"
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                          value={formData.minPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                      <span className="text-gray-500">-</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="maxPrice"
                          placeholder="Max"
                          min="0"
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                          value={formData.maxPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-sm font-medium text-gray-700 mb-1">Seller rating</span>
                    <div className="flex space-x-1">
                      {[4, 4.5, 4.8].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          className={`px-3 py-1 rounded-full text-sm ${
                            formData.minRating === rating
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          onClick={() => handleRatingClick(rating)}
                        >
                          {rating}+ stars
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery time
                    </label>
                    <select
                      id="deliveryTime"
                      name="deliveryTime"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                    >
                      {deliveryTimeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Enter city, state, or country"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="onlineOnly"
                      name="onlineOnly"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      checked={formData.onlineOnly}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="onlineOnly" className="ml-2 block text-sm text-gray-700">
                      Online services only
                    </label>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={handleClearAll}
                    >
                      Clear All
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Apply Filters
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Results Panel */}
          <div className="col-span-3">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <h3 className="text-lg font-medium text-gray-900">
                  {isSearching ? 'Searching...' : `${searchResults.length} results found`}
                </h3>
                <div className="flex items-center">
                  <label htmlFor="sortBy" className="mr-2 text-sm text-gray-600">Sort by:</label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={formData.sortBy}
                    onChange={handleInputChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="deliveryTime">Fastest Delivery</option>
                  </select>
                </div>
              </div>
              
              {isSearching ? (
                <div className="flex justify-center items-center py-32">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-32">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {searchResults.map(service => (
                    <div key={service.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="relative h-48 w-full">
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
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center overflow-hidden">
                            <span className="text-sm font-medium text-gray-700">{service.sellerName.charAt(0)}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-900">{service.sellerName}</span>
                            <span className="block text-xs text-gray-500">{service.sellerLevel}</span>
                          </div>
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
                        
                        <div className="flex flex-wrap text-xs text-gray-500 gap-3 mb-3">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {service.deliveryTime}
                          </div>
                          
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {service.location}
                          </div>
                        </div>
                        
                        <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                          <div className="text-xs uppercase tracking-wider text-gray-500">
                            {service.category} / {service.subcategory}
                          </div>
                          <Link
                            href={`/services/${service.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-white bg-purple-600 hover:bg-purple-700"
                          >
                            View
                          </Link>
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