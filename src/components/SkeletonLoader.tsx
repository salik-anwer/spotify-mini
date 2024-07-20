import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#555">
      <div className="p-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4 overflow-hidden">
            <Skeleton circle={true} height={40} width={50} />
            <div>
              <Skeleton width={300} height={20} />
              <Skeleton width={100} height={20} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export { SkeletonLoader };
