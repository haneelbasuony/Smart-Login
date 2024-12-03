document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection');
  const signupSection = document.getElementById('signupSection');
  const welcomeSection = document.getElementById('welcomeSection');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  const loginAlert = document.getElementById('loginAlert');
  const signupAlert = document.getElementById('signupAlert');
  const logoutButton = document.getElementById('logoutButton');
  const navBar = document.getElementById('navBar');

  // Helper function to show alerts
  function showAlert(alertElement, message) {
    alertElement.textContent = message;
    alertElement.classList.remove('d-none');
  }

  // Helper function to hide alerts
  function hideAlert(alertElement) {
    alertElement.classList.add('d-none');
    alertElement.textContent = '';
  }

  // Login functionality
  loginButton.addEventListener('click', () => {
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPass').value.trim();

    if (!email || !password) {
      showAlert(loginAlert, 'Please fill in all fields.');
    } else {
      hideAlert(loginAlert);
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        loginSection.classList.add('d-none');
        welcomeSection.classList.remove('d-none');
        navBar.classList.remove('d-none');
        welcomeMessage.textContent = `Hello, ${user.name}!`;
      } else {
        showAlert(loginAlert, 'Invalid email or password.');
      }
    }
  });

  // Signup functionality
  signupButton.addEventListener('click', () => {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPass').value.trim();

    if (!name || !email || !password) {
      showAlert(signupAlert, 'Please fill in all fields.');
    } else {
      hideAlert(signupAlert);
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some((user) => user.email === email)) {
        showAlert(signupAlert, 'Email already registered. Please login.');
      } else {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showAlert(signupAlert, 'Account created successfully. Please login.');
        setTimeout(() => {
          signupSection.classList.add('d-none');
          loginSection.classList.remove('d-none');
        }, 2000);
      }
    }
  });

  // Logout functionality
  logoutButton.addEventListener('click', () => {
    welcomeSection.classList.add('d-none');
    loginSection.classList.remove('d-none');
    navBar.classList.add('d-none');
    clear();
    welcomeMessage.textContent = '';
  });

  // Toggle between sections
  document.getElementById('showSignUp').addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('d-none');
    signupSection.classList.remove('d-none');
  });

  document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    signupSection.classList.add('d-none');
    loginSection.classList.remove('d-none');
  });
});
function clear() {
  // Clear input fields
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputPass').value = '';
  document.getElementById('signupName').value = '';
  document.getElementById('signupEmail').value = '';
  document.getElementById('signupPass').value = '';
}
