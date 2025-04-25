const loggedInEmail = localStorage.getItem('loggedInUser');
if (loggedInEmail !== 'admin@quiz.com') {
  window.location.href = 'index.html';
}

const users = JSON.parse(localStorage.getItem('users') || '[]');
const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');

const container = document.getElementById('userTableContainer');
const table = document.createElement('table');

const thead = document.createElement('thead');
const headRow = document.createElement('tr');
headRow.innerHTML = '<th>Email</th><th>Username</th>';

quizzes.forEach((q) => {
  const th = document.createElement('th');
  th.textContent = q.title;
  headRow.appendChild(th);
});

thead.appendChild(headRow);
table.appendChild(thead);

const tbody = document.createElement('tbody');

users.forEach((user) => {
  const row = document.createElement('tr');
  const tdEmail = document.createElement('td');
  tdEmail.textContent = user.email;
  const tdUsername = document.createElement('td');
  tdUsername.textContent = user.username || '-';

  row.appendChild(tdEmail);
  row.appendChild(tdUsername);

  quizzes.forEach((q) => {
    const tdScore = document.createElement('td');
    const score = user.scores[q.id];
    tdScore.textContent = score !== undefined ? score : '–';
    row.appendChild(tdScore);
  });

  tbody.appendChild(row);
});

table.appendChild(tbody);
container.appendChild(table);

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = '../index.html';
    });
  }
});
