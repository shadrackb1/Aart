
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-w-3 aspect-h-4 w-full bg-gray-300"></div>
      <div className="mt-4 flex justify-between">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
