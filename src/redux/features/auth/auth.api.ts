import { baseApi } from "@/redux/baseApi";
import { setCredentials } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // Store user data and token in Redux
          if (data.user && data.token) {
            dispatch(setCredentials({ user: data.user, token: data.token }));
          }
        } catch (error) {
          // Handle login error
        }
      },
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    
    updateProfile: builder.mutation<
      any, 
      any
    >({
      query: (data) => ({
        url: `/users/profile`,
        method: "PATCH",
        data:  data ,
      }),
      invalidatesTags: ["USER"],  
    }),
    changePassword: builder.mutation<
      any, 
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: `/users/change-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["USER"],  
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = authApi;
