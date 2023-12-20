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
import { FileUploader } from "../shared/FileUploader";

export const PostForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostFormValidationSchema>>({
    resolver: zodResolver(PostFormValidationSchema),
    defaultValues: {
      caption: "",
      file: "",
      location: "",
      tags: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PostFormValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Add photos */}
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader />
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
              <FormLabel className="shad-form_label">Add location</FormLabel>
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
                Add tags (separated by comma " , ")
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
          <Button type="button" className="shad-button_light-2 w-48">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap w-48">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
