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
  fetch('http://localhost/quiz-app/apis/register.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      showMessage(
        'registerMessage',
        data.message,
        data.success ? 'success' : 'error'
      );
      if (data.success) event.target.reset();
    })
    .catch(() => {
      showMessage('registerMessage', 'Server error Try again later', 'error');
    });
}

function handleLogin(event) {
  event.preventDefault();

  const email = document
    .getElementById('loginEmail')
    .value.trim()
    .toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const adminEmail = 'admin@quiz.com';
  const adminPassword = 'admin123';

  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem('loggedInUser', email);
    window.location.href = './pages/dashboard.html';
    return;
  }

  fetch('http://localhost/quiz-app/apis/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      showMessage(
        'loginMessage',
        data.message,
        data.success ? 'success' : 'error'
      );
      if (data.success) {
        localStorage.setItem('loggedInUser', email);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);
        window.location.href = './pages/home.html';
      }
    })
    .catch(() => {
      showMessage('loginMessage', 'Server error try again later', 'error');
    });
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
