"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostFormValidationSchema } from "@/lib/validation/validation";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../shared/FileUploader/FileUploader";
import { PostFormProps } from "./postForm.types";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../shared/Loader";
import { EDIT_MODE } from "@/constants/constants";
import { useEffect } from "react";

export const PostForm: React.FC<PostFormProps> = ({ mode, post }) => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isEditMode = mode === EDIT_MODE;

  const { mutateAsync: createPostM, isPending: isCreating } = useCreatePost();
  const { mutateAsync: updatePostM, isPending: isUpdating } = useUpdatePost();

  const isLoading = isCreating || isUpdating;
  const buttonText = isEditMode ? "Save" : "Create";
  const labelText = isEditMode ? "Edit" : "Add";

  const defaultValues =
    isEditMode && post
      ? {
          caption: post?.caption,
          file: [],
          location: post?.location,
          tags: post?.tags.join(","),
        }
      : {
          caption: "",
          file: [],
          location: "",
          tags: "",
        };

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostFormValidationSchema>>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(PostFormValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    return () => {
      form.reset({
        caption: "",
        location: "",
        tags: "",
      });
    };
  }, [form.reset]);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PostFormValidationSchema>) => {
    if (post && isEditMode) {
      const updatedPost = updatePostM({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: "Something went wrong. Please try again",
        });
      }

      return navigate(`posts/${post.$id}`);
    }

    const newPost = await createPostM({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Something went wrong. Please try again",
      });
    }

    navigate("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        {/* Caption */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">{`${labelText} caption`}</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Photo */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                {isEditMode ? "Photo" : "Add photo"}
              </FormLabel>
              <FormControl>
                <FileUploader
                  mode={mode}
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                  isEditMode={isEditMode}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Add location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                {`${labelText} location`}
              </FormLabel>
              <FormControl>
                <Input className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Add tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                {`${labelText} tags (separated by comma " , "`})
              </FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  placeholder="Art, Learn, Expression"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-10 items-center justify-center">
          <Button
            type="button"
            className="shad-button_light-2 w-1/2"
            disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap w-1/2"
            disabled={isLoading}>
            {isLoading && (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            )}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
