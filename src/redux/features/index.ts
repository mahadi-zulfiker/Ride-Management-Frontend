// Export all authentication hooks
export {
  useRegisterMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation
} from './auth/auth.api';

// Export auth slice actions and selectors
export {
  setCredentials,
  logout,
  updateUser,
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated
} from './auth/authSlice';

// Export custom hooks for backward compatibility
export { useUserInfoQuery, useUserInfo } from '../../hooks/useUserInfo';
export { useLogoutMutation } from '../../hooks/useLogout';

// Export all driver hooks
export {
  useSetAvailabilityMutation,
  useGetEarningsQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useEarningsHistoryQuery
} from './driver/driver.api';

// Export all ride hooks
export {
  useEstimateFareMutation,
  useRequestRideMutation,
  useGetRiderHistoryQuery,
  useGetAllRidesQuery,
  useGetAvailableRidesQuery,
  useGetDriverRidesQuery,
  useGetCurrentRideQuery,
  useGetRideDetailsQuery,
  useCancelRideMutation,
  useAcceptRideMutation,
  useUpdateRideStatusMutation,
  useGetMyRidesQuery,
  useDriverRidesQuery,
  useGetRidesAdminQuery
} from './ride/ride.api';

// Export all user/stats hooks
export {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useGetAnalyticsQuery,
  useGetStatsQuery
} from './stats/stat.api';