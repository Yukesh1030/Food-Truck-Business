/**
 * STACKLY Food Truck - Client-side Form Validation
 */

const FormValidator = {
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  },

  setFieldError(inputEl, message) {
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      let errorEl = group.querySelector('.form-error-msg');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error-msg';
        group.appendChild(errorEl);
      }
      errorEl.textContent = message;
    }
  },

  clearFieldError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      const errorEl = group.querySelector('.form-error-msg');
      if (errorEl) errorEl.textContent = '';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Generic validation for contact forms
  const contactForm = document.getElementById('generalContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasErrors = false;

      const nameEl = contactForm.querySelector('#contactName');
      const emailEl = contactForm.querySelector('#contactEmail');
      const phoneEl = contactForm.querySelector('#contactPhone');
      const msgEl = contactForm.querySelector('#contactMessage');

      if (nameEl) {
        if (!nameEl.value.trim()) {
          FormValidator.setFieldError(nameEl, 'Full name is required.');
          hasErrors = true;
        } else {
          FormValidator.clearFieldError(nameEl);
        }
      }

      if (emailEl) {
        if (!emailEl.value.trim() || !FormValidator.isValidEmail(emailEl.value.trim())) {
          FormValidator.setFieldError(emailEl, 'Valid email is required.');
          hasErrors = true;
        } else {
          FormValidator.clearFieldError(emailEl);
        }
      }

      if (phoneEl) {
        if (!phoneEl.value.trim() || !FormValidator.isValidPhone(phoneEl.value.trim())) {
          FormValidator.setFieldError(phoneEl, 'Valid 10-digit phone number is required.');
          hasErrors = true;
        } else {
          FormValidator.clearFieldError(phoneEl);
        }
      }

      if (msgEl) {
        if (!msgEl.value.trim() || msgEl.value.trim().length < 10) {
          FormValidator.setFieldError(msgEl, 'Message must be at least 10 characters.');
          hasErrors = true;
        } else {
          FormValidator.clearFieldError(msgEl);
        }
      }

      if (!hasErrors) {
        showToast('Your message has been sent to our street team! We will reply promptly.', 'paper-plane');
        contactForm.reset();
      }
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && FormValidator.isValidEmail(emailInput.value.trim())) {
        showToast('Subscribed! Welcome to the STACKLY Street Food Club.', 'envelope-circle-check');
        emailInput.value = '';
      } else {
        showToast('Please enter a valid email address.', 'exclamation-circle');
      }
    });
  }
});

