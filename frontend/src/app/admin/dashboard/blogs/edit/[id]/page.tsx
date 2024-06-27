"use client";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [showImagesInput, setShowImagesInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState('');

  const coverImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCoverImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : '');
    form.setValue('imageCover', file);
  };

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
        setSaveDialogOpen(true);
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
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="author" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Author</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Category</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Description</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="description" render={({ field }) => (
                      <ReactQuill value={field.value} onChange={field.onChange} className="w-full min-w-[1500px]"/>
                    )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            {showCoverImageInput ? (
                <FormField control={form.control} name="imageCover" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Cover Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => coverImageRef.current?.click()}
                          className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                        >
                          {coverImageName ? 'Choose Another Image' : 'Upload Cover Image'}
                        </Button>
                        <input
                          type="file"
                          ref={coverImageRef}
                          onChange={handleCoverImageChange}
                          className="hidden"
                        />
                        {coverImageName && <p className="ml-2 font-medium">Selected Image: <b>{coverImageName}</b></p>}
                      </div>
                    </FormControl>
                    <Button onClick={() => setShowCoverImageInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                blogData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Cover Image (Current)</h2>
                      <Image 
                        src={`/imgs/blogs/${blogData.imageCover}`} 
                        alt="blog cover image" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-sky-800 " 
                        onClick={() => setShowCoverImageInput(true)}
                      />
                    </div>
                )
              )}
            
            {showImagesInput ? (
                <FormField control={form.control} name="images" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        ref={imagesRef}
                        onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                      />
                    </FormControl>
                    <Button onClick={() => setShowImagesInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                blogData && (
                  <div className="mt-5 w-full">
                    <h2 className="font-semibold">Images (Current)</h2>
                    <div className="flex flex-row justify-between ">
                      {blogData.images.length > 0 ? (
                        blogData.images.map((image, index) => (
                          <Image 
                            key={index}
                            src={`/imgs/blogs/${image}`} 
                            alt={`blog image ${index + 1}`} 
                            width={400} 
                            height={250} 
                            className="object-cover cursor-pointer border-sky-800 border" 
                            onClick={() => setShowImagesInput(true)}
                          />
                        ))
                      ) : (
                        <p className="mt-2 font-semibold">No images found.</p>
                      )}
                    </div>
                  </div>
                )
              )}
            <Button type="submit" className="mt-1 w-full">Save</Button>
          </form>
        </Form>
        <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/blogs'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-sky-800 hover:bg-sky-700 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </div>
      </div>
    </div>
  );
}
