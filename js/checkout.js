/**
 * STACKLY Food Truck - Checkout Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const checkoutItemsList = document.getElementById('checkoutItemsList');
  const checkoutSubtotalEl = document.getElementById('checkoutSubtotal');
  const checkoutTotalEl = document.getElementById('checkoutTotal');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  const cart = CartManager.getCart();

  if (cart.length === 0) {
    // If cart is empty, redirect to menu
    window.location.href = 'menu.html';
    return;
  }

  // Render Mini Order Summary
  if (checkoutItemsList) {
    checkoutItemsList.innerHTML = cart.map(item => `
      <div class="checkout-item-line">
        <span class="checkout-item-name">${item.name} <strong class="checkout-item-qty">×${item.qty}</strong></span>
        <span class="checkout-item-price">₹${item.price * item.qty}</span>
      </div>
    `).join('');
  }

  const subtotal = CartManager.getSubtotal();
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = `₹${subtotal}`;
  if (checkoutTotalEl) checkoutTotalEl.textContent = `₹${total}`;

  // Truck Stop Card selection
  const truckCards = document.querySelectorAll('.truck-radio-card');
  truckCards.forEach(card => {
    card.addEventListener('click', () => {
      truckCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Payment method selection
  const payCards = document.querySelectorAll('.payment-method-card');
  payCards.forEach(card => {
    card.addEventListener('click', () => {
      payCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // Place Order Action -> Validates details and directs to 404 page
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = document.getElementById('custName')?.value.trim();
      const phone = document.getElementById('custPhone')?.value.trim();
      const email = document.getElementById('custEmail')?.value.trim();

      if (!name) {
        showToast('Please enter your full name.', 'exclamation-circle');
        document.getElementById('custName')?.focus();
        return;
      }

      const phoneClean = phone ? phone.replace(/\D/g, '') : '';
      if (!phone || phoneClean.length !== 10) {
        showToast('Please enter a valid 10-digit mobile number.', 'exclamation-circle');
        document.getElementById('custPhone')?.focus();
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'exclamation-circle');
        document.getElementById('custEmail')?.focus();
        return;
      }

      // Direct to custom 404 page as requested
      window.location.href = '404.html';
    });
  }
});
