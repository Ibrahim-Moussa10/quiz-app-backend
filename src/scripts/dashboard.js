document
  .getElementById('showUserDataBtn')
  .addEventListener('click', function () {
    const userTableBody = document.querySelector('#userTable tbody');

    fetch('http://localhost/quiz-app/apis/getUser.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.users && data.users.length > 0) {
          userTableBody.innerHTML = '';
          data.users.forEach((user) => {
            const tr = document.createElement('tr');

            const usernameTd = document.createElement('td');
            usernameTd.textContent = user.username;
            tr.appendChild(usernameTd);

            const emailTd = document.createElement('td');
            emailTd.textContent = user.email;
            tr.appendChild(emailTd);

            const scoreTd = document.createElement('td');
            scoreTd.textContent = user.total_score || 0;
            tr.appendChild(scoreTd);

            userTableBody.appendChild(tr);
          });
        } else {
          alert('No user data found or there was an error fetching the data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
document
  .getElementById('showQuizzesBtn')
  .addEventListener('click', function () {
    const quizList = document.getElementById('quizList');
    if (quizList.style.display === 'none') {
      fetch('http://localhost/quiz-app/apis/getQuizzes.php')
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            quizList.innerHTML = '';
            data.quizzes.forEach((quiz) => {
              const li = document.createElement('li');
              li.textContent = quiz.title;
              quizList.appendChild(li);
            });
            quizList.style.display = 'block';
          } else {
            alert('Error fetching quizzes: ' + data.error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      quizList.style.display = 'none';
    }
  });

document.getElementById('logoutBtn').addEventListener('click', function () {
  window.location.href = '../index.html';
});

document.getElementById('logoutBtn').addEventListener('click', function () {
  window.location.href = '../index.html';
});

document
  .getElementById('showQuizzesBtn')
  .addEventListener('click', function () {
    const quizList = document.getElementById('quizList');
    if (quizList.style.display === 'none') {
      fetch('http://localhost/quiz-app/apis/getQuizzes.php')
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            quizList.innerHTML = '';
            data.quizzes.forEach((quiz) => {
              const li = document.createElement('li');
              li.textContent = quiz.title;
              quizList.appendChild(li);
            });
            quizList.style.display = 'block';
          } else {
            alert('Error fetching quizzes: ' + data.error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      quizList.style.display = 'none';
    }
  });
document
  .getElementById('showQuestionsBtn')
  .addEventListener('click', function () {
    const quizId = document.getElementById('quizIdInput').value;

    if (!quizId) {
      alert('Quiz ID is required');
      return;
    }
    fetch(`http://localhost/quiz-app/apis/getQuestions.php?quiz_id=${quizId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.questions.length > 0) {
          const questionsListDiv = document.getElementById('questionsList');
          questionsListDiv.innerHTML = '';

          const ol = document.createElement('ol');

          data.questions.forEach((question) => {
            const li = document.createElement('li');
            li.innerHTML = question.question_text;
            ol.appendChild(li);
          });

          questionsListDiv.appendChild(ol);
        } else {
          document.getElementById('questionsList').innerHTML =
            '<p>No questions available for this quiz.</p>';
        }
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  });

document.getElementById('createQuizbtn').addEventListener('click', function () {
  const title = document.getElementById('quizTitle').value;

  if (!title) {
    alert('Title is required');
    return;
  }

  const data = { title: title };

  fetch('http://localhost/quiz-app/apis/creatQuiz.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success) {
        alert('Quiz created successfully! Quiz ID: ' + responseData.quiz_id);
      } else {
        alert('Error: ' + responseData.error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
document.getElementById('editQuizbtn').addEventListener('click', function () {
  const id = document.getElementById('quizID').value;
  const title = document.getElementById('newQuizTitle').value;

  if (!id || !title) {
    alert('ID and Title are required');
    return;
  }

  const data = { id: id, title: title };

  fetch('http://localhost/quiz-app/apis/editQuiz.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success) {
        alert('Quiz updated successfully!');
      } else {
        alert('Error: ' + responseData.error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
document.getElementById('logoutBtn').addEventListener('click', function () {
  window.location.href = '../index.html';
});
document.getElementById('deleteQuizbtn').addEventListener('click', function () {
  const id = document.getElementById('deleteQuizID').value;

  if (!id) {
    alert('Quiz ID is required');
    return;
  }

  const data = { id: id };

  fetch('http://localhost/quiz-app/apis/deleteQuiz.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success) {
        alert('Quiz deleted successfully!');
      } else {
        alert('Error: ' + responseData.error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
document
  .getElementById('createQuestionbtn')
  .addEventListener('click', function () {
    const quizID = document.getElementById('quizIDQuestion').value;
    const question = document.getElementById('questionTitle').value;
    const optionA = document.getElementById('optionA').value;
    const optionB = document.getElementById('optionB').value;
    const optionC = document.getElementById('optionC').value;
    const optionD = document.getElementById('optionD').value;
    const correctOption = document.getElementById('correctOption').value;

    if (
      !quizID ||
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    ) {
      alert('All fields are required');
      return;
    }

    const data = {
      quizID: quizID,
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      correctOption: correctOption,
    };

    fetch('http://localhost/quiz-app/apis/creatQuestion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          alert(
            'Question created successfully! Question ID: ' +
              responseData.questionID
          );
        } else {
          alert('Error: ' + responseData.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

document
  .getElementById('editQuestionBtn')
  .addEventListener('click', function () {
    const quizID = document.getElementById('quizIDForQuestion').value;
    const questionID = document.getElementById('editQuestionID').value;
    const question = document.getElementById('editQuestionTitle').value;
    const optionA = document.getElementById('editOptionA').value;
    const optionB = document.getElementById('editOptionB').value;
    const optionC = document.getElementById('editOptionC').value;
    const optionD = document.getElementById('editOptionD').value;
    const correctOption = document.getElementById('editCorrectOption').value;

    if (
      !quizID ||
      !questionID ||
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    ) {
      alert('All fields are required');
      return;
    }

    const data = {
      quizID: quizID,
      questionID: questionID,
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      correctOption: correctOption,
    };

    fetch('http://localhost/quiz-app/apis/editQuestions.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          alert('Question updated successfully!');
        } else {
          alert('Error: ' + responseData.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

document
  .getElementById('deleteQuestionBtn')
  .addEventListener('click', function () {
    const questionID = document.getElementById('deleteQuestionID').value;

    if (!questionID) {
      alert('Question ID is required');
      return;
    }

    const data = { questionID: questionID };

    fetch('http://localhost/quiz-app/apis/deleteQuestion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          alert('Question deleted successfully!');
        } else {
          alert('Error: ' + responseData.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
