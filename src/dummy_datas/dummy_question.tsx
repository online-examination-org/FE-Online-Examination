import { Quiz } from '@/pages/QuizForm'

const quizData: { quiz: Quiz } = {
  quiz: {
    title: 'Web Development Knowledge Test',
    description: 'Test your knowledge about web development fundamentals',
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: 'What is your preferred JavaScript framework?',
        type: 'multipleChoice',
        options: ['React', 'Vue', 'Angular', 'Svelte'],
        required: true
      },
      {
        id: 2,
        question: 'Explain what is Virtual DOM in React?',
        type: 'shortQuestion',
        required: true
      },
      {
        id: 3,
        question: 'Which state management library do you primarily use with React?',
        type: 'multipleChoice',
        options: ['Redux', 'MobX', 'Zustand', 'Recoil', 'Context API'],
        required: true
      },
      {
        id: 4,
        question: 'What version of React are you currently using in your projects?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 5,
        question: 'Which of these is NOT a React Hook?',
        type: 'multipleChoice',
        options: ['useEffect', 'useState', 'useMemory', 'useContext'],
        required: true
      },
      {
        id: 6,
        question: 'What is your favorite feature of TypeScript?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 7,
        question: 'Which CSS framework do you prefer?',
        type: 'multipleChoice',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Plain CSS'],
        required: true
      },
      {
        id: 8,
        question: "What's your preferred method for styling React components?",
        type: 'multipleChoice',
        options: ['CSS Modules', 'Styled Components', 'Tailwind CSS', 'SASS/SCSS', 'Emotion'],
        required: true
      },
      {
        id: 3,
        question: 'Which state management library do you primarily use with React?',
        type: 'multipleChoice',
        options: ['Redux', 'MobX', 'Zustand', 'Recoil', 'Context API'],
        required: true
      },
      {
        id: 4,
        question: 'What version of React are you currently using in your projects?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 5,
        question: 'Which of these is NOT a React Hook?',
        type: 'multipleChoice',
        options: ['useEffect', 'useState', 'useMemory', 'useContext'],
        required: true
      },
      {
        id: 6,
        question: 'What is your favorite feature of TypeScript?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 7,
        question: 'Which CSS framework do you prefer?',
        type: 'multipleChoice',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Plain CSS'],
        required: true
      },
      {
        id: 8,
        question: "What's your preferred method for styling React components?",
        type: 'multipleChoice',
        options: ['CSS Modules', 'Styled Components', 'Tailwind CSS', 'SASS/SCSS', 'Emotion'],
        required: true
      },
      {
        id: 3,
        question: 'Which state management library do you primarily use with React?',
        type: 'multipleChoice',
        options: ['Redux', 'MobX', 'Zustand', 'Recoil', 'Context API'],
        required: true
      },
      {
        id: 4,
        question: 'What version of React are you currently using in your projects?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 5,
        question: 'Which of these is NOT a React Hook?',
        type: 'multipleChoice',
        options: ['useEffect', 'useState', 'useMemory', 'useContext'],
        required: true
      },
      {
        id: 6,
        question: 'What is your favorite feature of TypeScript?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 7,
        question: 'Which CSS framework do you prefer?',
        type: 'multipleChoice',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Plain CSS'],
        required: true
      },
      {
        id: 8,
        question: "What's your preferred method for styling React components?",
        type: 'multipleChoice',
        options: ['CSS Modules', 'Styled Components', 'Tailwind CSS', 'SASS/SCSS', 'Emotion'],
        required: true
      },
      {
        id: 3,
        question: 'Which state management library do you primarily use with React?',
        type: 'multipleChoice',
        options: ['Redux', 'MobX', 'Zustand', 'Recoil', 'Context API'],
        required: true
      },
      {
        id: 4,
        question: 'What version of React are you currently using in your projects?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 5,
        question: 'Which of these is NOT a React Hook?',
        type: 'multipleChoice',
        options: ['useEffect', 'useState', 'useMemory', 'useContext'],
        required: true
      },
      {
        id: 6,
        question: 'What is your favorite feature of TypeScript?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 7,
        question: 'Which CSS framework do you prefer?',
        type: 'multipleChoice',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Plain CSS'],
        required: true
      },
      {
        id: 8,
        question: "What's your preferred method for styling React components?",
        type: 'multipleChoice',
        options: ['CSS Modules', 'Styled Components', 'Tailwind CSS', 'SASS/SCSS', 'Emotion'],
        required: true
      },
      {
        id: 3,
        question: 'Which state management library do you primarily use with React?',
        type: 'multipleChoice',
        options: ['Redux', 'MobX', 'Zustand', 'Recoil', 'Context API'],
        required: true
      },
      {
        id: 4,
        question: 'What version of React are you currently using in your projects?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 5,
        question: 'Which of these is NOT a React Hook?',
        type: 'multipleChoice',
        options: ['useEffect', 'useState', 'useMemory', 'useContext'],
        required: true
      },
      {
        id: 6,
        question: 'What is your favorite feature of TypeScript?',
        type: 'shortQuestion',
        required: false
      },
      {
        id: 7,
        question: 'Which CSS framework do you prefer?',
        type: 'multipleChoice',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Plain CSS'],
        required: true
      },
      {
        id: 8,
        question: "What's your preferred method for styling React components?",
        type: 'multipleChoice',
        options: ['CSS Modules', 'Styled Components', 'Tailwind CSS', 'SASS/SCSS', 'Emotion'],
        required: true
      }
    ]
  }
}

export default quizData
