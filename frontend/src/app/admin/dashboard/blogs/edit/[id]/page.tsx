"use client";
import { useEffect, useState, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/components/types/Categories";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  title_AR:z.string().optional(),
  title_EN:z.string().optional(),
  body_AR:z.string().optional(),
  body_EN:z.string().optional(),
  description_AR:z.string().optional(),
  description_EN:z.string().optional(),
  category:z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditBlog({ params }:{params:{id:string}}) {
  let id = params.id;
  const [blogData, setBlogData] = useState(null);
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [showImagesInput, setShowImagesInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState('');

  const coverImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_AR: "",
      title_EN: "",
      body_AR: "",
      body_EN: "",
      description_AR: "",
      description_EN: "",
      category: "",
      coverImage: null,
      images: [],
    },
  });

  const handleCoverImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : '');
    form.setValue('coverImage', file);
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/blogs/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setBlogData(data);
          console.log(data);
          form.reset({
            title_AR: data.title_AR,
            title_EN: data.title_EN,
            body_AR: data.body_AR,
            body_EN: data.body_EN,
            description_AR: data.description_AR,
            description_EN: data.description_EN,
            category: data.category,
          });
        })
        .catch(error => console.error("Error fetching blog data", error));
    }
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (values.title_AR)formData.append("title_AR", values.title_AR);
    if (values.title_EN)formData.append("title_EN", values.title_EN);
    if (values.body_AR)formData.append("body_AR", values.body_AR);
    if (values.body_EN)formData.append("body_EN", values.body_EN);
    if (values.description_AR)formData.append("description_AR", values.description_AR);
    if (values.description_EN)formData.append("description_EN", values.description_EN);
    if (values.category)formData.append("category", values.category);
    if (values.coverImage) formData.append("coverImage", values.coverImage);
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
      if(response.data.status === 'success') {
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
          <div className="grid grid-cols-2 gap-5">
            <FormField control={form.control} name="title_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Arabic Title</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="title_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>English Title</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            </div>
            
            <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Category:</FormLabel>
                  <FormControl>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <div className="grid gird-cols-1 gap-5">
            <FormField control={form.control} name="description_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Arabic Description:</FormLabel>
                <FormControl>
                    <Input {...field} type="text"  />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="description_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">English Description:</FormLabel>
                <FormControl>
                    <Input {...field} type="text"  />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
              </div>

              <div className="grid grid-cols-1 gap-11">
              <FormField control={form.control} name="body_AR" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Arabic Body</FormLabel>
                    <FormControl>
                      <Controller control={form.control} name="body_AR" render={({ field }) => (
                        <ReactQuill value={field.value} onChange={field.onChange} modules={modules} className='h-[150px]'/>
                      )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField control={form.control} name="body_EN" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>English Body</FormLabel>
                    <FormControl>
                      <Controller control={form.control} name="body_EN" render={({ field }) => (
                        <ReactQuill value={field.value} onChange={field.onChange} modules={modules} className='h-[150px]'/>
                      )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>

            {showCoverImageInput ? (
                <FormField control={form.control} name="coverImage" render={({ field }) => (
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
                        src={`/imgs/${blogData.coverImage}`} 
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
                            src={`/imgs/${image}`} 
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
