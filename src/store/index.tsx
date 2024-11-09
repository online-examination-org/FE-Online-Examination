import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import examReducer from './slices/examSlice'
import questionReducer from './slices/questionSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
    questions: questionReducer
  }
})

export default store
