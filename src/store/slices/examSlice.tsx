import { createSlice } from '@reduxjs/toolkit'

interface ExamState {
  examResultToken: string
  examGetResponse: {
    examId: number
    title: string
    passcode: string
    startTime: string
    endTime: string
    duration: number
    description: string
  }
  name: string
  email: string
}

const initialState: ExamState = {
  examResultToken: '',
  examGetResponse: {
    examId: 0,
    title: '',
    passcode: '',
    startTime: '',
    endTime: '',
    duration: 0,
    description: ''
  },
  name: '',
  email: ''
}

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setExamData: (state, action) => {
      state.examResultToken = action.payload.examResultToken
      state.examGetResponse = action.payload.examGetResponse
      state.name = action.payload.name
      state.email = action.payload.email
    }
  }
})

export const { setExamData } = examSlice.actions
export default examSlice.reducer
