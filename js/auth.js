/**
 * STACKLY Food Truck - Authentication Controller (Login & Signup)
 * Role-based redirection:
 *   Admin  -> AdminDashboard.html
 *   Client -> ClientDashboard.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. GSAP Entrance Animation for Auth Cards
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.auth-card-wrapper', 
      { opacity: 0, y: 30, scale: 0.96 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
    );
    gsap.fromTo('.auth-top-bar', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' }
    );
  }

  // 2. Password visibility toggles
  const pwdToggles = document.querySelectorAll('.pwd-toggle-btn');
  pwdToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          this.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
          input.type = 'password';
          this.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
      }
    });
  });

  // 3. Login Form Logic
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const roleSelect = document.getElementById('loginRole');
      const emailInput = document.getElementById('loginEmail');
      const pwdInput = document.getElementById('loginPassword');

      const role = roleSelect ? roleSelect.value : 'Client';
      const email = emailInput ? emailInput.value.trim() : '';
      const pwd = pwdInput ? pwdInput.value : '';

      let isValid = true;

      // Validate email
      if (!email || !FormValidator.isValidEmail(email)) {
        FormValidator.setFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        FormValidator.clearFieldError(emailInput);
      }

      // Validate password
      if (!pwd || pwd.length < 4) {
        FormValidator.setFieldError(pwdInput, 'Password must be at least 4 characters.');
        isValid = false;
      } else {
        FormValidator.clearFieldError(pwdInput);
      }

      if (!isValid) return;

      // Save user session in localStorage
      const userProfile = {
        name: email.split('@')[0],
        email: email,
        role: role.toLowerCase()
      };
      localStorage.setItem('stackly_user', JSON.stringify(userProfile));

      showToast(`Welcome back! Redirecting as ${role}...`, 'circle-check');

      // Role-based Redirection
      setTimeout(() => {
        if (role === 'Admin') {
          window.location.href = 'AdminDashboard.html';
        } else {
          window.location.href = 'ClientDashboard.html';
        }
      }, 800);
    });
  }

  // 4. Signup Form Logic
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const roleSelect = document.getElementById('signupRole');
      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const pwdInput = document.getElementById('signupPassword');

      const role = roleSelect ? roleSelect.value : 'Client';
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const pwd = pwdInput ? pwdInput.value : '';

      let isValid = true;

      if (!name || name.length < 2) {
        FormValidator.setFieldError(nameInput, 'Full name is required.');
        isValid = false;
      } else {
        FormValidator.clearFieldError(nameInput);
      }

      if (!email || !FormValidator.isValidEmail(email)) {
        FormValidator.setFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        FormValidator.clearFieldError(emailInput);
      }

      if (!pwd || pwd.length < 6) {
        FormValidator.setFieldError(pwdInput, 'Password must be at least 6 characters.');
        isValid = false;
      } else {
        FormValidator.clearFieldError(pwdInput);
      }

      if (!isValid) return;

      // Save new registration info
      const registeredUser = { name, email, role: role.toLowerCase() };
      localStorage.setItem('stackly_registered_user', JSON.stringify(registeredUser));

      showToast('Account created successfully! Please log in.', 'check-circle');

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    });
  }
});

