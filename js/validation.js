/**
 * STACKLY Food Truck - Strict Client-side Form Validation & 404 Submission Direct
 */

const FormValidator = {
  // Strict RFC-compliant email regex
  isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim());
  },

  // Strict 10-digit phone number check
  isValidPhone(phone) {
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length === 10;
  },

  // Name check: at least 2 alphabetic characters
  isValidName(name) {
    const trimmed = String(name).trim();
    return trimmed.length >= 2 && /^[a-zA-Z\s.'-]+$/.test(trimmed);
  },

  // Message check: at least 10 characters
  isValidMessage(msg) {
    return String(msg).trim().length >= 10;
  },

  setFieldError(inputEl, message) {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
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
      errorEl.style.display = 'block';
    } else {
      inputEl.style.borderColor = '#e74c3c';
      inputEl.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.25)';
    }
  },

  clearFieldError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      const errorEl = group.querySelector('.form-error-msg');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    } else {
      inputEl.style.borderColor = '';
      inputEl.style.boxShadow = '';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Do NOT attach 404 redirect handlers on Login or Signup pages:
  // They must preserve their respective authentication and role-based redirect functions.
  const isAuthPage = window.location.pathname.endsWith('login.html') || 
                     window.location.pathname.endsWith('signup.html');
  if (isAuthPage) return;

  // 1. Contact Form on contact.html
  const contactForm = document.getElementById('generalContactForm');
  if (contactForm) {
    const nameEl = contactForm.querySelector('#contactName');
    const emailEl = contactForm.querySelector('#contactEmail');
    const phoneEl = contactForm.querySelector('#contactPhone');
    const msgEl = contactForm.querySelector('#contactMessage');

    // Real-time error clearing on input
    [nameEl, emailEl, phoneEl, msgEl].forEach(input => {
      if (input) {
        input.addEventListener('input', () => FormValidator.clearFieldError(input));
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasErrors = false;
      let firstErrorEl = null;

      // Validate Name
      if (!nameEl || !nameEl.value.trim()) {
        FormValidator.setFieldError(nameEl, 'Full name is required.');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = nameEl;
      } else if (!FormValidator.isValidName(nameEl.value)) {
        FormValidator.setFieldError(nameEl, 'Please enter a valid full name (letters only).');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = nameEl;
      } else {
        FormValidator.clearFieldError(nameEl);
      }

      // Validate Email
      if (!emailEl || !emailEl.value.trim()) {
        FormValidator.setFieldError(emailEl, 'Email address is required.');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = emailEl;
      } else if (!FormValidator.isValidEmail(emailEl.value)) {
        FormValidator.setFieldError(emailEl, 'Please enter a valid email (e.g. name@domain.com).');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = emailEl;
      } else {
        FormValidator.clearFieldError(emailEl);
      }

      // Validate Phone
      if (!phoneEl || !phoneEl.value.trim()) {
        FormValidator.setFieldError(phoneEl, 'Phone number is required.');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = phoneEl;
      } else if (!FormValidator.isValidPhone(phoneEl.value)) {
        FormValidator.setFieldError(phoneEl, 'Please enter a valid 10-digit mobile number.');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = phoneEl;
      } else {
        FormValidator.clearFieldError(phoneEl);
      }

      // Validate Message
      if (!msgEl || !msgEl.value.trim()) {
        FormValidator.setFieldError(msgEl, 'Message is required.');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = msgEl;
      } else if (!FormValidator.isValidMessage(msgEl.value)) {
        FormValidator.setFieldError(msgEl, 'Message must be at least 10 characters long.');
        hasErrors = true;
        if (!firstErrorEl) firstErrorEl = msgEl;
      } else {
        FormValidator.clearFieldError(msgEl);
      }

      if (hasErrors) {
        if (typeof showToast === 'function') {
          showToast('Please correct the highlighted form errors.', 'triangle-exclamation');
        }
        if (firstErrorEl) firstErrorEl.focus();
        return;
      }

      // On valid submission -> Direct to custom 404 page
      window.location.href = '404.html';
    });
  }

  // 2. Newsletter Form on index.html (and any other pages)
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', () => FormValidator.clearFieldError(emailInput));
    }

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput || !emailInput.value.trim()) {
        FormValidator.setFieldError(emailInput, 'Email address is required.');
        if (typeof showToast === 'function') {
          showToast('Please enter an email address to subscribe.', 'triangle-exclamation');
        }
        emailInput.focus();
        return;
      }

      if (!FormValidator.isValidEmail(emailInput.value.trim())) {
        FormValidator.setFieldError(emailInput, 'Please enter a valid email (e.g. name@domain.com).');
        if (typeof showToast === 'function') {
          showToast('Please enter a valid email address.', 'triangle-exclamation');
        }
        emailInput.focus();
        return;
      }

      // On valid submission -> Direct to custom 404 page
      window.location.href = '404.html';
    });
  }

  // 3. Location GPS Alerts Form on locations.html
  const locationAlertForm = document.getElementById('locationAlertForm');
  if (locationAlertForm) {
    const telInput = locationAlertForm.querySelector('input[type="tel"]') || locationAlertForm.querySelector('input');
    if (telInput) {
      telInput.addEventListener('input', () => FormValidator.clearFieldError(telInput));
    }

    locationAlertForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!telInput || !telInput.value.trim()) {
        FormValidator.setFieldError(telInput, 'Mobile number is required.');
        if (typeof showToast === 'function') {
          showToast('Please enter your 10-digit mobile number.', 'triangle-exclamation');
        }
        telInput.focus();
        return;
      }

      if (!FormValidator.isValidPhone(telInput.value.trim())) {
        FormValidator.setFieldError(telInput, 'Please enter a valid 10-digit mobile number.');
        if (typeof showToast === 'function') {
          showToast('Invalid phone: must be exactly 10 digits.', 'triangle-exclamation');
        }
        telInput.focus();
        return;
      }

      // On valid submission -> Direct to custom 404 page
      window.location.href = '404.html';
    });
  }

  // 4. Universal Form Fallback (for any other form on Home, About, Menu, Locations, Contact)
  document.querySelectorAll('form').forEach(form => {
    // Avoid double attaching if already handled, and never attach to auth forms
    if (
      form.id === 'generalContactForm' || 
      form.id === 'newsletterForm' || 
      form.id === 'locationAlertForm' ||
      form.id === 'loginForm' || 
      form.id === 'signupForm'
    ) {
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasErrors = false;
      const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          FormValidator.setFieldError(input, 'This field is required.');
          hasErrors = true;
        } else if (input.type === 'email' && !FormValidator.isValidEmail(input.value)) {
          FormValidator.setFieldError(input, 'Please enter a valid email.');
          hasErrors = true;
        } else if (input.type === 'tel' && !FormValidator.isValidPhone(input.value)) {
          FormValidator.setFieldError(input, 'Please enter a valid 10-digit phone.');
          hasErrors = true;
        } else {
          FormValidator.clearFieldError(input);
        }
      });

      if (hasErrors) {
        if (typeof showToast === 'function') {
          showToast('Please fill out all required fields correctly.', 'triangle-exclamation');
        }
        return;
      }

      // On valid submission -> Direct to custom 404 page
      window.location.href = '404.html';
    });
  });
});
