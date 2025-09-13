import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setAvailability: builder.mutation<
      any, 
      { id?: string; availability?: string; isOnline?: boolean }
    >({
      query: (data) => ({
        url: `/drivers/availability`,
        method: "PATCH",
        data: { isOnline: data.isOnline ?? (data.availability === "Online") },
      }),
      invalidatesTags: ["USER"],  
    }),
    getEarnings: builder.query<any, void>({
      query: () => ({
        url: `/drivers/earnings`,
        method: "GET",
      }),
    }),
    approveDriver: builder.mutation<
      any, 
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/drivers/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],  
    }),
    suspendDriver: builder.mutation<
      any, 
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/drivers/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],  
    }),
  }),
  overrideExisting: false,
});

export const {
  useSetAvailabilityMutation,
  useGetEarningsQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation
} = driverApi;

// Alias for backward compatibility
export const useEarningsHistoryQuery = useGetEarningsQuery;