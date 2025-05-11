import React, { useState } from 'react';
import creditCard from '../assets/icons/credit-card.svg'
import cash from '../assets/icons/cash.svg'
import './OrderSummary.css';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const OrderSummary = () => {
  const { user, login, logout } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Calculate order summary values from cart
  const subtotal = cart.reduce((acc, item) => acc + (item.quantity || 1) * (typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0), 0);
  const discount = subtotal * 0.1;
  const tax = subtotal * 0.13;
  const total = subtotal - discount + tax;

  return (
    <div className="bg-navy-100 p-24">
    <div className="order-summary-container flex items-center flex-col w-full justify-between bg-slate-900 py-24 h-fit">
      <h1 className="order-summary-title text-white">Order Summary</h1>
      <p className="order-summary-subtitle text-gray-400">Here's a summary of your order.</p>

      <div className="order-items-container max-w-3xl w-full">
        {cart.map((item) => (
          <div key={item.game_id} className="order-item bg-navy-90 shadow-lg">
            <div className="order-item-image">
              <img src={item.image_url} alt={item.title} />
            </div>
            <div className="order-item-details">
              <div className="order-item-title text-navy-10">{item.title}</div>
              <div className="order-item-genre text-gray-400">{item.genre}</div>
            </div>
            <div className="order-item-pricing">
              <div className="order-item-quantity text-gray-400">Qty: {item.quantity}</div>
              <div className="order-item-price text-teal-10">Rs. {(item.quantity || 1) * (typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-details-container flex gap-4 max-w-3xl w-full">
        <div className="order-totals w-1/2 bg-navy-90">
          <div className="order-total-row">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">Rs. {subtotal.toFixed(0)}</span>
          </div>
          <div className="order-total-row discount">
            <span className="text-red-400">Discount (10%)</span>
            <span className="text-red-400">- Rs. {discount.toFixed(0)}</span>
          </div>
          <div className="order-total-row">
            <span className="text-gray-400">Tax (13%)</span>
            <span className="text-white">Rs. {tax.toFixed(0)}</span>
          </div>
          <div className="order-total-row grand-total">
            <span className="text-gray-400">Grand Total</span>
            <span className="text-teal-10">Rs. {total.toFixed(0)}</span>
          </div>
        </div>

        <div className="shipping-info w-1/2 bg-navy-90">
          <h2 className="shipping-info-title text-white">Shipping Information</h2>
          <div className="shipping-details">
            <div className="shipping-detail-row">
              <span className="detail-label text-gray-400">Name:</span>
              <span className="detail-value text-white">{user?.full_name || user?.username || 'N/A'}</span>
            </div>
            <div className="shipping-detail-row">
              <span className="detail-label text-gray-400">Phone:</span>
              <span className="detail-value text-white">{user?.phone || 'N/A'}</span>
            </div>
            <div className="shipping-detail-row">
              <span className="detail-label text-gray-400">Address:</span>
              <span className="detail-value text-white text-right">{user?.address || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-method max-w-3xl w-full bg-navy-90">
        <h2 className="payment-method-title text-white text-left">Select Payment Method:</h2>

        {[
          { id: 'credit', label: 'Credit Card', icon: creditCard },
          { id: 'paypal', label: 'PayPal', icon: 'https://cdn-icons-png.flaticon.com/512/196/196565.png' },
          { id: 'gpay', label: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' },
          { id: 'cod', label: 'Cash On Delivery', icon: cash }
        ].map((method) => (
          <div className="payment-option" key={method.id}>
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.label}
              checked={paymentMethod === method.label}
              onChange={handlePaymentChange}
              className="text-teal-90"
            />
            <label htmlFor={method.id} className="flex items-center gap-2 text-white">
              {method.icon && <img src={method.icon} alt={method.label} />}
              {method.label}
            </label>
          </div>
        ))}
      </div>

      <div className="order-actions flex justify-between w-full max-w-3xl">
        <button onClick={() => navigate('/cart')} className="back-to-cart-button bg-navy-90 text-white hover:bg-navy-40">Back to Cart</button>
        <button className="confirm-order-button bg-teal-90 text-white hover:bg-navy-50">Confirm Order</button>
      </div>
    </div>
    </div>
  );
};

export default OrderSummary;
