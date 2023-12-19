import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import { INewUser } from "@/types/types";

// create a new User (sign up)
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

// sign in Account
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

// sign out
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
