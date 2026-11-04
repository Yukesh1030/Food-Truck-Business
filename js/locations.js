/**
 * STACKLY Food Truck - Locations & Schedule Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Weekly Schedule Tab switching
  const scheduleRows = document.querySelectorAll('.schedule-table tbody tr');
  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...

  // Map 0-6 to rows: Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=0
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Mon is 0th index in table
  const currentTableRowIndex = dayMap[todayIndex];

  if (scheduleRows[currentTableRowIndex]) {
    scheduleRows[currentTableRowIndex].classList.add('today-highlight');
  }

  // Pin Click Interaction on the Interactive Map
  const mapPins = document.querySelectorAll('.map-pin-marker');
  mapPins.forEach(pin => {
    pin.addEventListener('click', function() {
      const locationName = this.dataset.location || 'Food Truck Stop';
      showToast(`Selected: ${locationName}. Food truck is on schedule!`, 'map-pin');
    });
  });

  // Notification Subscribe Form
  const notifForm = document.getElementById('locationAlertForm');
  if (notifForm) {
    notifForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = notifForm.querySelector('input[type="tel"]') || notifForm.querySelector('input[type="email"]');
      if (phoneInput && phoneInput.value.trim()) {
        showToast('Subscribed! You will receive live GPS truck alerts.', 'bell');
        phoneInput.value = '';
      }
    });
  }
});

