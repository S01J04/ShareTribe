export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full border-r-4 border-transparent border-opacity-50"></div>
        </div>
        <p className="text-xl font-medium text-gray-700">Loading...</p>
        <p className="text-sm text-gray-500">Please wait while we prepare your content</p>
      </div>
    </div>
  );
} 