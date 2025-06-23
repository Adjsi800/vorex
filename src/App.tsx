import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { Product } from './types';

type Page = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'thank-you';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderId, setOrderId] = useState<string>('');

  const handleNavigate = (page: string, productOrOrderId?: Product | string) => {
    setCurrentPage(page as Page);
    if (typeof productOrOrderId === 'string') {
      setOrderId(productOrOrderId);
    } else if (productOrOrderId) {
      setSelectedProduct(productOrOrderId);
    }
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'products':
        return <Products onNavigate={handleNavigate} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} onNavigate={handleNavigate} />
        ) : (
          <Products onNavigate={handleNavigate} />
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'thank-you':
        return <ThankYouPage onNavigate={handleNavigate} orderId={orderId} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <main>{renderPage()}</main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;