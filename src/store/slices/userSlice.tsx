import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string | null
  name: string | null
  email: string | null
}

const initialState: UserState = {
  id: null,
  name: 'Minh Hieu',
  email: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }
    },
    clearUser: () => {
      return initialState
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
