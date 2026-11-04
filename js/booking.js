/**
 * STACKLY Food Truck - Event Booking & Catering Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  const guestSlider = document.getElementById('guestCountSlider');
  const guestDisplay = document.getElementById('guestCountDisplay');
  const packageCards = document.querySelectorAll('.package-card');
  const estGuestsEl = document.getElementById('estGuests');
  const estPackageEl = document.getElementById('estPackage');
  const estTotalEl = document.getElementById('estTotal');
  const bookingForm = document.getElementById('eventBookingForm');

  let selectedRate = 450; // default per guest rate
  let selectedPackageName = 'Street Classic';
  let guestCount = 100;

  const updateCalculations = () => {
    if (guestDisplay) guestDisplay.textContent = `${guestCount} Guests`;
    if (estGuestsEl) estGuestsEl.textContent = `${guestCount} People`;
    if (estPackageEl) estPackageEl.textContent = selectedPackageName;

    const baseCost = guestCount * selectedRate;
    const truckOpsFee = 4500; // Base fuel & kitchen setup
    const total = baseCost + truckOpsFee;

    if (estTotalEl) estTotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  };

  if (guestSlider) {
    guestSlider.addEventListener('input', (e) => {
      guestCount = parseInt(e.target.value, 10);
      updateCalculations();
    });
  }

  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      packageCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRate = parseInt(card.dataset.rate, 10) || 450;
      selectedPackageName = card.dataset.name || 'Custom Package';
      updateCalculations();
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookName')?.value.trim();
      const email = document.getElementById('bookEmail')?.value.trim();
      const phone = document.getElementById('bookPhone')?.value.trim();
      const date = document.getElementById('bookDate')?.value;
      const city = document.getElementById('bookCity')?.value;

      if (!name || !email || !phone || !date || !city) {
        showToast('Please fill in all required event details.', 'exclamation-circle');
        return;
      }

      showToast(`Booking inquiry received for ${guestCount} guests! Our catering manager will contact you within 2 hours.`, 'check-circle');
      bookingForm.reset();
      updateCalculations();
    });
  }

  updateCalculations();
});

