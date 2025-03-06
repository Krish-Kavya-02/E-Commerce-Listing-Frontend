import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { selectedProduct, setSelectedProduct, toggleWishlist, addToCart } = useShop();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleClose = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
    setQuantity(1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            aria-label="Close product detail"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="relative h-96 md:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={selectedProduct.images[currentImageIndex]} 
                alt={selectedProduct.title} 
                className="w-full h-full object-contain"
              />
              
              {selectedProduct.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h2>
                  <button 
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-2 rounded-full ${
                      selectedProduct.inWishlist ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'
                    } hover:bg-red-100 hover:text-red-500 transition-colors`}
                    aria-label={selectedProduct.inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`h-6 w-6 ${selectedProduct.inWishlist ? 'fill-red-500' : ''}`} />
                  </button>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-gray-600 capitalize">{selectedProduct.category}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-indigo-600 mb-4">
                  ₹{Math.round(selectedProduct.price).toLocaleString('en-IN')}
                </h3>
                <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center border-0 focus:ring-0"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;