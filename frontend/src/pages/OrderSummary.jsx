import React, { useState } from 'react';
import './OrderSummary.css';

const OrderSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const orderItems = [
    {
      id: 1,
      title: 'Punjab Warriors',
      genre: 'Action',
      quantity: 2,
      price: "1299.00",
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      title: 'Bazaar Tycoon',
      genre: "Simulation",
      quantity: 3,
      price: "849.00",
      image: 'https://via.placeholder.com/80',
    },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const discount = subtotal * 0.1;
  const tax = subtotal * 0.13;
  const total = subtotal - discount + tax;

  return (
    <div className="order-summary-container">
      <h1 className="order-summary-title">Order Summary</h1>
      <p className="order-summary-subtitle">Here’s a summary of your order.</p>

      <div className="order-items-container">
        {orderItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="order-item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="order-item-details">
              <div className="order-item-title">{item.title}</div>
              <div className="order-item-genre">{item.genre}</div>
            </div>
            <div className="order-item-pricing">
              <div className="order-item-quantity">Qty: {item.quantity}</div>
              <div className="order-item-price">Rs. {item.quantity * item.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="order-total-row">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(0)}</span>
        </div>
        <div className="order-total-row discount">
          <span>Discount (10%)</span>
          <span>- Rs. {discount.toFixed(0)}</span>
        </div>
        <div className="order-total-row">
          <span>Tax (13%)</span>
          <span>Rs. {tax.toFixed(0)}</span>
        </div>
        <div className="order-total-row grand-total">
          <span>Grand Total</span>
          <span>Rs. {total.toFixed(0)}</span>
        </div>
      </div>

      <div className="payment-method">
  <h2 className="payment-method-title">Select Payment Method:</h2>

  {[
    { id: 'credit', label: 'Credit Card', icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png' },
    { id: 'cod', label: 'Cash On Delivery', icon: null }, // No icon for COD
    { id: 'paypal', label: 'PayPal', icon: 'https://cdn-icons-png.flaticon.com/512/196/196565.png' },
    { id: 'gpay', label: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' },
  ].map((method) => (
    <div className="payment-option" key={method.id}>
      <input
        type="radio"
        id={method.id}
        name="paymentMethod"
        value={method.label}
        checked={paymentMethod === method.label}
        onChange={handlePaymentChange}
      />
      <label htmlFor={method.id}>
        {method.icon && <img src={method.icon} alt={method.label} />}
        {method.label}
      </label>
    </div>
  ))}
</div>


      <div className="order-actions">
        <button className="back-to-cart-button">Back to Cart</button>
        <button className="confirm-order-button">Confirm Order</button>
      </div>
    </div>
  );
};

export default OrderSummary;
