import { ShopProvider } from './context/ShopContext';
import ProductListingPage from './pages/ProductListingPage';

function App() {
  return (
    <ShopProvider>
      <ProductListingPage />
    </ShopProvider>
  );
}

export default App;