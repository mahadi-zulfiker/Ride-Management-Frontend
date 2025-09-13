import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get analytics (admin only)
    getAnalytics: builder.query<any, void>({
      query: () => ({
        url: "/users/analytics",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // Backend returns { rideVolume, revenueTrends, driverActivity } directly
        return response;
      }
    }),
    
    // Get all users (admin only)
    getAllUsers: builder.query<any, { 
      page?: number;
      limit?: number;
      role?: string; 
      search?: string 
    } | void>({
      query: (params) => ({
        url: `/users`,
        method: "GET",
        params: params,
      }),
      transformResponse: (response: any) => ({
        data: response.users // Backend returns { users: [...] }, extract users array
      }),
      providesTags: ["USER"],
    }),
    
    // Block/unblock user (admin only)
    blockUser: builder.mutation<any, { id: string; block: boolean }>({
      query: ({ id, block }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        data: { block },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useGetAnalyticsQuery
} = userApi;

// Alias for backward compatibility
export const useGetStatsQuery = useGetAnalyticsQuery;

// For backward compatibility, re-export from driver API
export { useSuspendDriverMutation } from '../driver/driver.api';
