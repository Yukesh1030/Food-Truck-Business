/**
 * STACKLY Food Truck - Client Dashboard Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Tab Switching (5 Menus)
  const navItems = document.querySelectorAll('.dash-sidebar .dash-nav-item');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');
  const sidebar = document.querySelector('.dash-sidebar');
  const menuToggle = document.querySelector('.dash-menu-toggle');
  const sidebarClose = document.querySelector('.dash-sidebar-close');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetTabId = item.dataset.tab;
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
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

  const clientOrders = document.getElementById('clientTotalOrders');
  const clientFavs = document.getElementById('clientFavItems');
  const clientActive = document.getElementById('clientActiveOrders');
  const clientEvents = document.getElementById('clientEventBookings');

  if (clientOrders) animateValue(clientOrders, 0, 18, 1000);
  if (clientFavs) animateValue(clientFavs, 0, 6, 800);
  if (clientActive) animateValue(clientActive, 0, 2, 600);
  if (clientEvents) animateValue(clientEvents, 0, 1, 600);

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

