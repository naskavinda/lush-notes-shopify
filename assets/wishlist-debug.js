// Wishlist debugging utilities
window.WishlistDebug = {
  // Test adding a product to wishlist
  addTestProduct: function() {
    const testProduct = {
      id: 'test-' + Date.now(),
      handle: 'test-product-' + Date.now(),
      title: 'Test Product ' + new Date().toLocaleTimeString(),
      image: '/assets/hero.png',
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
  }
};

console.log('🛠️ Wishlist Debug Tools Loaded!');
console.log('Use: WishlistDebug.addTestProduct(), WishlistDebug.clearWishlist(), WishlistDebug.checkWishlist(), WishlistDebug.testCount()');