document.addEventListener('DOMContentLoaded', function () {
  const quizId = new URLSearchParams(window.location.search).get('quiz_id');
  if (!quizId) return;

  fetch(`http://localhost/quiz-app/apis/getQuestions.php?quiz_id=${quizId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.questions.length > 0) {
        const quizContainer = document.getElementById('quizContainer');
        quizContainer.innerHTML = '';

        data.questions.forEach((question, index) => {
          const questionElement = document.createElement('div');
          questionElement.classList.add('question');

          const questionTitle = document.createElement('h3');
          questionTitle.textContent = `${index + 1}. ${question.question_text}`;
          questionElement.appendChild(questionTitle);

          if (question.options && Array.isArray(question.options)) {
            question.options.forEach((option, optionIndex) => {
              const label = document.createElement('label');
              const input = document.createElement('input');
              input.type = 'radio';
              input.name = `question-${index}`;
              input.value = optionIndex;

              label.appendChild(input);
              label.appendChild(document.createTextNode(option));
              questionElement.appendChild(label);
              questionElement.appendChild(document.createElement('br'));
            });
          } else {
            questionElement.appendChild(
              document.createTextNode('No options available.')
            );
          }

          quizContainer.appendChild(questionElement);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        quizContainer.appendChild(submitButton);

        submitButton.addEventListener('click', function () {
          let score = 0;

          data.questions.forEach((question, index) => {
            const selectedOption = document.querySelector(
              `input[name="question-${index}"]:checked`
            );

            if (selectedOption) {
              const correctOptionIndex = ['A', 'B', 'C', 'D'].indexOf(
                question.correct_option
              );

              if (parseInt(selectedOption.value) === correctOptionIndex) {
                score++;
              }
            }
          });

          const userId = localStorage.getItem('user_id');

          fetch('http://localhost/quiz-app/apis/saveScore.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userId,
              quiz_id: quizId,
              score: score,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                alert('Your score has been saved!');
                setTimeout(() => {
                  window.location.href = 'home.html';
                }, 1000);
              } else {
                alert('Error saving score');
              }
            });
        });
      } else {
        document.getElementById('quizContainer').innerHTML =
          '<p>No questions available.</p>';
      }
    })
    .catch((error) => {
      console.error('Error fetching quiz data:', error);
    });
});
