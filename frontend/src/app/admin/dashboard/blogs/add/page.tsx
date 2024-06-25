"use client";
import { useRef } from "react";
import { useForm,Controller } from "react-hook-form";
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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string(),
  author: z.string(),
  category:z.string().min(1,"Category is required").max(100),
  imageCover: z.instanceof(File).refine(file => file.size > 0, {
    message: "Cover image is required",
  }),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddBlog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        description: "",
        author: "",
        category: "",
        imageCover: null,
        images: [],
      }
  });

  const coverImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("imageCover", values.imageCover);
    formData.append("category", values.category);
    if (values.images) {
      values.images.forEach((image) => {
        formData.append('images', image);
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
      if (response.data.message === 'success') {
        toast({
          description: "Blog added successfully",
        });
        form.reset(
          {
            name: "",
            description: "",
            author: "",
            category: "",
            imageCover: null,
            images: [],
          }
        );
        if (coverImageRef.current) coverImageRef.current.value = "";
        if (imagesRef.current) imagesRef.current.value = "";
      }
    } catch (error) {
      toast({
        description: "Error adding blog",
        variant: "destructive",
      });
      console.log("Error adding blog", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/blogs'}/>
      <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Add a new blog post </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid gird-cols-1 gap-6">
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
                  <Controller control={form.control} name="description" render={({field}) => (
                    <ReactQuill value={field.value} onChange={field.onChange}  />
                  )} />
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
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
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
