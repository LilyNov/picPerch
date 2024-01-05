import { Models } from "appwrite";
import React from "react";

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
  // liked: [];
  name: string;
  // save: [];
  username: string | null;
}

export interface IPost extends Models.Document {
  caption: string;
  creator: ICreator;
  imageId: string;
  imageUrl: string;
  // likes: [];
  location?: string;
  // save: []
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
