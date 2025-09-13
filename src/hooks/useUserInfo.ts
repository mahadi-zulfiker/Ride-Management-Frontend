import { useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated } from '@/redux/features/auth/authSlice'

// Custom hook to mimic the old useUserInfoQuery behavior
export const useUserInfo = () => {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  
  return {
    data: user,
    isLoading: false, // Since we're reading from localStorage/Redux
    isError: false,
    error: null,
    refetch: () => {}, // No-op since data comes from Redux state
  }
}

// For components that expect { data: userData } format
export const useUserInfoQuery = (arg?: any) => {
  return useUserInfo()
}