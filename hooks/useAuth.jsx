import { useContext } from "react";
import { AuthContextProvider } from "@/Provider/AuthProvider";

const useAuth = () => {
  const all = useContext(AuthContextProvider);
  return all;
};

export default useAuth;
