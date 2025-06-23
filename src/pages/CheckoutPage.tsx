import React, { useState } from 'react';
import { ArrowLeft, Shield, Upload, CheckCircle, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Customer, Order, PaymentProof } from '../types';
import { sendOrderToTelegram } from '../utils/telegram';

interface CheckoutPageProps {
  onNavigate: (page: string, orderId?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { state, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    telegramUsername: ''
  });
  const [paymentProof, setPaymentProof] = useState<PaymentProof | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer.name && customer.email && customer.phone) {
      setStep(2);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPaymentProof({
          file,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentProof) {
      alert('Please upload payment screenshot');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order: Order = {
      id: 'ORD-' + Date.now(),
      customer,
      items: state.items,
      total: state.total,
      paymentProof,
      createdAt: new Date()
    };

    // Send order to Telegram
    try {
      await sendOrderToTelegram(order);
      clearCart();
      onNavigate('thank-you', order.id);
    } catch (error) {
      console.error('Failed to process order:', error);
      alert('Failed to process order. Please try again.');
    }

    setIsProcessing(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Add some subscriptions to proceed with checkout.
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-200"
          >
            Browse Subscriptions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Checkout</h1>
          <p className="text-xl text-purple-100">
            Complete your order with Vodafone Cash payment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    1
                  </div>
                  <span className="ml-2 font-semibold">Customer Info</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    2
                  </div>
                  <span className="ml-2 font-semibold">Payment</span>
                </div>
              </div>
            </div>

            {/* Step 1: Customer Information */}
            {step === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Information</h3>
                <form onSubmit={handleCustomerInfoSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Telegram Username (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.telegramUsername}
                      onChange={(e) => setCustomer({...customer, telegramUsername: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="@yourusername"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      We'll send your subscription details via Telegram if provided
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-6">
                  <Smartphone className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Vodafone Cash Payment</h3>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{customer.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{customer.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{customer.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-red-900 dark:text-red-300 mb-4 flex items-center">
                    <Smartphone className="h-5 w-5 mr-2" />
                    Payment Instructions
                  </h4>
                  <div className="space-y-3 text-red-800 dark:text-red-300">
                    <p><strong>1.</strong> Open your Vodafone Cash app</p>
                    <p><strong>2.</strong> Send <strong>${state.total.toFixed(2)}</strong> to: <strong className="text-xl">01021981265</strong></p>
                    <p><strong>3.</strong> Take a screenshot of the successful payment</p>
                    <p><strong>4.</strong> Upload the screenshot below</p>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Payment Screenshot *
                    </label>
                    <label className="relative block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer focus-within:ring-2 focus-within:ring-purple-500">
                      {paymentProof ? (
                        <div className="space-y-4">
                          <img
                            src={paymentProof.preview}
                            alt="Payment proof"
                            className="max-w-full h-48 object-contain mx-auto rounded-lg"
                          />
                          <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                            ✓ Screenshot uploaded successfully
                          </p>
                          <button
                            type="button"
                            onClick={() => setPaymentProof(null)}
                            className="text-red-600 hover:text-red-700 text-sm font-semibold"
                          >
                            Remove and upload different image
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4 pointer-events-none" />
                          <p className="text-gray-600 dark:text-gray-400 mb-2 pointer-events-none">
                            Click to upload payment screenshot
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 pointer-events-none">
                            PNG, JPG up to 10MB
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required={!paymentProof}
                        tabIndex={-1}
                      />
                    </label>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Secure Payment</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400">
                          Your payment information is secure. We'll verify your payment and activate your subscriptions within 5-10 minutes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || !paymentProof}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing Order...' : `Complete Order - $${state.total.toFixed(2)}`}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {item.product.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <p className="text-sm font-semibold text-red-900 dark:text-red-300 mb-2">
                  Payment Details:
                </p>
                <p className="text-sm text-red-800 dark:text-red-400">
                  Send ${state.total.toFixed(2)} via Vodafone Cash to:
                </p>
                <p className="text-lg font-bold text-red-900 dark:text-red-300">
                  01021981265
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};