import useClientApi from "@/hooks/useClientApi";

// Get User Data
export const useGetUserData = token => {
  return useClientApi({
    method: "get",
    key: ["user-data"],
    enabled: !!token,
    endpoint: "/api/account/profile",
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};
