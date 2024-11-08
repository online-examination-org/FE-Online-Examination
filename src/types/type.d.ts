export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  name: string
  email: string
  password: string
}

export interface CreateExamBody {
  title: string
  startTime: string
  endTime: string
  duration: number
  description: string
}

export interface Profile {
  id: number
  name: string
  email: string
  role: string
}

interface Teacher {
  createdAt: string
  updatedAt: string
  id: number
  name: string
  email: string
  password: string
}

export interface Exam {
  createdAt: string
  updatedAt: string
  examId: number
  title: string
  passcode: string
  startTime: string
  endTime: string
  duration: number
  description: string
  teacher: Teacher
  isActive: boolean
}

export interface ExamResult {
  createdAt: string
  updatedAt: string
  examResultId: number
  name: string
  studentId: string
  email: string
  score: string
  startedAt: string
  finishedAt: string
}

export interface Question {
  questionId: number
  examId: number
  questionText: string
  questionType: string
  answer: string
  choices: {
    [key: string]: string
  }
}

export interface CreateQuestionBody {
  exam_id: number
  questionText: string
  questionType: string
  answer: string
  choices: {
    [key: string]: string
  }
}

export interface EditQuestionBody {
  //exam_id: number
  questionText: string
  questionType: string
  answer: string
  choices: {
    [key: string]: string
  }
}

export interface JoinPayloadProps {
  name: string
  studendId: string
  mail: string
  passcode: string
}

interface SubmitQuizProps {
  finish_at: string
}

interface JoinQuizProps {
  passcode: string
  studentId: string
  name: string
  email: string
}

interface StartQuizProps {
  startedAt: string
}

interface saveQuizProps {
  question_id: number
  response: string
}
