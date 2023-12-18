import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { SignUpValidationSchema } from "@/lib/validation/validation";
import { Loader } from "@/components/ui/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";

export const SignUpForm = () => {
  const { toast } = useToast();
  const isLoading = false;

  // 1. Define the form
  const form = useForm<z.infer<typeof SignUpValidationSchema>>({
    resolver: zodResolver(SignUpValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define the submit handler
  const onSubmit = async (values: z.infer<typeof SignUpValidationSchema>) => {
    const newUser = await createUserAccount(values);
    console.log("newUser", newUser);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again" });
    }

    // const session = signInAccount
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex-center">
          <img
            src="public/assets/icons/camera.svg"
            alt="camera"
            className="w-10 mr-2"
          />{" "}
          <span className="text-3xl">PicPerch</span>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use PicPerch, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary mt-4">
            {isLoading ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className=" text-primary-500 text-small-semibold underline ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
