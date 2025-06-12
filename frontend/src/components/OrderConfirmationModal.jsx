import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
import { useCart } from '../CartContext';
import checkIcon from '../assets/icons/check.svg';
import './OrderConfirmationModal.css';

const OrderConfirmationModal = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure the modal is rendered before animation starts
      setTimeout(() => {
        setIsAnimating(true);
        // Focus the button for accessibility
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }, 50);
    } else {
      setIsAnimating(false);
      setShowConfetti(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isVisible) {
        if (onClose) onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  const handleBackToHome = () => {
    // Trigger confetti effect
    setShowConfetti(true);
    
    // Clear cart and navigate after a short delay to show confetti
    setTimeout(() => {
      clearCart();
      navigate('/home');
      if (onClose) onClose();
    }, 1000);
  };

  const handleOverlayClick = (e) => {
    // Close modal if clicking on overlay (not the modal content)
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Dark overlay */}
      <div 
        className="modal-overlay" 
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="modal-container"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={`modal-content ${isAnimating ? 'modal-animate-in' : ''}`}>
          {/* Check icon */}
          <div className="modal-icon-container">
            <div className="modal-check-icon" aria-hidden="true">
              <img src={checkIcon} alt="" className="check-image" />
            </div>
          </div>

          {/* Main text */}
          <h2 id="modal-title" className="modal-title">
            Your Order is confirmed
          </h2>

          {/* Subtext */}
          <p id="modal-description" className="modal-subtitle">
            You'll be notified of order updates via email
          </p>

          {/* Button */}
          <button
            ref={buttonRef}
            onClick={handleBackToHome}
            className="modal-button"
            aria-label="Go back to home page"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="confetti-container" aria-hidden="true">
          <ConfettiExplosion
            force={0.6}
            duration={2500}
            particleCount={80}
            width={1000}
            colors={['#88e5d5', '#4fd1c7', '#319795', '#2c7a7b', '#285e61', '#35A29F']}
          />
        </div>
      )}
    </>
  );
};

export default OrderConfirmationModal; 