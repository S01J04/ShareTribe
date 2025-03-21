'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  const navigateToRegister = (type) => {
    router.push(`/auth/register?type=${type}`);
  };
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-purple-700 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Find the perfect</span>{' '}
                  <span className="block text-pink-300 xl:inline">freelance services</span>
                </h1>
                <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Connect with skilled professionals for your projects or offer your expertise to clients around the world.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigateToRegister('client')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 transition duration-150 md:py-4 md:text-lg md:px-10"
                    >
                      Hire a Professional
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigateToRegister('provider')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-900 bg-indigo-100 hover:bg-indigo-200 transition duration-150 md:py-4 md:text-lg md:px-10"
                    >
                      Offer Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
            alt="Team collaborating on a project"
          />
        </div>
      </div>

      {/* Popular Services */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-pink-600 font-semibold tracking-wide uppercase">Popular Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What's trending right now
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover the most in-demand services on our platform
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Logo Design',
                image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                category: 'Design'
              },
              {
                title: 'Web Development',
                image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                category: 'Development'
              },
              {
                title: 'Social Media',
                image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                category: 'Marketing'
              },
              {
                title: 'Content Writing',
                image: 'https://images.unsplash.com/photo-1520971081497-3aa1750677b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
                category: 'Writing'
              }
            ].map((service, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <p className="text-sm font-medium text-pink-300">{service.category}</p>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <Link href={`/search?category=${service.category.toLowerCase()}`} className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View {service.title} services</span>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link
              href="/search/advanced"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition duration-150"
            >
              Browse All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-pink-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to connect
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform makes it easy to find talent or get hired.
            </p>
          </div>

          <div className="mt-12">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Find Talent Quickly</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Search through thousands of professional profiles and find the perfect match for your project.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Direct Communication</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Chat directly with professionals to discuss project details, timeline, and expectations.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Secure Payments</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our escrow system ensures payment is released only when you're satisfied with the work.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Track Progress</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Stay updated on your project's progress with transparent milestones and delivery tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-pink-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our users say
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Real stories from clients and professionals on our platform
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {[
              {
                quote: "I found the perfect developer for my app in just 2 days. The platform made it so easy to connect and communicate.",
                name: "Sarah Johnson",
                title: "Startup Founder",
                avatar: "https://randomuser.me/api/portraits/women/12.jpg"
              },
              {
                quote: "As a freelance designer, this platform has helped me find consistent work with great clients. The payment system is secure and reliable.",
                name: "Michael Chen",
                title: "UI/UX Designer",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "I've hired multiple professionals through this platform and have been impressed with the quality of work every single time.",
                name: "Emily Wilson",
                title: "Marketing Director",
                avatar: "https://randomuser.me/api/portraits/women/23.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <svg className="h-8 w-8 text-pink-500 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-pink-300">Join our platform today</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0 space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-pink-300 hover:bg-pink-200 transition duration-150"
            >
              Create an account
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition duration-150"
            >
              Sign in
            </Link>
          </div>
        </div>
    </div>
    </>
  );
}
