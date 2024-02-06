import { lazy } from "react";

export const Explore = lazy(
  () => import("./Explore" /* webpackChunkName "explore" */)
);
export const Home = lazy(() => import("./Home" /* webpackChunkName "home" */));
export const AllUsers = lazy(
  () => import("./AllUsers" /* webpackChunkName "all-users" */)
);
export const CreatePost = lazy(
  () => import("./CreatePost" /* webpackChunkName "create-post" */)
);
export const Saved = lazy(
  () => import("./Saved" /* webpackChunkName "saved" */)
);
export const EditPost = lazy(
  () => import("./EditPost" /* webpackChunkName "edit-post" */)
);
export const PostDetails = lazy(
  () => import("./PostDetails" /* webpackChunkName "post-details" */)
);
export const Profile = lazy(
  () => import("./Profile" /* webpackChunkName "profile" */)
);
export const UpdateProfile = lazy(
  () => import("./UpdateProfile" /* webpackChunkName "update-profile" */)
);
export const LikedPosts = lazy(
  () => import("./LikedPosts" /* webpackChunkName "liked-posts" */)
);
