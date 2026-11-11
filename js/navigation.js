/**
 * STACKLY Food Truck - Navigation & Sticky Header Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.querySelector('.hamburger-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Active Link Highlighter based on window.location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  mobileLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Sticky Scroll Behavior
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on load

  // Mobile Drawer Toggle
  const openMobileNav = () => {
    if (!mobileDrawer || !hamburgerBtn) return;
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('visible');
    if (window.StacklyScrollLock) {
      window.StacklyScrollLock.lock(mobileDrawer, 'nav-scroll-locked');
    } else {
      document.documentElement.classList.add('nav-scroll-locked');
      document.body.classList.add('nav-scroll-locked');
    }
  };

  const closeMobileNav = () => {
    if (!mobileDrawer || !hamburgerBtn) return;
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('visible');
    if (window.StacklyScrollLock) {
      window.StacklyScrollLock.unlock('nav-scroll-locked');
    } else {
      document.documentElement.classList.remove('nav-scroll-locked');
      document.body.classList.remove('nav-scroll-locked');
      document.body.style.overflow = '';
    }
  };

  // Close button inside the drawer
  const closeBtns = document.querySelectorAll('.mobile-drawer-close-btn, #mobileDrawerClose');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeMobileNav);
  });

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close drawer when clicking any link inside
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close drawer on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Unlock background scroll automatically if resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileNav();
    }
  });
});

