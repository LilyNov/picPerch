import { Routes, Route } from "react-router-dom";
import "./globals.css";
import {
  Explore,
  Home,
  AllUsers,
  Saved,
  CreatePost,
  EditPost,
  PostDetails,
  Profile,
  UpdateProfile,
} from "./_root/pages";
import { SignInForm, SignUpForm } from "./_auth/forms";
import { AuthLayout } from "./_auth/AuthLayout";
import { RootLayout } from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

export const App = () => {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};
