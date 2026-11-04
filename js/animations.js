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
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const mm = gsap.matchMedia();

  // Desktop & Tablet Animations
  mm.add("(min-width: 769px)", () => {
    // 1. Hero Entrance Sequence
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.0 } });

    if (document.querySelector('.hero-bg-cover')) {
      heroTl.fromTo('.hero-bg-cover', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 0.35, duration: 1.4 }, 0);
    }

    if (document.querySelector('.live-truck-badge')) {
      heroTl.fromTo('.live-truck-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2);
    }

    if (document.querySelector('.headline-reveal-line')) {
      heroTl.fromTo('.headline-reveal-line', 
        { y: "110%", opacity: 0 }, 
        { y: "0%", opacity: 1, stagger: 0.18, duration: 1.1, ease: "power4.out" }, 
        0.3
      );
    }

    if (document.querySelector('.hero-subtext')) {
      heroTl.fromTo('.hero-subtext', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7);
    }

    if (document.querySelector('.hero-actions-group')) {
      heroTl.fromTo('.hero-actions-group .btn', 
        { y: 25, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8 }, 
        0.9
      );
    }

    if (document.querySelector('.hero-food-plate-wrap')) {
      heroTl.fromTo('.hero-food-plate-wrap', 
        { scale: 0.7, rotation: -10, opacity: 0 }, 
        { scale: 1, rotation: 0, opacity: 1, duration: 1.3, ease: "back.out(1.4)" }, 
        0.5
      );
    }

    if (document.querySelector('.scroll-indicator-wrap')) {
      heroTl.fromTo('.scroll-indicator-wrap', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
    }

    // 2. ScrollTrigger Stagger for Food Cards
    if (typeof ScrollTrigger !== 'undefined') {
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
    gsap.fromTo('.hero-headline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
    gsap.fromTo('.hero-subtext', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo('.hero-actions-group', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });

    document.querySelectorAll('.food-card, .combo-deal-card, .ingredient-feature-card').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });
});

