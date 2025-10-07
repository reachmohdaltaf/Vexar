import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export const useCurrentUser = () => {
  return useQuery<User | null, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<User>("/api/me");
        return data || null;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
