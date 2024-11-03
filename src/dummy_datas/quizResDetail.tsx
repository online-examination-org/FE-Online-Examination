const quizResDetail: { quiz: any } = {
  quiz: {
    title: 'Web Development Knowledge Test',
    description: 'Test your knowledge about web development fundamentals',
    timeLimit: 10,
    questions: [
      {
        id: 0,
        question: 'What is your preferred JavaScript framework?',
        type: 'multipleChoice',
        options: ['React', 'Vue', 'Angular', 'Svelte'],
        required: true,
        correctAnswer: 'React'
      },
      {
        id: 1,
        question: 'What is the primary purpose of Webpack in a project?',
        type: 'shortQuestion',
        required: true,
        correctAnswer: 'To bundle JavaScript files and dependencies for a web project'
      },
      {
        id: 2,
        question: 'Explain what is Virtual DOM in React?',
        type: 'shortQuestion',
        required: true,
        correctAnswer: 'A lightweight copy of the DOM that allows React to perform efficient updates'
      },
      {
        id: 3,
        question: 'Which state management library do you primarily use with React?',
        type: 'multipleChoice',
        options: ['Redux', 'MobX', 'Zustand', 'Recoil', 'Context API'],
        required: true,
        correctAnswer: 'Redux'
      },
      {
        id: 4,
        question: 'What version of React are you currently using in your projects?',
        type: 'shortQuestion',
        required: false,
        correctAnswer: 'React 18'
      },
      {
        id: 5,
        question: 'Which of these is NOT a React Hook?',
        type: 'multipleChoice',
        options: ['useEffect', 'useState', 'useMemory', 'useContext'],
        required: true,
        correctAnswer: 'useMemory'
      },
      {
        id: 6,
        question: 'What is your favorite feature of TypeScript?',
        type: 'shortQuestion',
        required: false,
        correctAnswer: 'Static typing'
      },
      {
        id: 7,
        question: 'Which CSS framework do you prefer?',
        type: 'multipleChoice',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Plain CSS'],
        required: true,
        correctAnswer: 'Tailwind CSS'
      },
      {
        id: 8,
        question: "What's your preferred method for styling React components?",
        type: 'multipleChoice',
        options: ['CSS Modules', 'Styled Components', 'Tailwind CSS', 'SASS/SCSS', 'Emotion'],
        required: true,
        correctAnswer: 'CSS Modules'
      },
      {
        id: 9,
        question: 'Explain the purpose of useEffect in React.',
        type: 'shortQuestion',
        required: true,
        correctAnswer: 'To handle side effects in React components, such as data fetching'
      },
      {
        id: 10,
        question: 'Which HTTP methods do you use the most in RESTful APIs?',
        type: 'multipleChoice',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        required: true,
        correctAnswer: 'GET'
      },
      {
        id: 11,
        question: 'What tool do you use for debugging JavaScript?',
        type: 'multipleChoice',
        options: ['Chrome DevTools', 'VSCode Debugger', 'Firefox DevTools', 'React Developer Tools', 'None'],
        required: true,
        correctAnswer: 'Chrome DevTools'
      },
      {
        id: 12,
        question: 'How would you handle errors in a React application?',
        type: 'shortQuestion',
        required: true,
        correctAnswer: 'Using error boundaries and try/catch blocks'
      },
      {
        id: 13,
        question: 'Which of these are popular JavaScript testing frameworks?',
        type: 'multipleChoice',
        options: ['Jest', 'Mocha', 'Jasmine', 'Cypress', 'Puppeteer'],
        required: true,
        correctAnswer: 'Jest'
      }
    ]
  }
}

export default quizResDetail
