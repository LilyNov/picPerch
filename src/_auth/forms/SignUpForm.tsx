import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

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
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import { IFormField } from "@/types/types";
import { Loader } from "@/components/shared/PostCard/Loader";

export const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { checkAuthUser } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreateAccountLoading } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const formFields: IFormField[] = [
    {
      name: "name",
      label: "Name",
      inputType: "text",
    },
    {
      name: "username",
      label: "Username",
      inputType: "text",
    },
    {
      name: "email",
      label: "Email",
      inputType: "email",
    },
    {
      name: "password",
      label: "Password",
      inputType: "password",
    },
  ];

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

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again" });
    }

    const session = signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again" });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign up failed. Please try again" });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex-center">
          <Logo imgStyles="w-10 mr-2" textSize="text-3xl" />
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-2 small-medium md:base-regular mt-2">
          To use PicPerch, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-4">
          {formFields.map(({ name, label, inputType }) => (
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={inputType}
                      className="shad-input mb-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="shad-button_primary mt-4"
            disabled={isCreateAccountLoading}>
            {isCreateAccountLoading ? (
              <div className="flex-center gap-2">
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
