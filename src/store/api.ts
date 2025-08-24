import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://ridemanagementapi.vercel.app',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    // Add CORS headers
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Ride', 'Driver'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // User endpoints
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/users/change-password',
        method: 'PUT',
        body: passwordData,
      }),
    }),

    // Driver endpoints
    getDrivers: builder.query({
      query: (params) => ({
        url: '/drivers',
        params,
      }),
      providesTags: ['Driver'],
    }),
    updateDriverStatus: builder.mutation({
      query: ({ driverId, status }) => ({
        url: `/drivers/${driverId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Driver'],
    }),
    approveDriver: builder.mutation({
      query: (driverId) => ({
        url: `/drivers/${driverId}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Driver'],
    }),
    blockUser: builder.mutation({
      query: ({ userId, isBlocked }) => ({
        url: `/users/${userId}/block`,
        method: 'PUT',
        body: { isBlocked },
      }),
      invalidatesTags: ['User'],
    }),

    // Ride endpoints
    createRide: builder.mutation({
      query: (rideData) => ({
        url: '/rides',
        method: 'POST',
        body: rideData,
      }),
      invalidatesTags: ['Ride'],
    }),
    getRides: builder.query({
      query: (params) => ({
        url: '/rides',
        params,
      }),
      providesTags: ['Ride'],
    }),
    getRideById: builder.query({
      query: (rideId) => `/rides/${rideId}`,
      providesTags: ['Ride'],
    }),
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Ride'],
    }),
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: ['Ride'],
    }),
    rejectRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/reject`,
        method: 'PUT',
      }),
      invalidatesTags: ['Ride'],
    }),

    // Analytics endpoints
    getAnalytics: builder.query({
      query: (params) => ({
        url: '/analytics',
        params,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetDriversQuery,
  useUpdateDriverStatusMutation,
  useApproveDriverMutation,
  useBlockUserMutation,
  useCreateRideMutation,
  useGetRidesQuery,
  useGetRideByIdQuery,
  useUpdateRideStatusMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  useGetAnalyticsQuery,
} = api;
