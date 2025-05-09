/* 
Order Summary Page
Summary List: Repeat of cart items with final quantities and per-item totals
Cost Breakdown: Subtotal, tax, any discounts, Grand Total
Confirm / Cancel Controls: “Confirm Order” (→ payment) and “Back to Cart”
*/
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = ({ 
  cartItems = [//items in carts must be added here 
    {
      id: 1,
      title: "Punjab Warriors",
      price: 1299,
      quantity: 1,
      genre: "Action",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Truck Art Racer",
      price: 799,
      quantity: 2,
      genre: "Racing",
      image: "https://via.placeholder.com/150"
    }
  ], 
  onConfirmOrder = () => console.log("Order confirmed"), 
  onBackToCart = () => console.log("Back to cart")
}) => {
  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const discount = subtotal > 5000 ? subtotal * 0.1 : 0; // 10% discount if over 5000
  const grandTotal = subtotal + tax - discount;

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>
      <p className="order-summary-subtitle">Review your order before proceeding to payment</p>
      
      <div className="order-items-container">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="order-item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="order-item-details">
              <h3 className="order-item-title">{item.title}</h3>
              <p className="order-item-genre">{item.genre}</p>
            </div>
            <div className="order-item-pricing">
              <p className="order-item-quantity">Qty: {item.quantity}</p>
              <p className="order-item-price">Rs. {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="order-total-row">
          <span>Subtotal:</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="order-total-row">
          <span>Tax (5%):</span>
          <span>Rs. {tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="order-total-row discount">
            <span>Discount (10%):</span>
            <span>- Rs. {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="order-total-row grand-total">
          <span>Grand Total:</span>
          <span>Rs. {grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="order-actions">
        <button 
          onClick={onBackToCart} 
          className="back-to-cart-button"
        >
          Back to Cart
        </button>
        <Link to="/payment">
          <button 
            onClick={onConfirmOrder} 
            className="confirm-order-button"
          >
            Confirm Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;