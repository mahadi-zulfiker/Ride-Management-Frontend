import { useDispatch } from 'react-redux'
import { logout } from '@/redux/features/auth/authSlice'

export const useLogoutMutation = () => {
  const dispatch = useDispatch()
  
  const logoutMutation = async () => {
    try {
      // Clear Redux state and localStorage
      dispatch(logout())
      // Optionally, you could call a backend logout endpoint here
      return { success: true }
    } catch (error) {
      throw error
    }
  }
  
  return [logoutMutation, { isLoading: false }] as const
}