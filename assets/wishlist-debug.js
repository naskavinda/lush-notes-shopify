// Wishlist debugging utilities
window.WishlistDebug = {
  // Test adding a product to wishlist
  addTestProduct: function() {
    const testProduct = {
      id: 'test-' + Date.now(),
      handle: 'test-product-' + Date.now(),
      title: 'Test Product ' + new Date().toLocaleTimeString(),
      image: '/assets/hero2.png',
      price: 2500,
      compare_at_price: 3000,
      available: true,
      variants: [{ id: 'variant-' + Date.now(), available: true, price: 2500 }],
      added_at: new Date().toISOString()
    };
    
    let wishlist = JSON.parse(localStorage.getItem('product-wishlist')) || [];
    wishlist.push(testProduct);
    localStorage.setItem('product-wishlist', JSON.stringify(wishlist));
    
    // Trigger update events
    window.dispatchEvent(new Event('wishlistUpdated'));
    if (window.updateWishlistCount) {
      window.updateWishlistCount();
    }
    
    console.log('✅ Added test product:', testProduct);
    console.log('📊 Total wishlist items:', wishlist.length);
    return testProduct;
  },
  
  // Clear wishlist
  clearWishlist: function() {
    localStorage.removeItem('product-wishlist');
    window.dispatchEvent(new Event('wishlistUpdated'));
    if (window.updateWishlistCount) {
      window.updateWishlistCount();
    }
    console.log('🗑️ Wishlist cleared');
  },
  
  // Check current wishlist
  checkWishlist: function() {
    const wishlist = JSON.parse(localStorage.getItem('product-wishlist')) || [];
    console.log('💝 Current wishlist:', wishlist);
    console.log('📊 Count:', wishlist.length);
    return wishlist;
  },
  
  // Test wishlist count update
  testCount: function() {
    const countElement = document.querySelector('.header__wishlist-count');
    console.log('🔍 Count element:', countElement);
    console.log('🔍 Current display:', countElement ? countElement.style.display : 'Element not found');
    console.log('🔍 Current text:', countElement ? countElement.textContent : 'Element not found');
    
    if (window.updateWishlistCount) {
      window.updateWishlistCount();
    }
  },

  // Convert old wishlist format to new format with product data
  upgradeWishlist: function() {
    const wishlist = JSON.parse(localStorage.getItem('product-wishlist')) || [];
    console.log('📦 Current wishlist format:', wishlist);
    
    if (wishlist.length > 0 && typeof wishlist[0] === 'string') {
      console.log('🔄 Converting old format to new format...');
      
      // Convert string IDs to rich product objects
      const upgradedWishlist = wishlist.map((id, index) => ({
        id: id,
        handle: `product-${id}`,
        title: `Product ${index + 1}`,
        image: '/assets/hero2.png?width=400&height=400',
        price: 2500,
        compare_at_price: 3000,
        available: true,
        variants: [{ id: `variant-${id}`, available: true, price: 2500 }],
        added_at: new Date().toISOString()
      }));
      
      localStorage.setItem('product-wishlist', JSON.stringify(upgradedWishlist));
      console.log('✅ Wishlist upgraded:', upgradedWishlist);
      
      // Trigger update
      window.dispatchEvent(new Event('wishlistUpdated'));
      return upgradedWishlist;
    } else {
      console.log('✅ Wishlist already in new format');
      return wishlist;
    }
  },

  // Force load wishlist page
  forceLoad: function() {
    console.log('🔄 Force loading wishlist...');
    
    // Try to initialize manager if not exists
    if (!window.wishlistManager && window.forceInitWishlist) {
      window.forceInitWishlist();
    }
    
    // Try to load products
    if (window.wishlistManager) {
      window.wishlistManager.loadWishlistProducts();
    } else {
      console.error('❌ Wishlist manager not available');
    }
  }
};

console.log('🛠️ Wishlist Debug Tools Loaded!');
console.log('Use: WishlistDebug.addTestProduct(), WishlistDebug.clearWishlist(), WishlistDebug.checkWishlist(), WishlistDebug.testCount()');