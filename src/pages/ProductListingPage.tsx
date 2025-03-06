import React from 'react';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import RecommendedProducts from '../components/RecommendedProducts';
import ShoppingCart from '../components/ShoppingCart';
import ProductDetail from '../components/ProductDetail';
import { useShop } from '../context/ShopContext';
import { Loader2 } from 'lucide-react';

const ProductListingPage: React.FC = () => {
  const { isLoading, error, selectedProduct } = useShop();
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <FilterSidebar />
              </div>
              
              <div className="md:w-3/4">
                <ProductGrid />
                <RecommendedProducts />
              </div>
            </div>
          </>
        )}
      </main>
      
      <ShoppingCart />
      {selectedProduct && <ProductDetail />}
    </div>
  );
};

export default ProductListingPage;