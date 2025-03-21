'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    deliveryTime: '7',
    revisions: '3',
    price: '',
    tags: [],
    currentTag: '',
    images: []
  });
  const [errors, setErrors] = useState({});

  // Mock categories
  const categories = [
    { id: 'design', name: 'Design & Creative', subcategories: [
      'Logo Design', 'Web Design', 'Graphic Design', 'UI/UX Design', 'Art & Illustration', 'Animation'
    ]},
    { id: 'development', name: 'Development & IT', subcategories: [
      'Web Development', 'Mobile Apps', 'Software Development', 'Game Development', 'Wordpress', 'E-commerce'
    ]},
    { id: 'marketing', name: 'Digital Marketing', subcategories: [
      'Social Media', 'SEO', 'Content Marketing', 'Email Marketing', 'SEM', 'Analytics'
    ]},
    { id: 'writing', name: 'Writing & Translation', subcategories: [
      'Content Writing', 'Copywriting', 'Translation', 'Technical Writing', 'Creative Writing', 'Resumes & Cover Letters'
    ]},
    { id: 'video', name: 'Video & Animation', subcategories: [
      'Video Editing', 'Animation', 'Video Production', 'Explainer Videos', 'Intros & Outros', 'Visual Effects'
    ]},
    { id: 'business', name: 'Business & Consulting', subcategories: [
      'Business Planning', 'Financial Consulting', 'Legal Consulting', 'Market Research', 'Career Advice', 'Presentations'
    ]}
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle category selection and update subcategories
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      category: value,
      subcategory: '' // Reset subcategory when category changes
    }));
  };

  // Handle tag input
  const handleTagInput = (e) => {
    setFormData(prev => ({
      ...prev,
      currentTag: e.target.value
    }));
  };

  // Add tag when Enter is pressed
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && formData.currentTag.trim() !== '') {
      e.preventDefault();
      
      if (formData.tags.length >= 5) {
        setErrors(prev => ({
          ...prev,
          tags: 'Maximum 5 tags allowed'
        }));
        return;
      }
      
      if (formData.tags.includes(formData.currentTag.trim())) {
        setErrors(prev => ({
          ...prev,
          tags: 'Tag already exists'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
      
      // Clear tag error if it exists
      if (errors.tags) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.tags;
          return newErrors;
        });
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (formData.images.length + files.length > 5) {
      setErrors(prev => ({
        ...prev,
        images: 'Maximum 5 images allowed'
      }));
      return;
    }
    
    // In a real app, you would upload these to a server or cloud storage
    // For now, we'll just create local URLs
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      file
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    // Clear image error if it exists
    if (errors.images) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  // Remove image
  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image.id !== imageId)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.subcategory) {
      newErrors.subcategory = 'Subcategory is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Here you would normally submit the form data to your API
      console.log('Submitting service data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to the service page or dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating service:', error);
      setErrors({
        submit: 'Failed to create service. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const selectedCategory = categories.find(cat => cat.id === formData.category);
    return selectedCategory ? selectedCategory.subcategories : [];
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
            <Link
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <p className="text-gray-600">
            Share your talents with the world. Fill out the details below to create your service offering.
          </p>
        </div>
        
        {errors.submit && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {errors.submit}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="e.g., Professional Logo Design for Your Business"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 error-message">{errors.title}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.category ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600 error-message">{errors.category}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                      Subcategory <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      disabled={!formData.category}
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.subcategory ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${!formData.category ? 'bg-gray-100' : ''}`}
                    >
                      <option value="">Select a subcategory</option>
                      {getSubcategories().map(subcat => (
                        <option key={subcat} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                    </select>
                    {errors.subcategory && (
                      <p className="mt-1 text-sm text-red-600 error-message">{errors.subcategory}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Describe your service in detail. What do you offer? What makes your service unique? What will clients receive?"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 error-message">{errors.description}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Min. 50 characters. Be detailed and clear about what you're offering.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex flex-wrap items-center gap-2 p-2 border ${errors.tags ? 'border-red-300' : 'border-gray-300'} rounded-md`}>
                    {formData.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                        >
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      id="currentTag"
                      name="currentTag"
                      value={formData.currentTag}
                      onChange={handleTagInput}
                      onKeyDown={handleTagKeyDown}
                      className="flex-1 outline-none text-sm min-w-[150px]"
                      placeholder={formData.tags.length === 0 ? "Enter tags and press Enter (e.g., logo, design, branding)" : "Add more tags..."}
                    />
                  </div>
                  {errors.tags && (
                    <p className="mt-1 text-sm text-red-600 error-message">{errors.tags}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Add up to 5 tags that best describe your service. Press Enter after each tag.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Service Details */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Service Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="deliveryTime"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="21">21 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="revisions" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Revisions <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="revisions"
                    name="revisions"
                    value={formData.revisions}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="1">1 revision</option>
                    <option value="2">2 revisions</option>
                    <option value="3">3 revisions</option>
                    <option value="5">5 revisions</option>
                    <option value="unlimited">Unlimited revisions</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="5"
                      step="0.01"
                      className={`appearance-none block w-full pl-7 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600 error-message">{errors.price}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Images */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Service Images <span className="text-red-500">*</span></h2>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md 
                             ${errors.images ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}"
              >
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload images</span>
                      <input 
                        id="images" 
                        name="images" 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB (Max 5 images)
                  </p>
                </div>
              </div>
              
              {errors.images && (
                <p className="mt-1 text-sm text-red-600 error-message">{errors.images}</p>
              )}
              
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {formData.images.map(image => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="object-cover h-40 w-full" 
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 inline-flex items-center p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <p className="mt-1 text-xs text-gray-500 truncate">{image.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Submit Buttons */}
            <div className="px-6 py-4 bg-gray-50 text-right">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Service...
                  </span>
                ) : (
                  'Create Service'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 