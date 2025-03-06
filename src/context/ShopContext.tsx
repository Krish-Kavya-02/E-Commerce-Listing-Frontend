import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, FilterOptions, USD_TO_INR } from '../types';

interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  filterOptions: FilterOptions;
  updateFilterOptions: (options: Partial<FilterOptions>) => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  categories: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 8;

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    searchQuery: '',
    sortBy: 'default'
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Transform the data to match our Product interface
        const transformedData: Product[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          // Convert price to INR
          price: item.price * USD_TO_INR,
          description: item.description,
          category: item.category,
          images: [item.image, item.image], // Duplicate the image for carousel demo
          rating: {
            rate: item.rating.rate,
            count: item.rating.count
          },
          inWishlist: false
        }));
        
        setProducts(transformedData);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(transformedData.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (filterOptions.category !== 'all') {
      result = result.filter(product => product.category === filterOptions.category);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= filterOptions.minPrice && product.price <= filterOptions.maxPrice
    );
    
    // Filter by search query
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (filterOptions.sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'popularity':
        result.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }
    
    // Mark wishlist items
    result = result.map(product => ({
      ...product,
      inWishlist: wishlist.some(item => item.id === product.id)
    }));
    
    setFilteredProducts(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [products, filterOptions, wishlist]);

  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, { ...product, inWishlist: true }]);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(
      cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const value = {
    products,
    filteredProducts,
    isLoading,
    error,
    filterOptions,
    updateFilterOptions,
    wishlist,
    toggleWishlist,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    categories,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    selectedProduct,
    setSelectedProduct
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};