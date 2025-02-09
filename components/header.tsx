import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center p-4 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-md border border-gray-300">
      <div className="flex items-center space-x-6 text-sm text-gray-800">
        <img src="/logo.png" alt="Logo" className="h-16 w-15" />
        
        <ul className="flex space-x-6">
          <li>
            <Link href="/models" className="hover:text-gray-400">
              Models
            </Link>
          </li>
          <li>
            <Link href="/datasets" className="hover:text-gray-400">
              Datasets
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-gray-400">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/docs" className="hover:text-gray-400 flex items-center">
              Documentation
              <span className="ml-1">↗</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-sm text-gray-800 hover:text-black">Login</a>
        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700">
          Start for free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
