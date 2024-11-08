import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Choice {
  [key: string]: string
}

interface Question {
  questionId: number
  questionText: string
  questionType: 'multipleChoice' | 'shortQuestion'
  choices?: Choice
  examResultDetailId: number | null
  response: string | null
}

interface QuestionState {
  questions: Question[]
}

const initialState: QuestionState = {
  questions: []
}

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: any) => {
      state.questions = action.payload
    },
    updateQuestionResponse: (state, action: PayloadAction<{ questionId: number; response: string | null }>) => {
      const { questionId, response } = action.payload
      const question = state.questions.find((q) => q.questionId === questionId)
      if (question) {
        question.response = response
      }
    }
  }
})

export const { setQuestions, updateQuestionResponse } = questionSlice.actions
export default questionSlice.reducer
