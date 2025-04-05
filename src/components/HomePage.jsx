import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUserCircle, FaRobot, FaCartPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './HomePage.css';
import Profile from './Profile';
import Cart from './Cart';
import Assistant from './Assistant';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Sample video data - replace with your actual videos
  const videos = [
    {
      id: 1,
      title: "Local Rope Making",
      src: "/cloth.mp4",
      description: "Handcrafted ropes for daily use"
    },
    {
      id: 2,
      title: "Earthen Pots",
      src: "/pottery2.mp4",
      description: "Get Close to Nature"
    },
    {
      id: 3,
      title: "Wooden Art",
      src: "/wood1.mp4",
      description: "Nature's Beauty"
    },
    {
      id: 4,
      title: "Bamboo Works",
      src: "/banbooo.mp4",
      description: "Reject Plastic , Accept Bamboo"
    },
    {
      id: 5,
      title: "Indian Style Aesthetics",
      src: "/cloth3.mp4",
      description: "Indian Style Aesthetics"
    }
  ];

  // Sample products data
  const products = [
    {
      id: 1,
      title: "Handwoven Bamboo Basket",
      image: "/bamboo_basket.jpeg",
      description: "Eco-friendly bamboo basket, perfect for storage and decoration",
      price: 599
    },
    {
      id: 2,
      title: "Traditional Clay Water Pot",
      image: "/pot.jpg",
      description: "Natural cooling earthen pot for storing water",
      price: 399
    },
    {
      id: 3,
      title: "Handcrafted Wooden Bowl Set",
      image: "/bowl.jpeg",
      description: "Set of 4 beautifully carved wooden bowls",
      price: 899
    },
    {
      id: 4,
      title: "Natural Jute Shopping Bag",
      image: "/jute.jpg",
      description: "Eco-friendly and durable shopping bag made from natural jute",
      price: 299
    }
  ];
  
  // State to keep track of current video
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  
  // Sample product data for search suggestions
  const sampleProducts = [
    { id: 1, name: 'Handwoven Cotton Saree', category: 'Textiles', price: 2499 },
    { id: 2, name: 'Brass Decorative Pot', category: 'Handicrafts', price: 1299 },
    { id: 3, name: 'Organic Honey', category: 'Food Products', price: 449 },
    { id: 4, name: 'Bamboo Furniture Set', category: 'Home Decor', price: 7999 },
    { id: 5, name: 'Leather Handcrafted Wallet', category: 'Accessories', price: 899 },
    { id: 6, name: 'Clay Pottery Set', category: 'Handicrafts', price: 1599 },
    { id: 7, name: 'Handmade Paper Journal', category: 'Stationery', price: 349 },
    { id: 8, name: 'Organic Spices Gift Box', category: 'Food Products', price: 799 },
    { id: 9, name: 'Wooden Carved Showpiece', category: 'Home Decor', price: 1899 },
    { id: 10, name: 'Jute Tote Bag', category: 'Accessories', price: 599 }
  ];
  
  // Filter products based on search term
  const filteredProducts = sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Here you would normally redirect to search results page
    console.log('Searching for:', searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);
    setShowSuggestions(false);
    // Here you would normally redirect to the product page
    console.log('Selected product:', productName);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);
  
  // Reset all overlay states when clicking the logo
  const handleLogoClick = () => {
    setShowProfile(false);
    setShowCart(false);
    setShowAssistant(false);
  };
  
  // Navigation functions
  const goToPreviousVideo = () => {
    setCurrentVideoIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1));
  };
  
  const goToNextVideo = () => {
    setCurrentVideoIndex(prev => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleLogout = () => {
    // Add any logout logic here
    navigate('/');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <div className="logo">
            <Link to="/" className="logo-link" onClick={handleLogoClick}>
              <h1>Udhyam<span>Bharat</span></h1>
              <div className="logo-tagline">Empowering Rural India</div>
            </Link>
          </div>
        </div>

        <div className="header-center">
          <div className="search-container" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Search products, categories..." 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit"><FaSearch /></button>
            </form>
            {showSuggestions && filteredProducts.length > 0 && (
              <div className="search-suggestions">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product.name)}
                  >
                    <div className="suggestion-content">
                      <span className="suggestion-name">{product.name}</span>
                      <span className="suggestion-category">{product.category}</span>
                    </div>
                    <span className="suggestion-price">₹{product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          <nav className="nav-menu">
            <ul>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setShowProfile(!showProfile);
                  setShowCart(false);
                  setShowAssistant(false);
                }} className={showProfile ? 'active' : ''}>
                  <div className="nav-icon-container">
                    <FaUserCircle className="nav-icon" />
                    <span className="nav-tooltip">Profile</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setShowCart(!showCart);
                  setShowProfile(false);
                  setShowAssistant(false);
                }} className={showCart ? 'active' : ''}>
                  <div className="nav-icon-container">
                    <FaShoppingCart className="nav-icon" />
                    {cartItems.length > 0 && (
                      <span className="cart-count">{cartItems.length}</span>
                    )}
                    <span className="nav-tooltip">Cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setShowAssistant(!showAssistant);
                  setShowProfile(false);
                  setShowCart(false);
                }} className={showAssistant ? 'active' : ''}>
                  <div className="nav-icon-container">
                    <FaRobot className="nav-icon" />
                    <span className="nav-tooltip">Assistant</span>
                  </div>
                </a>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="home-content">
        {showCart ? (
          <Cart 
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onContinueShopping={() => setShowCart(false)}
          />
        ) : (
          <>
            {/* Video Section */}
            <section className="video-section">
              <div className="video-container">
                <button className="video-nav-btn prev" onClick={goToPreviousVideo}>
                  <FaArrowLeft />
                </button>
                
                <div className="video-player">
                  {videos[currentVideoIndex].src.includes('youtube.com') ? (
                    <iframe 
                      src={videos[currentVideoIndex].src} 
                      title={videos[currentVideoIndex].title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  ) : (
                    <video 
                      src={videos[currentVideoIndex].src} 
                      title={videos[currentVideoIndex].title}
                      autoPlay
                      muted
                      loop
                      playsInline>
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="video-info">
                    <h3>{videos[currentVideoIndex].title}</h3>
                    <p>{videos[currentVideoIndex].description}</p>
                  </div>
                </div>
                
                <button className="video-nav-btn next" onClick={goToNextVideo}>
                  <FaArrowRight />
                </button>
              </div>
            </section>

            <section className="welcome-section">
              <h2>Welcome to UdhyamBharat, sushean.11!</h2>
              <p>Empower the village economy — buy and sell organic products, connect with local artisans, and grow together with our platform built to support rural entrepreneurs across India.</p>
            </section>

            <section className="marketplace-section">
              <h2>Featured Products</h2>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-description">{product.description}</p>
                      <p className="product-price">₹{product.price}</p>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <FaCartPlus /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="home-footer">
        <div className="footer-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--indian-green)"></path>
          </svg>
        </div>
        <div className="footer-content">
          <div className="footer-section about">
            <div className="footer-logo">
              <h2>UdhyamBharat</h2>
              <span className="tagline">Empowering Rural India</span>
            </div>
            <p>Connecting artisans, farmers, and rural entrepreneurs with the global marketplace. Join us in building a stronger, self-reliant India.</p>
            <div className="social-links">
              <a href="#facebook" className="social-link"><i className="fab fa-facebook"></i></a>
              <a href="#twitter" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#instagram" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#linkedin" className="social-link"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <div className="link-columns">
              <ul>
                <li><a href="#marketplace">Marketplace</a></li>
                <li><a href="#sellers">Become a Seller</a></li>
                <li><a href="#support">Support Center</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
              <ul>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
                <li><a href="#impact">Our Impact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-section categories">
            <h3>Shop by Category</h3>
            <ul>
              <li><a href="#handicrafts"><span className="category-icon">🎨</span>Handicrafts</a></li>
              <li><a href="#textiles"><span className="category-icon">🧵</span>Textiles</a></li>
              <li><a href="#agriculture"><span className="category-icon">🌾</span>Agriculture</a></li>
              <li><a href="#food"><span className="category-icon">🍱</span>Food Products</a></li>
              <li><a href="#wellness"><span className="category-icon">🌿</span>Wellness</a></li>
              <li><a href="#art"><span className="category-icon">🎭</span>Art & Culture</a></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Get in Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>support@udhyambharat.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+91 123-456-7890</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
            <div className="newsletter">
              <h4>Subscribe to Newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; 2023 UdhyamBharat. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="#terms">Terms of Service</a>
              <span className="separator">•</span>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
          <div className="made-with-love">
            Made with <span className="heart">❤️</span> in India
          </div>
        </div>
      </footer>

      <Profile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <Assistant isOpen={showAssistant} onClose={() => setShowAssistant(false)} />
    </div>
  );
};

export default HomePage;
