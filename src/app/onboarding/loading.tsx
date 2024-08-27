import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="w-80 md:w-96 p-6 bg-white rounded-lg shadow-lg">
      {/* Title Skeleton */}
      <div className="h-6 w-40 bg-gray-200 animate-pulse mx-auto mb-10 rounded"></div>
      
      {/* First Name & Last Name Skeleton */}
      <div className="flex space-x-4 mb-6">
        <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Bio Skeleton */}
      <div className="h-20 bg-gray-200 animate-pulse rounded mb-6"></div>
      
      {/* Website or Social Link Skeleton */}
      <div className="h-10 bg-gray-200 animate-pulse rounded mb-6"></div>

      {/* Button Skeleton */}
      <div className="h-10 w-full bg-gray-300 animate-pulse rounded mb-6"></div>

      {/* Step Indicator Skeleton */}
      <div className="h-4 w-24 bg-gray-200 animate-pulse mx-auto rounded"></div>
    </div>
  </div>
  )
}

export default Loading