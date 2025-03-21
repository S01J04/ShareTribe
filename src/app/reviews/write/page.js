'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function WriteReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
    anonymous: false
  });
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        router.push('/reviews');
        return;
      }
      
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real app, you would fetch the order details from your API
        const mockOrderDetails = {
          id: orderId,
          serviceId: 'srvc789',
          serviceName: 'Social Media Strategy',
          sellerId: 'user901',
          sellerName: 'James Thompson',
          sellerAvatar: '/images/users/james.jpg',
          description: 'Comprehensive social media strategy for your business, including content plan, posting schedule, and analytics setup.',
          completedDate: '2023-11-05T10:00:00.000Z',
          deliverables: [
            'Social media audit report',
            'Content calendar for 3 months',
            'Competitor analysis',
            'Posting schedule for optimal engagement',
            'Analytics dashboard setup'
          ]
        };
        
        setOrderDetails(mockOrderDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
        // Redirect if there's an error
        router.push('/reviews');
      }
    };
    
    fetchOrderDetails();
  }, [orderId, router]);
  
  const handleRatingChange = (newRating) => {
    setReview(prev => ({
      ...prev,
      rating: newRating
    }));
    
    if (errors.rating) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };
  
  const handleCommentChange = (e) => {
    const comment = e.target.value;
    setReview(prev => ({
      ...prev,
      comment
    }));
    
    if (errors.comment && comment.trim().length >= 10) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.comment;
        return newErrors;
      });
    }
  };
  
  const handleAnonymousChange = (e) => {
    setReview(prev => ({
      ...prev,
      anonymous: e.target.checked
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (review.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (review.comment.trim().length < 10) {
      newErrors.comment = 'Please provide a comment of at least 10 characters';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, you would submit the review to your API
      console.log('Submitting review:', {
        orderId,
        serviceId: orderDetails.serviceId,
        sellerId: orderDetails.sellerId,
        rating: review.rating,
        comment: review.comment,
        anonymous: review.anonymous
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to reviews page after successful submission
      router.push('/reviews?success=true');
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({
        submit: 'Failed to submit review. Please try again.'
      });
      setSubmitting(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!orderDetails) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Write a Review</h1>
            <Link
              href="/reviews"
              className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium"
            >
              <span>Back to Reviews</span>
            </Link>
          </div>
          <p className="text-gray-600">
            Share your experience with the service you received. Your feedback helps other buyers make informed decisions.
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
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                  {/* In a real app, this would be an actual image */}
                  <span className="font-bold text-lg">{orderDetails.sellerName.charAt(0)}</span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {orderDetails.serviceName}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  by <Link href={`/profile/${orderDetails.sellerId}`} className="text-indigo-600 hover:text-indigo-800">{orderDetails.sellerName}</Link> • Completed on {formatDate(orderDetails.completedDate)}
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rate your experience</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your rating <span className="text-red-500">*</span></label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="h-8 w-8 focus:outline-none"
                    >
                      <svg 
                        className={`h-8 w-8 ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {review.rating === 0
                      ? 'Select a rating'
                      : review.rating === 1
                      ? 'Poor'
                      : review.rating === 2
                      ? 'Fair'
                      : review.rating === 3
                      ? 'Good'
                      : review.rating === 4
                      ? 'Very Good'
                      : 'Excellent'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Your review <span className="text-red-500">*</span></label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={6}
                  value={review.comment}
                  onChange={handleCommentChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.comment ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Share your experience with this service. What did you like or dislike? Was the service delivered as promised?"
                ></textarea>
                {errors.comment ? (
                  <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum 10 characters. Be specific and honest in your review to help others make informed decisions.
                  </p>
                )}
              </div>
            </div>
            
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Review Visibility</h3>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="anonymous"
                    name="anonymous"
                    type="checkbox"
                    checked={review.anonymous}
                    onChange={handleAnonymousChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="anonymous" className="font-medium text-gray-700">Post anonymously</label>
                  <p className="text-gray-500">
                    If selected, your name will be hidden in the review. Instead, it will show as "Anonymous User".
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 flex justify-end">
              <Link
                href="/reviews"
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  submitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {submitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
          </div>
          <div className="px-6 py-5">
            <h4 className="text-md font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 mb-4">{orderDetails.description}</p>
            
            <h4 className="text-md font-medium text-gray-900 mb-2">Deliverables</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {orderDetails.deliverables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 