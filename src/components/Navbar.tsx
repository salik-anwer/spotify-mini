import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="h-full w-52 bg-gray-900 flex flex-col justify-between items-start py-4 px-4">
      <div>
        <img src="/sptfy.svg" alt="Spotify Logo" className="w-32 h-12 mb-4" />
      </div>
      <div>
        <img src="/default-pfp.svg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
