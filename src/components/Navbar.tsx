import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-transparent flex flex-col justify-between items-start h-full py-2 px-2 hidden min-[375px]:block min-[375px]:w-20 min-[375px]:flex sm:hidden md:flex md:w-28 md:px-3 md:py-3 lg:w-52 lg:py-4 lg:px-4 transition-all duration-300 ease-in-out">
        <img src="/sptfy.svg" alt="Spotify Logo" className="w-32 h-12 mb-4" />
        <img src="/default-pfp.svg" alt="Profile" className="w-8 h-8 rounded-full" />
    </div>
  );
};

export default Navbar;
