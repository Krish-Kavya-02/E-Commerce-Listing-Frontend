import React from 'react';
import { ShoppingBag } from 'lucide-react';
import WishlistButton from './WishlistButton';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">ShopHub</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <WishlistButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;