'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  
  // Determine if we're on login or register to highlight the active tab
  const isLoginPage = pathname === '/auth/login';
  const isRegisterPage = pathname === '/auth/register';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-2xl font-bold text-indigo-600">ShareTribe</span>
                </Link>
              </div>
            </div>
            
            {/* Only show the tabs for login and register pages, not for forgot password etc. */}
            {(isLoginPage || isRegisterPage) && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  href="/auth/login"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isLoginPage 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/register"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isRegisterPage 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Create Account
                </Link>
              </div>
            )}
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link 
                href="/"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Content */}
      <main>
        {children}
      </main>
      
      {/* Simplified Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ShareTribe. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link 
                href="/terms" 
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 