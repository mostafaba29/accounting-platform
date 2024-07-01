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
  title_AR: z.string().min(1, "Product title is required").max(100),
  title_EN: z.string().min(1, "Product title is required").max(100),
  description_AR: z.string().min(1, "Product description is required"),
  description_EN: z.string().min(1, "Product description is required"),
  body_AR: z.string().min(1, "Product body is required"),
  body_EN: z.string().min(1, "Product body is required"),
  category: z.string().min(1, "Category is required"),
  video: z.instanceof(File).refine(file => file.size > 0, { message: "Video is required" }),
  coverImage: z.instanceof(File).refine(file => file.size > 0, { message: "Cover image is required" }),
  basicVersion: z.object({
    document: z.instanceof(File).refine(file => file.size > 0, { message: "Document is required" }),
    price: z.preprocess((val) => Number(val), z.number().positive("Price must be a positive number"))
  }),
  openVersion: z.object({
    document: z.instanceof(File).refine(file => file.size > 0, { message: "Document is required" }),
    price: z.preprocess((val) => Number(val), z.number().positive("Price must be a positive number"))
  }),
  editableVersion: z.object({
    document: z.instanceof(File).refine(file => file.size > 0, { message: "Document is required" }),
    price: z.preprocess((val) => Number(val), z.number().positive("Price must be a positive number"))
  }),
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
      title_AR: "",
      title_EN: "",
      description_AR: "",
      description_EN: "",
      category: "",
      video: null,
      coverImage: null,
      basicVersion: {
        document: null,
        price: 0,
      },
      openVersion: {
        document: null,
        price: 0,
      },
      editableVersion: {
        document: null,
        price: 0,
      },
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
    form.setValue('basicVersion.document', file);
  };
  const handleOpenDocumentChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setOpenDocumentName(file ? file.name : '');
    form.setValue('openVersion.document', file);
  };
  const handleEditableDocumentChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setEditableDocumentName(file ? file.name : '');
    form.setValue('editableVersion.document', file);
  };
  

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const formData = new FormData();
    formData.append("title_AR", values.title_AR);
    formData.append("title_EN", values.title_EN);
    formData.append("description_AR", values.description_AR);
    formData.append("description_EN", values.description_EN);
    formData.append("body_EN", values.body_EN);
    formData.append("body_AR", values.body_AR);
    formData.append("category", values.category);
    formData.append("video", values.video);
    formData.append("coverImage", values.coverImage);
    formData.append("basic_version_document", values.basicVersion.document);
    formData.append("basic_version[price]", values.basicVersion.price.toString());
    formData.append("open_version_document", values.openVersion.document);
    formData.append("open_version[price]", values.openVersion.price.toString());
    formData.append("editable_version_document", values.editableVersion.document);
    formData.append("editable_version[price]", values.editableVersion.price.toString());
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
          title_AR: "",
          title_EN: "",
          description_AR: "",
          description_EN: "",
          category: "",
          video: null,
          coverImage: null,
          basicVersion: {
            document: null,
            price: 0,
          },
          openVersion: {
            document: null,
            price: 0,
          },
          editableVersion: {
            document: null,
            price: 0,
          },
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
            <FormField control={form.control} name="title_AR" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Arabic Title:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Title of the product' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="title_EN" render={({ field }) => (
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
                  <FormField control={form.control} name="basicVersion.price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Basic Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="openVersion.price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Open Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="editableVersion.price" render={({ field }) => (
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
            
            <div className='grid grid-cols-1 gap-5'>
              <FormField control={form.control} name="description_AR" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>* Arabic Description:</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder='Description of the product' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="description_EN" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>* English Description:</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder='Description of the product' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
            <div className="grid grid-cols-1 gap-11" >
                <FormField control={form.control} name="body_AR" render={({ field }) => (
                  <FormItem >
                    <FormLabel className='font-semibold'>* Arabic body:</FormLabel>
                    <FormControl >
                      <Controller control={form.control} name="body_AR" render={({ field }) => (
                        <ReactQuill value={field.value} onChange={field.onChange} theme='snow' className='h-[150px]' /> 
                      )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="body_EN" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* English body:</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="body_EN" render={({ field }) => (
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
              
            
            <FormField control={form.control} name="basicVersion.document" render={({ field }) => (
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
              
              <FormField control={form.control} name="openVersion.document" render={({ field }) => (
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

              <FormField control={form.control} name="editableVersion.document" render={({ field }) => (
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