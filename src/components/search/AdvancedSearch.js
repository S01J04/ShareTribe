'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdvancedSearch() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    keyword: '',
    category: '',
    skills: [],
    location: '',
    distance: '50',
    minRate: '',
    maxRate: '',
    availability: [],
    rating: '0',
  });
  
  // Available options for form select fields
  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'writing', name: 'Writing' },
    { id: 'construction', name: 'Construction' },
    { id: 'maintenance', name: 'Maintenance' },
  ];
  
  const skillOptions = [
    // Design
    { id: 'ui_design', name: 'UI Design', category: 'design' },
    { id: 'graphic_design', name: 'Graphic Design', category: 'design' },
    { id: 'logo_design', name: 'Logo Design', category: 'design' },
    { id: 'figma', name: 'Figma', category: 'design' },
    { id: 'adobe_xd', name: 'Adobe XD', category: 'design' },
    
    // Development
    { id: 'javascript', name: 'JavaScript', category: 'development' },
    { id: 'react', name: 'React', category: 'development' },
    { id: 'nodejs', name: 'Node.js', category: 'development' },
    { id: 'python', name: 'Python', category: 'development' },
    { id: 'aws', name: 'AWS', category: 'development' },
    
    // Marketing
    { id: 'seo', name: 'SEO', category: 'marketing' },
    { id: 'social_media', name: 'Social Media', category: 'marketing' },
    { id: 'content_marketing', name: 'Content Marketing', category: 'marketing' },
    { id: 'ppc', name: 'PPC', category: 'marketing' },
    
    // Writing
    { id: 'copywriting', name: 'Copywriting', category: 'writing' },
    { id: 'technical_writing', name: 'Technical Writing', category: 'writing' },
    { id: 'blog_writing', name: 'Blog Writing', category: 'writing' },
    
    // Construction
    { id: 'electrical', name: 'Electrical', category: 'construction' },
    { id: 'plumbing', name: 'Plumbing', category: 'construction' },
    { id: 'carpentry', name: 'Carpentry', category: 'construction' },
    
    // Maintenance
    { id: 'hvac', name: 'HVAC', category: 'maintenance' },
    { id: 'cleaning', name: 'Cleaning', category: 'maintenance' },
    { id: 'landscaping', name: 'Landscaping', category: 'maintenance' },
  ];
  
  const availabilityOptions = [
    { id: 'now', name: 'Available Now' },
    { id: 'this_week', name: 'This Week' },
    { id: 'next_week', name: 'Next Week' },
    { id: 'this_month', name: 'This Month' },
    { id: 'custom', name: 'Custom Date Range' },
  ];
  
  // Get skills that match the selected category
  const filteredSkills = formData.category 
    ? skillOptions.filter(skill => skill.category === formData.category)
    : skillOptions;
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle skills multiselect
  const handleSkillChange = (skillId) => {
    const updatedSkills = formData.skills.includes(skillId)
      ? formData.skills.filter(id => id !== skillId)
      : [...formData.skills, skillId];
    
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };
  
  // Handle availability multiselect
  const handleAvailabilityChange = (availId) => {
    const updatedAvailability = formData.availability.includes(availId)
      ? formData.availability.filter(id => id !== availId)
      : [...formData.availability, availId];
    
    setFormData({
      ...formData,
      availability: updatedAvailability,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct query string from form data
    const queryParams = new URLSearchParams();
    
    if (formData.keyword) queryParams.append('keyword', formData.keyword);
    if (formData.category) queryParams.append('category', formData.category);
    if (formData.skills.length) queryParams.append('skills', formData.skills.join(','));
    if (formData.location) queryParams.append('location', formData.location);
    if (formData.distance) queryParams.append('distance', formData.distance);
    if (formData.minRate) queryParams.append('minRate', formData.minRate);
    if (formData.maxRate) queryParams.append('maxRate', formData.maxRate);
    if (formData.availability.length) queryParams.append('availability', formData.availability.join(','));
    if (formData.rating !== '0') queryParams.append('rating', formData.rating);
    
    // Navigate to search results with query parameters
    router.push(`/search/results?${queryParams.toString()}`);
  };
  
  // Handle form reset
  const handleReset = () => {
    setFormData({
      keyword: '',
      category: '',
      skills: [],
      location: '',
      distance: '50',
      minRate: '',
      maxRate: '',
      availability: [],
      rating: '0',
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Search</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Keyword */}
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              Keyword
            </label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="Search by keyword or name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Skills */}
          <div className="md:col-span-2">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </legend>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center">
                    <input
                      id={`skill-${skill.id}`}
                      name="skills"
                      type="checkbox"
                      checked={formData.skills.includes(skill.id)}
                      onChange={() => handleSkillChange(skill.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`skill-${skill.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {skill.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, state, or zip code"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Distance */}
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Distance (miles)
            </label>
            <input
              type="range"
              id="distance"
              name="distance"
              min="0"
              max="100"
              step="5"
              value={formData.distance}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>{formData.distance} miles</span>
              <span>100</span>
            </div>
          </div>
          
          {/* Price Range */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="minRate" className="block text-sm font-medium text-gray-700 mb-1">
                Min Rate ($/hr)
              </label>
              <input
                type="number"
                id="minRate"
                name="minRate"
                value={formData.minRate}
                onChange={handleChange}
                min="0"
                placeholder="Min"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="maxRate" className="block text-sm font-medium text-gray-700 mb-1">
                Max Rate ($/hr)
              </label>
              <input
                type="number"
                id="maxRate"
                name="maxRate"
                value={formData.maxRate}
                onChange={handleChange}
                min="0"
                placeholder="Max"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="0">Any Rating</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
          
          {/* Availability */}
          <div className="md:col-span-2">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </legend>
              <div className="flex flex-wrap gap-4">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={`avail-${option.id}`}
                      name="availability"
                      type="checkbox"
                      checked={formData.availability.includes(option.id)}
                      onChange={() => handleAvailabilityChange(option.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`avail-${option.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
} 