/**
 * STACKLY Food Truck - Admin Dashboard Controller
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

  const kpiOrders = document.getElementById('kpiOrders');
  const kpiRevenue = document.getElementById('kpiRevenue');
  const kpiItems = document.getElementById('kpiItems');
  const kpiPending = document.getElementById('kpiPending');

  if (kpiOrders) animateValue(kpiOrders, 0, 128, 1200);
  if (kpiRevenue) animateValue(kpiRevenue, 0, 24850, 1400, '₹');
  if (kpiItems) animateValue(kpiItems, 0, 42, 1000);
  if (kpiPending) animateValue(kpiPending, 0, 16, 900);

  // 3. Chart.js Initialization
  if (typeof Chart !== 'undefined') {
    // Sales Bar Chart
    const salesCanvas = document.getElementById('adminSalesChart');
    if (salesCanvas) {
      new Chart(salesCanvas.getContext('2d'), {
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
      new Chart(statusCanvas.getContext('2d'), {
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

