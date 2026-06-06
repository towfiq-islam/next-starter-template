import { axiosPublic } from "@/lib/axiosPublic";
import { axiosSecure } from "@/lib/axiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function useClientApi({
  endpoint,
  method = "get",
  key,
  params,
  headers,
  axiosOptions,
  onSuccess,
  isPrivate,
  onError,
  enabled = true,
  queryOptions = {},
  mutationOptions = {},
}) {
  const axiosInstance = isPrivate ? axiosSecure : axiosPublic;

  // =========================
  // GET REQUEST
  // =========================
  const query = useQuery({
    queryKey: key,
    enabled: method === "get" && enabled,
    queryFn: async () => {
      const res = await axiosInstance.get(endpoint, { params, headers });
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });

  // =========================
  // MUTATION REQUEST
  // =========================
  const mutation = useMutation({
    mutationFn: async (variables = {}) => {
      const dynamicEndpoint = variables.endpoint || endpoint;
      const payload = variables.data ?? variables;

      // Support:
      // - mutate({ data })
      // - mutate({ endpoint: "/api/other" })
      // - mutate({ endpoint: "/api/other", data })

      const config = {
        headers,
        ...axiosOptions,
      };

      // DELETE
      if (method === "delete") {
        const { data } = await axiosInstance.delete(dynamicEndpoint, {
          data: payload,
          ...config,
        });

        return data;
      }

      // OTHER METHODS
      const { data } = await axiosInstance[method](
        dynamicEndpoint,
        payload,
        config,
      );

      return data;
    },

    onSuccess,
    onError,
    ...mutationOptions,
  });

  return method === "get" ? query : mutation;
}
