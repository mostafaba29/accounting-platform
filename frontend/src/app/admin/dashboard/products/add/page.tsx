"use client";
import { useState,useRef } from 'react';
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
import Link from 'next/link';

import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string().optional(),
  price: z
    .preprocess((val) => Number(val), z.number().positive("Product price must be a positive number")),
  category: z.string().min(5, "Category is required"),
  coverImage: z.instanceof(File).refine(file => file.size > 0, {
    message: "Cover image is required",
  }),
  document: z.instanceof(File).refine(file => file.size > 0, {
    message: "Document is required",
  }),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddProduct() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState('');
  const [documentName, setDocumentName] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      // price: null,
      category: "",
      coverImage: null,
      document: null,
      images: [],
    }
  });

  const coverImageRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleCoverImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : '');
    form.setValue('coverImage', file);
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setDocumentName(file ? file.name : '');
    form.setValue('document', file);
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("coverImage", values.coverImage);
    formData.append("document", values.document);
    formData.append("category", values.category);
    if (values.images) {
      values.images.forEach((image) => {
        formData.append('images', image);
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products",
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
          description: "Product added successfully",
        });
        form.reset({
          name: "",
          description: "",
          price: 0,
          category: "",
          coverImage: null,
          document: null,
          images: [],
        });
        if (coverImageRef.current) coverImageRef.current.value = "";
        if (documentRef.current) documentRef.current.value = "";
        if (imagesRef.current) imagesRef.current.value = "";
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error adding product",
        variant: "destructive",
      })
      console.log("Error saving product", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/products'} />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new product</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Name:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Title of the product' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Category:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Financial,HR ... etc'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Price:</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder='0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>* Description:</FormLabel>
                <FormControl>
                  <Controller control={form.control} name="description" render={({ field }) => (
                    <ReactQuill value={field.value} onChange={field.onChange} theme='snow' /> 
                  )} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

              <FormField control={form.control} name="coverImage" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Cover Image:</FormLabel>
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
                      {coverImageName && <p className="ml-2 font-medium">Selected Image : <b>{coverImageName}</b></p>}
                  </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="document" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Document :</FormLabel>
                  <FormControl>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={() => documentRef.current?.click()}
                      className="custom-file-input bg-sky-800  hover:bg-sky-700 w-[200px] "
                    >
                      {documentName ? 'Choose Another Document' : 'Upload Document'}
                    </Button>
                    <input
                      type="file"
                      ref={documentRef}
                      onChange={handleDocumentChange}
                      className="hidden"
                    />
                    {documentName && <p className="ml-2">Selected Document : <b>{documentName}</b></p>}
                  </div>
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
                      ref={imagesRef}
                      onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <p className="text-gray-500 text-xs">Elements marked with * are <b>required</b></p>
            <Button type="submit" className="mt-1 w-50 bg-sky-800 hover:bg-sky-700">Save</Button>
          </form>
        </Form>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to add another product ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/products'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-sky-800 hover:bg-sky-700 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}