import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/types'

export interface AuthState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
}

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
      isAuthenticated: !!(token && user)
    }
  } catch {
    return {
      user: null,
      token: null,
      isAuthenticated: false
    }
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      
      // Persist to localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    }
  }
})

export const { setCredentials, logout, updateUser } = authSlice.actions
export default authSlice.reducer

import { RootState } from '../../store'

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated