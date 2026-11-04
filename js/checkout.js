/**
 * STACKLY Food Truck - Checkout Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const checkoutItemsList = document.getElementById('checkoutItemsList');
  const checkoutSubtotalEl = document.getElementById('checkoutSubtotal');
  const checkoutTotalEl = document.getElementById('checkoutTotal');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const checkoutForm = document.getElementById('checkoutForm');

  const cart = CartManager.getCart();

  if (cart.length === 0) {
    // If cart is empty, redirect to menu
    window.location.href = 'menu.html';
    return;
  }

  // Render Mini Order Summary
  if (checkoutItemsList) {
    checkoutItemsList.innerHTML = cart.map(item => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;">
        <span>${item.name} <strong>x${item.qty}</strong></span>
        <span>₹${item.price * item.qty}</span>
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

  // Place Order Action
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = document.getElementById('custName')?.value.trim();
      const phone = document.getElementById('custPhone')?.value.trim();
      const email = document.getElementById('custEmail')?.value.trim();

      if (!name || !phone || !email) {
        showToast('Please fill in your name, phone and email.', 'exclamation-circle');
        return;
      }

      // Generate random order ID
      const orderId = 'STK-' + Math.floor(100000 + Math.random() * 900000);
      const selectedTruck = document.querySelector('input[name="pickupTruck"]:checked')?.value || 'Bengaluru - Koramangala Hub';

      const orderData = {
        orderId: orderId,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: cart,
        total: total,
        pickupLocation: selectedTruck,
        customer: { name, phone, email },
        status: 'Preparing on Grill'
      };

      localStorage.setItem('stackly_active_order', JSON.stringify(orderData));
      // Empty the cart
      localStorage.removeItem('stackly_cart');
      CartManager.updateBadges();

      showToast('Order confirmed! Redirecting to tracker...', 'check-circle');
      setTimeout(() => {
        window.location.href = `order-tracking.html?orderId=${orderId}`;
      }, 1200);
    });
  }
});

