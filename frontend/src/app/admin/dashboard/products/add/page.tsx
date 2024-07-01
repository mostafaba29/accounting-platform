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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Link from 'next/link';
import {categories} from '@/components/types/Categories';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import { Plus, X } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  ArTitle: z.string().min(1, "Product title is required").max(100),
  EnTitle: z.string().min(1, "Product title is required").max(100),
  Ardescription: z.string().min(1, "Product description is required"),
  Endescription: z.string().min(1, "Product description is required"),
  basicPrice: z.preprocess((val) => Number(val), z.number().positive("Product price must be a positive number")),
  openPrice: z.preprocess((val) => Number(val), z.number().positive("Product price must be a positive number")),
  editablePrice: z.preprocess((val) => Number(val), z.number().positive("Product price must be a positive number")),
  category: z.string().min(1, "Category is required"),
  video:z.instanceof(File).refine(file => file.size>0, {message: "Video is required",}),
  coverImage: z.instanceof(File).refine(file => file.size > 0, {
    message: "Cover image is required",
  }),
  basicDocument: z.instanceof(File).refine(file => file.size > 0, {message: "Document is required",}),
  openDocument: z.instanceof(File).refine(file => file.size > 0, {message: "Document is required",}),
  editableDocument: z.instanceof(File).refine(file => file.size > 0, {message: "Document is required",}),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddProduct() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [basicDocumentName, setDocumentName] = useState('');
  const [openDocumentName, setOpenDocumentName] = useState('');
  const [editableDocumentName, setEditableDocumentName] = useState('');
  const [images, setImages] = useState<File[]>([]); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      // price: null,
      category: "",
      video: null,
      coverImage: null,
      basicDocument: null,
      openDocument: null,
      editableDocument: null,
      images: [],
    }
  });

  const videoRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const basicDocumentRef = useRef<HTMLInputElement>(null);
  const openDocumentRef = useRef<HTMLInputElement>(null);
  const editableDocumentRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleVideoChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setVideoName(file ? file.name : '');
    form.setValue('video', file);
  }
  const handleCoverImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : '');
    form.setValue('coverImage', file);
  };

  const handleImageChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages((prevImages) => [...prevImages, ...files]);
    form.setValue('images', [...images, ...files]);
  };
  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    form.setValue('images', updatedImages);
  };
  const handleBasicDocumentChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setDocumentName(file ? file.name : '');
    form.setValue('basicDocument', file);
  };
  const handleOpenDocumentChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setOpenDocumentName(file ? file.name : '');
    form.setValue('openDocument', file);
  };
  const handleEditableDocumentChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setEditableDocumentName(file ? file.name : '');
    form.setValue('editableDocument', file);
  };
  

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const formData = new FormData();
    formData.append("Artitle", values.ArTitle);
    formData.append("Entitle", values.EnTitle);
    formData.append("Ardescription", values.Ardescription);
    formData.append("Endescription", values.Endescription);
    formData.append("basicPrice", values.basicPrice.toString());
    formData.append("openPrice", values.openPrice.toString());
    formData.append("editablePrice", values.editablePrice.toString());
    formData.append("video", values.video);
    formData.append("coverImage", values.coverImage);
    formData.append("basicDocument", values.basicDocument);
    formData.append("openDocument", values.openDocument);
    formData.append("editableDocument", values.editableDocument);
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
          ArTitle: "",
          EnTitle: "",
          Ardescription: "",
          Endescription: "",
          basicPrice: 0,
          openPrice: 0,
          editablePrice: 0,
          category: "",
          video: null,
          coverImage: null,
          basicDocument: null,
          openDocument: null,
          editableDocument: null,
          images: [],
        });
        if (videoRef.current) videoRef.current.value = "";
        if (coverImageRef.current) coverImageRef.current.value = "";
        if (basicDocumentRef.current) basicDocumentRef.current.value = "";
        if (openDocumentRef.current) openDocumentRef.current.value = "";
        if (editableDocumentRef.current) editableDocumentRef.current.value = "";
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
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new product</h1>
        <p className="text-gray-500 text-xs mb-2">Elements marked with * are <b>required</b></p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-5">
            <FormField control={form.control} name="ArTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Arabic Title:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Title of the product' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="EnTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* English Title:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Title of the product' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
        
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Category:</FormLabel>
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
              <div className="grid grid-cols-3 gap-5">
                  <FormField control={form.control} name="basicPrice" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Basic Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="openPrice" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Open Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="editablePrice" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Editable Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
              </div>
    
            <div className="grid grid-cols-1 gap-11" >
                <FormField control={form.control} name="Ardescription" render={({ field }) => (
                  <FormItem >
                    <FormLabel className='font-semibold'>* Arabic Description:</FormLabel>
                    <FormControl >
                      <Controller control={form.control} name="Ardescription" render={({ field }) => (
                        <ReactQuill value={field.value} onChange={field.onChange} theme='snow' className='h-[150px]' /> 
                      )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="Endescription" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* English Description:</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="Endescription" render={({ field }) => (
                      <ReactQuill value={field.value} onChange={field.onChange} theme='snow' className='h-[150px]'/> 
                    )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
                />
            </div>
            
            <div className="grid grid-cols-2 gap-5 mt-8">
            <FormField control={form.control} name="video" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Video:</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => videoRef.current?.click()}
                          className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                        >
                          {coverImageName ? 'Choose Another Video' : 'Upload Product Video'}
                        </Button>
                        <input
                          type="file"
                          ref={videoRef}
                          onChange={handleVideoChange}
                          className="hidden"
                        />
                        {videoName && <p className="ml-2 font-medium">Selected video : <b>{videoName}</b></p>}
                    </div>
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
            </div>
              
            
            <FormField control={form.control} name="basicDocument" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Basic Document :</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        onClick={() => basicDocumentRef.current?.click()}
                        className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                      >
                        {basicDocumentName ? 'Choose Another Document' : 'Upload Basic Document'}
                      </Button>
                      <input
                        type="file"
                        ref={basicDocumentRef}
                        onChange={handleBasicDocumentChange}
                        className="hidden"
                      />
                      {basicDocumentName && <p className="ml-2 font-medium">Selected Document : <b>{basicDocumentName}</b></p>}
                  </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                 )}
              />
              
              <FormField control={form.control} name="openDocument" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Open Document :</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        onClick={() => openDocumentRef.current?.click()}
                        className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                      >
                        {openDocumentName ? 'Choose Another Document' : 'Upload Open Document'}
                      </Button>
                      <input
                        type="file"
                        ref={openDocumentRef}
                        onChange={handleOpenDocumentChange}
                        className="hidden"
                      />
                      {openDocumentName && <p className="ml-2 font-medium">Selected Document : <b>{openDocumentName}</b></p>}
                  </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              <FormField control={form.control} name="editableDocument" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Editable Document :</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        onClick={() => editableDocumentRef.current?.click()}
                        className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                      >
                        {editableDocumentName ? 'Choose Another Document' : 'Upload Editable Document'}
                      </Button>
                      <input
                        type="file"
                        ref={editableDocumentRef}
                        onChange={handleEditableDocumentChange}
                        className="hidden"
                      />
                      {editableDocumentName && <p className="ml-2 font-medium">Selected Document : <b>{editableDocumentName}</b></p>}
                  </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

<FormField control={form.control} name="images" render={({ field }) => (
          <FormItem>
            <FormLabel className='font-semibold'>Images:</FormLabel>
            <FormControl>
              <div>
                <div className="flex items-center">
                  <Button
                    type="button"
                    onClick={() => imagesRef.current?.click()}
                    className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[80px]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                  <input
                    type="file"
                    multiple
                    ref={imagesRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {images.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {images.map((image, index) => (
                      <li key={index} className="flex items-center justify-between text-sm font-medium">
                        <p className="truncate font-semibold">{image.name}</p>
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="ml-2 p-2 rounded-full bg-red-600 hover:bg-red-700"
                        >
                          <X className="h-4 w-4 text-white" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
            <Button type="submit" className="my-1 w-50 bg-sky-800 hover:bg-sky-700">Save</Button>
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