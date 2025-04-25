document.addEventListener('DOMContentLoaded', () => {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');

  loginTab.addEventListener('click', (event) => {
    switchTab('login', event);
  });

  registerTab.addEventListener('click', (event) => {
    switchTab('register', event);
  });

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  loginForm.addEventListener('submit', (event) => {
    handleLogin(event);
  });

  registerForm.addEventListener('submit', (event) => {
    handleRegister(event);
  });

  const loggedInEmail = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (loggedInEmail && users.find((user) => user.email === loggedInEmail)) {
    alert(`You are logged in as ${loggedInEmail}`);
  }
});
function switchTab(tabId, event) {
  document
    .querySelectorAll('.tab')
    .forEach((tab) => tab.classList.remove('active'));
  document
    .querySelectorAll('.form-container')
    .forEach((form) => form.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById('registerUsername').value;
  const email = document
    .getElementById('registerEmail')
    .value.trim()
    .toLowerCase();
  const password = document.getElementById('registerPassword').value;
  if (username.length < 3) {
    showMessage(
      'registerMessage',
      'Username must be at least 3 characters long.',
      'error'
    );
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage(
      'registerMessage',
      'Please enter a valid email address.',
      'error'
    );
    return;
  }
  if (password.length < 3) {
    showMessage(
      'registerMessage',
      'Password must be at least 3 characters long.',
      'error'
    );
    return;
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  if (users.find((user) => user.email === email)) {
    showMessage('registerMessage', 'Email already registered.', 'error');
    return;
  }

  users.push({ email, password, username, scores: {} });
  localStorage.setItem('users', JSON.stringify(users));
  showMessage('registerMessage', 'Registration successful!', 'success');
  event.target.reset();
}

function handleLogin(event) {
  event.preventDefault();

  const email = document
    .getElementById('loginEmail')
    .value.trim()
    .toLowerCase();
  const password = document.getElementById('loginPassword').value;

  console.log('Trying to login with:', email, password);

  const adminEmail = 'admin@quiz.com';
  const adminPassword = 'admin123';

  if (email === adminEmail && password === adminPassword) {
    console.log('Admin login successful');
    localStorage.setItem('loggedInUser', email);
    window.location.href = './pages/dashboard.html';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  console.log('Users from localStorage during login:', users);

  const user = users.find((user) => user.email === email);
  console.log('Found user:', user);

  if (user && user.password === password) {
    console.log('Password matches, login successful!');
    showMessage('loginMessage', `Welcome back, ${user.username}!`, 'success');
    localStorage.setItem('loggedInUser', email);

    window.location.href = './pages/home.html';
  } else {
    console.log('Invalid email or password');
    showMessage('loginMessage', 'Invalid email or password.', 'error');
  }

  event.target.reset();
}

function showMessage(id, text, type) {
  const messageDiv = document.getElementById(id);
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
}

window.addEventListener('DOMContentLoaded', () => {
  const loggedInEmail = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (loggedInEmail && users.find((user) => user.email === loggedInEmail)) {
    alert(`You are logged in as ${loggedInEmail}`);
  }
});
