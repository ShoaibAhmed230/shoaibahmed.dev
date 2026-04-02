import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`skeleton rounded ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent -translate-x-full animate-shimmer" />
    </div>
  );
};

export default Skeleton;
