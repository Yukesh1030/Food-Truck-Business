/**
 * STACKLY Food Truck - Client Dashboard Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Tab Switching (All 5 Sub-Pages / Tabs)
  const navItems = document.querySelectorAll('.dash-sidebar .dash-nav-item');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');
  const sidebar = document.querySelector('.dash-sidebar');
  const menuToggle = document.querySelector('.dash-menu-toggle');
  const sidebarClose = document.querySelector('.dash-sidebar-close');
  const mainArea = document.querySelector('.dash-main-area');

  // Helper: Trigger In-Animation on a target pane
  const triggerTabInAnimation = (pane) => {
    if (!pane) return;
    pane.classList.remove('tab-animating-in');
    void pane.offsetWidth; // Force CSS reflow to re-trigger keyframe in-animations cleanly
    pane.classList.add('tab-animating-in');
  };

  // Trigger in-animation on initial active tab on page load
  const initialActivePane = document.querySelector('.dash-tab-pane.active');
  if (initialActivePane) {
    triggerTabInAnimation(initialActivePane);
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) return;

      navItems.forEach(i => i.classList.remove('active'));
      tabPanes.forEach(p => {
        p.classList.remove('active');
        p.classList.remove('tab-animating-in');
      });

      item.classList.add('active');
      const targetTabId = item.dataset.tab;
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
        triggerTabInAnimation(targetPane);

        // Smoothly scroll back to the top of the dashboard content area
        if (mainArea) {
          mainArea.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Re-animate KPI counters if returning to Client Dashboard Tab
        if (targetTabId === 'tab-client-dash') {
          runClientKpis();
        }
      }

      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('open');
      }
    });
  });

  // Mobile sidebar controls
  const sidebarOverlay = document.getElementById('dashSidebarOverlay');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (sidebar) sidebar.classList.add('open');
      if (sidebarOverlay) sidebarOverlay.classList.add('open');
    });
  }
  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('open');
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });
  }

  // Dynamic User Header Email
  const loadUserHeader = () => {
    try {
      const stored = localStorage.getItem('stackly_user') || localStorage.getItem('stackly_registered_user');
      let email = '';
      if (stored) {
        const u = JSON.parse(stored);
        if (u && u.email) email = u.email.trim();
      }
      if (!email) {
        email = 'client@stacklyfoodtruck.com';
      }

      const nameEls = document.querySelectorAll('.user-name-text');
      nameEls.forEach(el => {
        el.textContent = email;
        el.title = email;
      });

      const avatarEls = document.querySelectorAll('.user-avatar-circle');
      if (avatarEls.length > 0 && email) {
        const prefix = email.split('@')[0];
        const initials = prefix.length >= 2 ? prefix.substring(0, 2).toUpperCase() : email.substring(0, 2).toUpperCase();
        avatarEls.forEach(el => {
          el.textContent = initials;
          el.title = email;
        });
      }
    } catch (e) {
      console.warn('Could not parse user profile:', e);
    }
  };
  loadUserHeader();

  // Logout action
  const logoutBtns = document.querySelectorAll('.dash-logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.removeItem('stackly_user');
      window.location.href = 'login.html';
    });
  });

  // 2. Animated KPI Counters
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const runClientKpis = () => {
    const clientOrders = document.getElementById('clientTotalOrders');
    const clientFavs = document.getElementById('clientFavItems');
    const clientActive = document.getElementById('clientActiveOrders');
    const clientEvents = document.getElementById('clientEventBookings');

    if (clientOrders) animateValue(clientOrders, 0, 18, 900);
    if (clientFavs) animateValue(clientFavs, 0, 6, 700);
    if (clientActive) animateValue(clientActive, 0, 2, 600);
    if (clientEvents) animateValue(clientEvents, 0, 1, 600);
  };

  // Run on load
  runClientKpis();

  // Quick Reorder action
  window.quickReorder = (dishId) => {
    CartManager.addItem(dishId, 1);
    showToast('Re-order added to cart! Proceed to checkout.', 'cart-shopping');
  };

  // Support ticket demo
  const ticketForm = document.getElementById('clientSupportForm');
  if (ticketForm) {
    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Support ticket #TK-842 created. Our concierge will message you shortly.', 'headset');
      ticketForm.reset();
    });
  }
});
