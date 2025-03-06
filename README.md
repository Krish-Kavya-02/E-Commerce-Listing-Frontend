# E-Commerce Product Listing Page

A modern e-commerce product listing page built with React, TypeScript, and Tailwind CSS.

## Features

### Core Features
- **Product Listing with Image Carousel**: Browse through multiple product images with an interactive carousel
- **Filtering & Sorting**: Filter products by category, price range, and search query with debounced input
- **'Recommended for You' Section**: Personalized product recommendations
- **Wishlist Feature**: Add/remove products to your wishlist
- **Pagination**: Navigate through product pages with a clean pagination interface
- **Price Range Filter**: Filter products by minimum and maximum price
- **Shopping Cart**: Fully functioning cart with quantity controls and real-time total calculation

### Technical Features
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Debounced Search**: Optimized search input to reduce unnecessary API calls
- **Context API**: Global state management using React Context
- **TypeScript**: Type-safe code with TypeScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Accessibility**: Accessible UI components with proper ARIA attributes

## Implementation Details

### Data Fetching
The application fetches product data from the Fake Store API and transforms it to match our product interface.

### State Management
React Context API is used for global state management, providing access to:
- Products data
- Filter options
- Wishlist
- Shopping cart
- Pagination state

### UI Components
- **ProductCard**: Displays product information with image carousel and wishlist toggle
- **FilterSidebar**: Contains all filtering and sorting options
- **ProductGrid**: Displays filtered products with pagination
- **RecommendedProducts**: Shows personalized product recommendations
- **ShoppingCart**: Manages cart items with quantity controls and total calculation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the local development URL

## Future Enhancements
- User authentication
- Product reviews and ratings
- Recently viewed products
- Save for later functionality
- Order history