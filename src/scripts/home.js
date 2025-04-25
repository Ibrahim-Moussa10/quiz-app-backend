document.addEventListener('DOMContentLoaded', function () {
  const quizzesListDiv = document.getElementById('quizList');
  console.log(quizzesListDiv);

  if (!quizzesListDiv) {
    console.error('quizList element not found!');
    return;
  }

  fetch('http://localhost/quiz-app/apis/getQuizzes.php')
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.quizzes.length > 0) {
        quizzesListDiv.innerHTML = '';

        data.quizzes.forEach((quiz) => {
          const quizElement = document.createElement('li');
          quizElement.classList.add('quiz-item');
          quizElement.dataset.quizId = quiz.id;
          quizElement.innerHTML = `
            <h3>${quiz.title}</h3>          `;
          quizzesListDiv.appendChild(quizElement);

          quizElement.addEventListener('click', function () {
            window.location.href = `quiz.html?quiz_id=${quiz.id}`;
          });
        });
      } else {
        quizzesListDiv.innerHTML = '<p>No quizzes available.</p>';
      }
    })
    .catch((error) => {
      console.error('Error loading quizzes:', error);
    });
});
document.getElementById('logoutBtn').addEventListener('click', function () {
  window.location.href = '../index.html';
});
