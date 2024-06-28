"use client";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string(),
  author: z.string(),
  category: z.string().min(1, "Category is required").max(100),
  imageCover: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Cover image is required",
  }),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddBlog() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      author: "",
      category: "",
      imageCover: null,
      images: [],
    },
  });

  const coverImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCoverImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("imageCover", file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("imageCover", values.imageCover);
    formData.append("category", values.category);
    if (values.images) {
      values.images.forEach((image) => {
        formData.append("images", image);
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
      if (response.data.status === "success") {
        toast({
          description: "Blog added successfully",
        });
        form.reset({
          name: "",
          description: "",
          author: "",
          category: "",
          imageCover: null,
          images: [],
        });
        if (coverImageRef.current) coverImageRef.current.value = "";
        if (imagesRef.current) imagesRef.current.value = "";
        setSaveDialogOpen(true);
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
      <BackButton text={"Go Back"} link={"/admin/dashboard/blogs"} />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Add a new blog post </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[1200px] w-full grid grid-cols-1 gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">* Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Title of the blog"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">* Author:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name of the author"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">* Category:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Financial,HR ... etc"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    * Description:
                  </FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <ReactQuill
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageCover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    * Cover Image:
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        onClick={() => coverImageRef.current?.click()}
                        className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                      >
                        {coverImageName
                          ? "Choose Another Image"
                          : "Upload Cover Image"}
                      </Button>
                      <input
                        type="file"
                        ref={coverImageRef}
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                      {coverImageName && (
                        <p className="ml-2 font-medium">
                          Selected Image : <b>{coverImageName}</b>
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? Array.from(e.target.files) : []
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-gray-500 text-xs">
              Elements marked with * are <b>required</b>
            </p>
            <Button type="submit" className=" mt-1 w-full ">
              Save
            </Button>
          </form>
        </Form>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do You want to add another blog ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/admin/dashboard/blogs">
              <Button variant={"outline"}>No</Button>
            </Link>
            <AlertDialogCancel className="bg-sky-800 hover:bg-sky-700 text-white">
              Yes
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
