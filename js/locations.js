/**
 * STACKLY Food Truck - Locations & Real-Time Google Map Controller
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

  // Real-Time Google Map Multi-City Data
  const fleetLocations = {
    bengaluru: {
      name: 'Bengaluru - Koramangala Hub',
      badge: 'TRUCK 01 · ACTIVE NOW',
      badgeClass: 'badge-yellow',
      hours: 'Open Till 11:30 PM',
      title: 'Bengaluru · Koramangala 5th Block',
      address: 'Sony World Signal, 80 Feet Road, Koramangala 5th Block, Bengaluru, Karnataka – 560095',
      phone: '+91 98400 12345',
      wait: '8-12 mins',
      mapUrl: 'https://maps.google.com/maps?q=Sony+World+Signal,+80+Feet+Road,+Koramangala+5th+Block,+Bengaluru,+Karnataka+560095&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sony+World+Signal+80+Feet+Road+Koramangala+5th+Block+Bengaluru'
    },
    hyderabad: {
      name: 'Hyderabad - Madhapur Tech Hub',
      badge: 'TRUCK 02 · ROLLING SCHEDULE',
      badgeClass: 'badge-yellow',
      hours: 'Open Till 11:00 PM',
      title: 'Hyderabad · Madhapur Tech Hub',
      address: 'Plot 459, 100 Feet Road, Ayyappa Society, Beside YSR Statue, Madhapur, Hyderabad – 500081',
      phone: '+91 98400 12346',
      wait: '10-15 mins',
      mapUrl: 'https://maps.google.com/maps?q=Plot+459,+100+Feet+Road,+Ayyappa+Society,+Madhapur,+Hyderabad,+Telangana+500081&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Plot+459+100+Feet+Road+Ayyappa+Society+Madhapur+Hyderabad'
    },
    chennai: {
      name: 'Chennai - Urapakkam Avenue',
      badge: 'TRUCK 03 · EVENING HUB',
      badgeClass: 'badge-yellow',
      hours: 'Open Till 10:30 PM',
      title: 'Chennai · Urapakkam Avenue',
      address: 'No.9 Ambika Complex, Gokulam Colony, Karanaipudhuchery Main Rd, Urapakkam, Chennai – 603210',
      phone: '+91 98400 12347',
      wait: '12-15 mins',
      mapUrl: 'https://maps.google.com/maps?q=No.9+Ambika+Complex,+Gokulam+Colony,+Urapakkam,+Chennai,+Tamil+Nadu+603210&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=No.9+Ambika+Complex+Gokulam+Colony+Urapakkam+Chennai'
    },
    coimbatore: {
      name: 'Coimbatore - PN Palayam Stop',
      badge: 'TRUCK 04 · WESTERN FLEET',
      badgeClass: 'badge-yellow',
      hours: 'Open Till 10:00 PM',
      title: 'Coimbatore · PN Palayam Stop',
      address: 'Stackly, 79 Aiswarya Complex, Nethaji Road, PN Palayam, Coimbatore – 641037',
      phone: '+91 98400 12348',
      wait: '8-10 mins',
      mapUrl: 'https://maps.google.com/maps?q=79+Aiswarya+Complex,+Nethaji+Road,+PN+Palayam,+Coimbatore,+Tamil+Nadu+641037&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=79+Aiswarya+Complex+Nethaji+Road+PN+Palayam+Coimbatore'
    }
  };

  const mapIframe = document.getElementById('googleMapIframe');
  const cityTabs = document.querySelectorAll('.map-city-tab-btn');
  const truckCard = document.getElementById('mapTruckCard');
  const truckBadge = document.getElementById('mapTruckBadge');
  const truckHours = document.getElementById('mapTruckHours');
  const truckTitle = document.getElementById('mapTruckTitle');
  const truckAddress = document.getElementById('mapTruckAddress');
  const truckPhone = document.getElementById('mapTruckPhone');
  const truckWait = document.getElementById('mapTruckWait');
  const directionsBtn = document.getElementById('mapDirectionsBtn');
  const liveStatusText = document.getElementById('mapLiveStatusText');

  cityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cityKey = tab.dataset.city;
      const data = fleetLocations[cityKey];
      if (!data) return;

      // Update active tab & indicator dot
      cityTabs.forEach(t => {
        t.classList.remove('active');
        const dot = t.querySelector('.pulse-indicator-dot');
        if (dot) dot.remove();
      });

      tab.classList.add('active');
      const pulseDot = document.createElement('span');
      pulseDot.className = 'pulse-indicator-dot';
      tab.prepend(pulseDot);

      // Card transition effect
      if (truckCard) {
        truckCard.style.opacity = '0';
        truckCard.style.transform = 'translateY(10px)';
      }

      setTimeout(() => {
        // Update Google Map iframe
        if (mapIframe && mapIframe.src !== data.mapUrl) {
          mapIframe.src = data.mapUrl;
        }

        // Update card content
        if (truckBadge) truckBadge.textContent = data.badge;
        if (truckHours) truckHours.textContent = data.hours;
        if (truckTitle) truckTitle.textContent = data.title;
        if (truckAddress) truckAddress.textContent = data.address;
        if (truckPhone) truckPhone.textContent = data.phone;
        if (truckWait) truckWait.textContent = data.wait;
        if (directionsBtn) directionsBtn.href = data.directionsUrl;
        if (liveStatusText) liveStatusText.textContent = `LIVE GPS SATELLITE FEED · ${cityKey.toUpperCase()}`;

        if (truckCard) {
          truckCard.style.opacity = '1';
          truckCard.style.transform = 'translateY(0)';
        }
      }, 180);

      if (typeof showToast === 'function') {
        showToast(`Map updated to ${data.title}`, 'map-pin');
      }
    });
  });

  // GSAP Entrance Animation for Map Frame if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo('.interactive-map-frame',
      { y: 35, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#interactiveMap',
          start: 'top 80%'
        }
      }
    );

    gsap.fromTo('.map-city-tabs-wrap button',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '#interactiveMap',
          start: 'top 85%'
        }
      }
    );
  }

  // #locationAlertForm validation and 404 redirect are handled in js/validation.js
});
