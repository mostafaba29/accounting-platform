"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { usePathname } from "next/navigation";
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
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "blog name is required").max(100),
  description: z.string(),
  author: z.string(),
  category:z.string().min(1,"category is required").max(100),
  imageCover: z.instanceof(File).optional(),
  file: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditBlog() {
  const pathname = usePathname();
  let id = pathname?.split("/").pop();
  const [blogData, setBlogData] = useState(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/blogs/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setBlogData(data);
          console.log(data);
          form.reset({
            name: data.name,
            description: data.description,
            author: data.author,
          });
        })
        .catch(error => console.error("Error fetching blog data", error));
    }
  }, [id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.author);
    formData.append("category",values.category);
    if (values.imageCover) formData.append("imageCover", values.imageCover);
    if (values.file) formData.append("file", values.file);
    if (values.images) {
      values.images.forEach((image) => {
        formData.append('images', image);
      });
    }
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/blogs/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if(response.data.message === 'success') {
        toast({
          description: "Blog updated successfully",
        });
        window.location.href = '/admin/dashboard/blogs';
      }
    } catch (error) {
      toast({
        description: "Error updating blog",
        variant: "destructive",
      })
      console.log("Error updating blog", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/blogs'} />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <div className="flex flex-row items-center justify-between gap-8">
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
            <FormField control={form.control} name="file" render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
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
            <Button type="submit" className="mt-1 w-full">Save</Button>
          </form>
        </Form>
        {blogData && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Current Images</h2>
            <div className="flex space-x-4">
              {blogData.images.length > 0? (
                blogData.images.map((image, index) => (
                  <Image key={index} src={`/imgs/blogs/${image}`} alt={`blog image ${index + 1}`} width={200} height={200} className="object-cover" />
                ))
              ) : (
                <p>No images found.</p>
              )}
            </div>
            <h2 className="text-xl font-bold mt-5">Cover Image</h2>
            <Image src={`/imgs/products/${blogData.imageCover}`} alt="Product cover image" width={200} height={200} className="object-cover" />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
