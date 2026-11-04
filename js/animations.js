/**
 * STACKLY Food Truck - GSAP & ScrollTrigger Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // If GSAP is not loaded or reduced motion is preferred, reveal all elements gracefully
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof gsap === 'undefined' || prefersReducedMotion) {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.headline-reveal-line').forEach(el => {
      el.classList.add('revealed');
    });
    document.querySelectorAll('.hero-bg-cover, .hero-subtext, .hero-actions-group, .hero-badge-wrap, .hero-badge').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const mm = gsap.matchMedia();

  // Desktop & Tablet Animations
  mm.add("(min-width: 769px)", () => {
    // 1. Universal Hero Entrance Sequence (Index, About, Menu, Locations, Contact)
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Background Image Cinematic Scale & Reveal
    if (document.querySelector('.hero-bg-cover')) {
      const isInnerPage = document.querySelector('.page-hero-section') !== null;
      const targetOpacity = isInnerPage ? 0.28 : 0.35;
      heroTl.fromTo('.hero-bg-cover', 
        { scale: 1.18, opacity: 0 }, 
        { scale: 1, opacity: targetOpacity, duration: 1.5, ease: "power2.out" }, 
        0
      );
    }

    // Badge / Special Label Drop-in
    const heroBadge = document.querySelector('.live-truck-badge, .hero-badge-wrap, .page-hero-section .hero-badge');
    if (heroBadge) {
      heroTl.fromTo('.live-truck-badge, .hero-badge-wrap, .page-hero-section .hero-badge', 
        { y: -24, opacity: 0, scale: 0.92 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "back.out(1.6)" }, 
        0.15
      );
    }

    // Headline Reveal Masks (Line-by-Line)
    if (document.querySelector('.headline-reveal-line')) {
      heroTl.fromTo('.headline-reveal-line', 
        { y: "115%", opacity: 0 }, 
        { y: "0%", opacity: 1, stagger: 0.16, duration: 1.1, ease: "power4.out" }, 
        0.3
      );
    }

    // Subtext Paragraph Smooth Fade-Up
    if (document.querySelector('.hero-subtext')) {
      heroTl.fromTo('.hero-subtext', 
        { y: 28, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 
        0.65
      );
    }

    // Hero Action Buttons Stagger
    if (document.querySelector('.hero-actions-group .btn')) {
      heroTl.fromTo('.hero-actions-group .btn', 
        { y: 22, opacity: 0, scale: 0.94 }, 
        { y: 0, opacity: 1, scale: 1, stagger: 0.14, duration: 0.8, ease: "back.out(1.4)" }, 
        0.85
      );
    }

    // Home Page Hero Floating Plate
    if (document.querySelector('.hero-food-plate-wrap')) {
      heroTl.fromTo('.hero-food-plate-wrap', 
        { scale: 0.72, rotation: -8, opacity: 0 }, 
        { scale: 1, rotation: 0, opacity: 1, duration: 1.3, ease: "back.out(1.4)" }, 
        0.5
      );
    }

    // Scroll Down Indicator
    if (document.querySelector('.scroll-indicator-wrap')) {
      heroTl.fromTo('.scroll-indicator-wrap', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
    }

    // 2. ScrollTrigger Stagger for Sections Across Pages
    if (typeof ScrollTrigger !== 'undefined') {
      // About Page: Our Story Intro Reveal
      if (document.querySelector('#ourStory')) {
        gsap.fromTo('#ourStory img',
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '#ourStory',
              start: 'top 80%'
            }
          }
        );
      }

      // Menu Page: Menu Controls & Categories Reveal
      if (document.querySelector('.menu-controls-bar')) {
        gsap.fromTo('.menu-controls-bar',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '#menuCategories',
              start: 'top 85%'
            }
          }
        );
      }

      // Locations Page: Live Truck Card Entrance
      if (document.querySelector('.live-truck-hero-card')) {
        gsap.fromTo('.live-truck-hero-card',
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '#currentLocation',
              start: 'top 80%'
            }
          }
        );
      }

      // Contact Page: Contact Info Columns Reveal
      if (document.querySelector('.contact-layout-grid')) {
        gsap.fromTo('.contact-info-col .contact-card-box',
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '#generalContact',
              start: 'top 80%'
            }
          }
        );
      }

      // Signature Street Eats
      const foodCards = document.querySelectorAll('.signature-eats-section .food-card');
      if (foodCards.length) {
        gsap.fromTo(foodCards, 
          { y: 60, opacity: 0 }, 
          {
            y: 0, 
            opacity: 1, 
            stagger: 0.15, 
            duration: 0.9, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: '.signature-eats-section',
              start: 'top 75%'
            }
          }
        );
      }

      // Fresh Ingredients Reveal
      const ingredientCards = document.querySelectorAll('.ingredient-feature-card');
      if (ingredientCards.length) {
        gsap.fromTo(ingredientCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '.ingredients-section',
              start: 'top 75%'
            }
          }
        );
      }

      // Combos & Special Deals
      const comboCards = document.querySelectorAll('.combo-deal-card');
      if (comboCards.length) {
        gsap.fromTo(comboCards,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.2,
            duration: 0.9,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: '.combos-section',
              start: 'top 75%'
            }
          }
        );
      }

      // Cooking Steps Stagger
      const prepSteps = document.querySelectorAll('.prep-step-card');
      if (prepSteps.length) {
        gsap.fromTo(prepSteps,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '.cooking-steps-section',
              start: 'top 75%'
            }
          }
        );
      }

      // Customer Reviews Cards
      const reviewCards = document.querySelectorAll('.review-slide-card');
      if (reviewCards.length) {
        gsap.fromTo(reviewCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            scrollTrigger: {
              trigger: '.reviews-section',
              start: 'top 75%'
            }
          }
        );
      }

      // Meet Crew Portraits
      const teamCards = document.querySelectorAll('.crew-member-card');
      if (teamCards.length) {
        gsap.fromTo(teamCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 0.8,
            scrollTrigger: {
              trigger: '.crew-section',
              start: 'top 75%'
            }
          }
        );
      }
    }
  });

  // Mobile Clean Animations (Lightweight, no heavy scrub)
  mm.add("(max-width: 768px)", () => {
    // Reveal all essential elements quickly without lagging mobile CPU
    if (document.querySelector('.hero-badge-wrap, .hero-badge, .live-truck-badge')) {
      gsap.fromTo('.hero-badge-wrap, .hero-badge, .live-truck-badge', 
        { opacity: 0, y: -14 }, 
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    gsap.fromTo('.hero-headline, .headline-reveal-line', 
      { opacity: 0, y: 18 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.75, delay: 0.1 }
    );

    gsap.fromTo('.hero-subtext', 
      { opacity: 0, y: 14 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.25 }
    );

    gsap.fromTo('.hero-actions-group', 
      { opacity: 0, y: 14 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.35 }
    );

    document.querySelectorAll('.food-card, .combo-deal-card, .ingredient-feature-card, .contact-card-box').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });

  // 3. Stat Counter Animations (For Story & Achievements)
  const initCounterAnimations = () => {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    const runCounter = (el) => {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      const target = parseFloat(el.dataset.target) || 0;
      const start = el.dataset.start !== undefined ? parseFloat(el.dataset.start) : 0;
      const duration = parseInt(el.dataset.duration, 10) || 2000;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals, 10) || 0;

      if (prefersReducedMotion) {
        const finalVal = decimals > 0 ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-IN');
        el.textContent = `${prefix}${finalVal}${suffix}`;
        return;
      }

      let startTime = null;
      // Exponential ease-out for smooth countdown / countup
      const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const updateCounter = (now) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);

        const currentVal = start + (target - start) * easedProgress;
        const formatted = decimals > 0 
          ? currentVal.toFixed(decimals) 
          : Math.round(currentVal).toLocaleString('en-IN');

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          const finalVal = decimals > 0 
            ? target.toFixed(decimals) 
            : Math.round(target).toLocaleString('en-IN');
          el.textContent = `${prefix}${finalVal}${suffix}`;
          el.classList.add('counter-completed');
        }
      };

      requestAnimationFrame(updateCounter);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });

      counters.forEach(c => observer.observe(c));
    } else {
      counters.forEach(runCounter);
    }
  };

  initCounterAnimations();
});
