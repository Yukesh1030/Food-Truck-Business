/**
 * STACKLY Food Truck - Cart Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTaxEl = document.getElementById('cartTax');
  const cartDiscountEl = document.getElementById('cartDiscount');
  const cartTotalEl = document.getElementById('cartTotal');
  const promoInput = document.getElementById('promoCodeInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const emptyCartState = document.getElementById('emptyCartState');
  const cartLayoutGrid = document.getElementById('cartLayoutGrid');

  let discountRate = 0;

  const renderCart = () => {
    const cart = CartManager.getCart();

    if (cart.length === 0) {
      if (cartLayoutGrid) cartLayoutGrid.style.display = 'none';
      if (emptyCartState) emptyCartState.style.display = 'block';
      return;
    }

    if (cartLayoutGrid) cartLayoutGrid.style.display = 'grid';
    if (emptyCartState) emptyCartState.style.display = 'none';

    if (cartItemsList) {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-unit-price">₹${item.price} each</span>
          </div>
          <div class="cart-item-controls">
            <div class="cart-qty-stepper">
              <button class="cart-qty-btn" type="button" onclick="CartManager.updateQty('${item.id}', -1); renderCart();" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-val">${item.qty}</span>
              <button class="cart-qty-btn" type="button" onclick="CartManager.updateQty('${item.id}', 1); renderCart();" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-total">
              <span class="cart-item-total-val">₹${item.price * item.qty}</span>
            </div>
            <button class="cart-item-remove-btn" type="button" title="Remove Item" onclick="CartManager.removeItem('${item.id}'); renderCart();" aria-label="Remove item">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    calculateTotals();
  };

  const calculateTotals = () => {
    const subtotal = CartManager.getSubtotal();
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const discount = Math.round(subtotal * discountRate);
    const total = Math.max(0, subtotal + tax - discount);

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
    if (cartTaxEl) cartTaxEl.textContent = `₹${tax}`;
    if (cartDiscountEl) cartDiscountEl.textContent = discount > 0 ? `-₹${discount}` : '₹0';
    if (cartTotalEl) cartTotalEl.textContent = `₹${total}`;
  };

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'STACKLY15' || code === 'FOODTRUCK') {
        discountRate = 0.15;
        showToast('Promo code applied! 15% discount granted.', 'tag');
        calculateTotals();
      } else {
        showToast('Invalid promo code. Try STACKLY15', 'exclamation-circle');
      }
    });
  }

  // Make renderCart available globally
  window.renderCart = renderCart;

  renderCart();
});
