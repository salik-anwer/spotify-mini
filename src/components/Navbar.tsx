import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-transparent flex flex-col justify-between items-start h-full py-4 hidden min-[375px]:block min-[375px]:w-14 min-[375px]:flex sm:flex sm:w-20 md:flex md:w-20 lg:w-52 xl:w-64 transition-all duration-300 ease-in-out">
        <img src="/sptfy.svg" alt="Spotify Logo" className="w-32 h-12" />
        <img src="/default-pfp.svg" alt="Profile" className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full" />
    </div>
  );
};

export { Navbar };
