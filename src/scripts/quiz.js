const params = new URLSearchParams(window.location.search);
const quizId = parseInt(params.get('id'));
const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
const quiz = quizzes.find((q) => q.id === quizId);

if (!quiz) {
  document.getElementById('quizTitle').textContent = 'Quiz not found!';
} else {
  document.getElementById('quizTitle').textContent = quiz.title;
  displayQuiz(quiz);
}

function displayQuiz(quiz) {
  const container = document.getElementById('quizContainer');
  quiz.questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question-block');
    const questionEl = document.createElement('p');
    questionEl.textContent = `${index + 1}. ${q.question}`;
    div.appendChild(questionEl);
    q.answers.forEach((answer, i) => {
      const label = document.createElement('label');
      label.classList.add('answer-label');
      label.innerHTML = `<div>${answer}</div> 
                        <input type="radio" name="q${index}" value="${i}"> `;
      div.appendChild(label);
    });
    container.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;

  const loggedInEmail = localStorage.getItem('loggedInUser');
  if (!loggedInEmail) {
    alert('You need to be logged in to submit the quiz!');
    return;
  }

  quiz.questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.correctAnswer) {
      score++;
    }
  });

  showResultAlert(`You scored ${score} out of ${quiz.questions.length}`)

  saveUserScore(loggedInEmail, quiz.id, score);

}

function saveUserScore(email, quizId, score) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((user) => user.email === email);

  if (user) {
    user.scores[quizId] = score;
  } else {
    const newUser = {
      email: email,
      username: email,
      password: '',
      scores: { [quizId]: score },
    };
    users.push(newUser);
  }

  localStorage.setItem('users', JSON.stringify(users));
}
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitQuiz);
  }
});


function showResultAlert(msg) {
  const resultDiv = document.getElementById('result');
  resultDiv.children[0].children[0].innerHTML = msg;
  resultDiv.classList.toggle('show');
}

document.getElementById('homeBtn').addEventListener('click', () => {
  window.location.href = 'home.html';
  const resultDiv = document.getElementById('result');
  resultDiv.classList.toggle('show');
} );