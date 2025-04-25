const quizzes = [
  {
    id: 1,
    title: 'HTML Quiz',
    questions: [
      {
        question: 'What does HTML stand for?',
        answers: [
          'a. HyperText Markup Language',
          'b. HighText Machine Language',
          'c. Hyperlink and Text Markup Language',
        ],
        correctAnswer: 0,
      },
      {
        question:
          'Which element is responsible for the content structure of a web page?',
        answers: ['a. HTML', 'b. CSS', 'c. JavaScript'],
        correctAnswer: 0,
      },
      {
        question: 'Which of the following is used to add images in a webpage?',
        answers: ['a. Image source', 'b. HTML image', 'c. Image element'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'CSS Quiz',
    questions: [
      {
        question: 'Which property is used to change text color?',
        answers: ['a. color', 'b. font-color', 'c. text-color'],
        correctAnswer: 0,
      },
      {
        question: 'Which symbol is used for an ID selector?',
        answers: ['a. #', 'b. .', 'c. *'],
        correctAnswer: 0,
      },
      {
        question: 'What does CSS stand for?',
        answers: [
          'a. Cascading Style Sheets',
          'b. Creative Style Syntax',
          'c. Colorful Style Sheets',
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 3,
    title: 'JavaScript Quiz',
    questions: [
      {
        question: 'Which symbol is used for comments in JavaScript?',
        answers: ['a. //', 'b. ##', 'c. --'],
        correctAnswer: 0,
      },
      {
        question: 'What is the result of 3 + "3" in JavaScript?',
        answers: ['a. 33', 'b. 6', 'c. Error'],
        correctAnswer: 0,
      },
      {
        question: 'Which method parses a JSON string into an object?',
        answers: ['a. JSON.parse()', 'b. JSON.stringify()', 'c. JSON.convert()'],
        correctAnswer: 0,
      },
    ],
  },
];

function saveQuizzesToLocalStorage() {
  if (!localStorage.getItem('quizzes')) {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    console.log('Quizzes saved to localStorage');
  } else {
    console.log('Quizzes already exist in localStorage');
  }
}

saveQuizzesToLocalStorage();
