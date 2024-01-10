import { CREATE_MODE, EDIT_MODE } from "@/constants/constants";
import { Models } from "appwrite";
import React from "react";

export type Mode = typeof CREATE_MODE | typeof EDIT_MODE;

export type IParams = {
  id: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export interface ICreator extends Models.Document {
  accountId: string;
  bio: string | null;
  email: string;
  imageId: string | null;
  imageUrl: string;
  liked?: [];
  name: string;
  save?: [];
  username: string | null;
}

export interface IPost extends Models.Document {
  caption: string;
  creator: ICreator;
  imageId: string;
  imageUrl: string;
  likes: any[];
  location?: string;
  save: any[];
  tags?: string[];
}

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type ILikePost = {
  postId: string;
  likesArray: string[];
};

export type ISavePost = {
  postId: string;
  userId: string;
};

export type IDeletePost = {
  postId: string;
  imageId: string;
};
