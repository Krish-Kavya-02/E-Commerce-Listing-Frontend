import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';

const WishlistButton: React.FC = () => {
  const { wishlist } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleWishlist = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
        aria-label="Wishlist"
      >
        <Heart className="h-6 w-6" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>
      
      {/* Wishlist Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Wishlist Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Your Wishlist</h2>
            <button
              onClick={toggleWishlist}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Close wishlist"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Heart className="h-12 w-12 mb-4" />
                <p className="text-lg">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {wishlist.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleWishlist}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default WishlistButton;