import { baseApi } from "@/redux/baseApi";
import { IRide, TResponse } from "@/types";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Estimate fare before requesting ride
    estimateFare: builder.mutation<
      { fare: number },
      {
        pickup: { latitude: number; longitude: number };
        destination: { latitude: number; longitude: number };
      }
    >({
      query: (data) => ({
        url: "/rides/estimate-fare",
        method: "POST",
        data: data,
      }),
    }),

    // Request a new ride
    requestRide: builder.mutation<
      any,
      {
        pickup: { latitude: number; longitude: number };
        destination: { latitude: number; longitude: number };
        paymentMethod: string;
      }
    >({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Get rider's ride history
    getRiderHistory: builder.query<TResponse<IRide[]>, {
      page?: number;
      limit?: number;
      status?: string;
      fromDate?: string;
      toDate?: string;
      minFare?: number;
      maxFare?: number;
    } | void>({
      query: (params) => ({
        url: "/rides/me",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: any): TResponse<IRide[]> => {
        const data = response.rides || response.data || [];
        return {
          statusCode: response.statusCode || 200,
          success: response.success !== false,
          message: response.message || 'Success',
          data: data
        };
      },
      providesTags: ["RIDE"],
    }),

    // Get all rides (admin only)
    getAllRides: builder.query<TResponse<IRide[]>, {
      page?: number;
      limit?: number;
      status?: string;
      fromDate?: string;
      toDate?: string;
      minFare?: number;
      maxFare?: number;
      riderId?: string;
      driverId?: string;
    } | void>({
      query: (params) => ({
        url: "/rides",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: any): TResponse<IRide[]> => {
        const data = response.rides || response.data || response || [];
        return {
          statusCode: response.statusCode || 200,
          success: response.success !== false,
          message: response.message || 'Success',
          data: data
        };
      },
      providesTags: ["RIDE"],
    }),

    // Get driver's accepted/assigned rides
    getDriverRides: builder.query<TResponse<IRide[]>, {
      driverId?: string;
      status?: string;
      page?: number;
      limit?: number;
    } | void>({
      query: (params) => ({
        url: "/rides",
        method: "GET",
        params: {
          ...params,
          status: params?.status || "accepted,picked_up,in_transit,completed"
        },
      }),
      transformResponse: (response: any): TResponse<IRide[]> => {
        const data = response.rides || response.data || response || [];
        return {
          statusCode: response.statusCode || 200,
          success: response.success !== false,
          message: response.message || 'Success',
          data: data
        };
      },
      providesTags: ["RIDE"],
    }),

    // Get available rides for drivers
    getAvailableRides: builder.query<IRide[], void>({
      query: () => ({
        url: "/rides/available",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        console.log('Available rides response:', response);
        // Handle different response formats from backend
        if (Array.isArray(response)) {
          return response;
        }
        if (response?.rides && Array.isArray(response.rides)) {
          return response.rides;
        }
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }
        // If response has a success property, check if it's successful
        if (response?.success === false) {
          throw new Error(response?.message || 'Failed to fetch available rides');
        }
        return [];
      },
      transformErrorResponse: (response: any) => {
        console.error('Available rides error:', response);
        // Handle authentication errors specifically
        if (response?.status === 401) {
          return {
            status: 401,
            data: { message: 'Authentication required. Please login again.' }
          };
        }
        return response;
      },
      providesTags: ["RIDE"],
    }),

    // Get current ride for rider/driver
    getCurrentRide: builder.query<IRide | null, void>({
      query: () => ({
        url: "/rides/current",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // Get ride details by ID
    getRideDetails: builder.query<IRide, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // Cancel a ride (rider only)
    cancelRide: builder.mutation<IRide, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Accept a ride (driver only)
    acceptRide: builder.mutation<any, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      transformResponse: (response: any) => {
        // Backend returns { message, ride } format, extract the ride
        console.log('Accept ride response:', response);
        return response?.ride || response;
      },
      invalidatesTags: ["RIDE"],
    }),

    // Update ride status (driver only)
    updateRideStatus: builder.mutation<
      any,
      { rideId: string; status: IRide["status"] }
    >({
      query: ({ rideId, status }) => {
        console.log('Update ride status request:', { rideId, status });
        return {
          url: `/rides/${rideId}/status`,
          method: "PATCH",
          data: { status },
        };
      },
      transformResponse: (response: any) => {
        console.log('Update status response:', response);
        return response?.ride || response;
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          console.log('Status update successful:', result);
        } catch (error) {
          console.error('Status update failed:', error);
        }
      },
      invalidatesTags: ["RIDE"],
    }),
  }),

  overrideExisting: false,
});

export const {
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
  useUpdateRideStatusMutation
} = rideApi;

// Aliases for backward compatibility
export const useGetMyRidesQuery = useGetRiderHistoryQuery;
export const useDriverRidesQuery = useGetAvailableRidesQuery;
export const useGetRidesAdminQuery = useGetAllRidesQuery;
