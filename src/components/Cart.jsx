import React from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css';

const Cart = ({ cartItems, updateQuantity, removeFromCart, onContinueShopping }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + deliveryCharge + gst;

  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty">
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to see them here.</p>
        <button className="continue-shopping" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart ({cartItems.length} items)</h2>
        <button className="close-button" onClick={onContinueShopping}>
          <FaTimes />
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="item-image" />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p className="item-price">₹{item.price}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <FaPlus />
              </button>
            </div>
            <p className="item-total">₹{item.price * item.quantity}</p>
            <button 
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-summary">
          <div className="summary-item">
            <span>Subtotal:</span>
            <span className="amount">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Charge:</span>
            <span className="amount">
              {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}
              {deliveryCharge > 0 && (
                <small className="free-delivery-note">
                  Free delivery on orders above ₹500
                </small>
              )}
            </span>
          </div>
          <div className="summary-item">
            <span>GST (18%):</span>
            <span className="amount">₹{gst.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span className="total-amount">₹{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="cart-actions">
          <button className="continue-shopping" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-button">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
