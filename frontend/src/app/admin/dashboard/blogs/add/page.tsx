"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
import BackButton from "@/components/BackButton";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string(),
  author: z.string(),
  imageCover: z.instanceof(File).refine(file => file.size > 0, {
    message: "Cover image is required",
  }),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddBlog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("imageCover", values.imageCover);
    if (values.images) {
      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/blogs",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error saving product", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/blogs'}/>
      <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Add Blog</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="author" render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          
            <FormField control={form.control} name="imageCover" render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="images" render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <Button type="submit" className=" mt-1 w-full ">Save</Button>
        </form>
      </Form>
    </div>
    </div>
    
  );
}
