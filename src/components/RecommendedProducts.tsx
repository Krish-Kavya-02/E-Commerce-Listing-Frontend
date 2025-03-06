import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';

const RecommendedProducts: React.FC = () => {
  const { products } = useShop();
  const [recommendedProducts, setRecommendedProducts] = useState<Array<any>>([]);
  
  // Get 4 random products as recommendations, but only update every 60 seconds
  useEffect(() => {
    const getRecommendedProducts = () => {
      if (products.length <= 4) {
        setRecommendedProducts(products);
        return;
      }
      
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRecommendedProducts(shuffled.slice(0, 4));
    };
    
    // Set initial recommendations
    if (products.length > 0 && recommendedProducts.length === 0) {
      getRecommendedProducts();
    }
    
    // Update recommendations every 60 seconds
    const intervalId = setInterval(() => {
      getRecommendedProducts();
    }, 60000); // 60 seconds
    
    return () => clearInterval(intervalId);
  }, [products, recommendedProducts.length]);
  
  if (recommendedProducts.length === 0) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;