/**
 * STACKLY Food Truck - Admin Dashboard Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Chart instances for re-triggering animations on tab switch
  let salesChartInstance = null;
  let statusChartInstance = null;

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

        // Re-animate KPI counters and charts if returning to Operations Overview
        if (targetTabId === 'tab-overview') {
          runAdminKpis();
          if (salesChartInstance) {
            salesChartInstance.reset();
            salesChartInstance.update();
          }
          if (statusChartInstance) {
            statusChartInstance.reset();
            statusChartInstance.update();
          }
        }
      }

      // Close mobile sidebar if open
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
        email = 'admin@stacklyfoodtruck.com';
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
  const animateValue = (element, start, end, duration, prefix = '', suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const runAdminKpis = () => {
    const kpiOrders = document.getElementById('kpiOrders');
    const kpiRevenue = document.getElementById('kpiRevenue');
    const kpiItems = document.getElementById('kpiItems');
    const kpiPending = document.getElementById('kpiPending');

    if (kpiOrders) animateValue(kpiOrders, 0, 128, 900);
    if (kpiRevenue) animateValue(kpiRevenue, 0, 24850, 1100, '₹');
    if (kpiItems) animateValue(kpiItems, 0, 42, 800);
    if (kpiPending) animateValue(kpiPending, 0, 16, 700);
  };

  // Run on load
  runAdminKpis();

  // 3. Chart.js Initialization
  if (typeof Chart !== 'undefined') {
    // Sales Bar Chart
    const salesCanvas = document.getElementById('adminSalesChart');
    if (salesCanvas) {
      salesChartInstance = new Chart(salesCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Sales (₹)',
            data: [14200, 18500, 16900, 21400, 28900, 36500, 31200],
            backgroundColor: '#F4B323',
            borderRadius: 6,
            hoverBackgroundColor: '#d99c15'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(23, 23, 23, 0.06)' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    // Status Doughnut Chart
    const statusCanvas = document.getElementById('adminStatusChart');
    if (statusCanvas) {
      statusChartInstance = new Chart(statusCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Delivered', 'Preparing', 'Pending'],
          datasets: [{
            data: [94, 18, 16],
            backgroundColor: ['#2ecc71', '#F4B323', '#3498db'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          },
          cutout: '72%'
        }
      });
    }
  }

  // Quick Action Buttons
  window.openAddFoodModal = () => {
    showToast('Add Food Item Modal ready for new menu dish creation.', 'plus');
  };

  window.openUpdateLocationModal = () => {
    showToast('Truck GPS beacon updated to current spot.', 'location-dot');
  };
});
