/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args: any) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item?.value) {
              params.append(item.name, item.value as string);
            }
          });
        }

        return {
          url: `/users/get-all`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    getManagersAndAdmins: builder.query({
      query: (args: any) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item?.value) {
              params.append(item.name, item.value as string);
            }
          });
        }

        return {
          url: `/users/managers-and-superadmins`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    changeUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/change-status/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    changeUserRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/change-role/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetManagersAndAdminsQuery,
  useChangeUserStatusMutation,
  useChangeUserRoleMutation,
} = usersApi;
