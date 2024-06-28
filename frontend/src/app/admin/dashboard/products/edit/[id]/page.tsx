"use client";
import { useEffect, useState , useRef } from "react";
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
import { FileDown } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string(),
  price: z
    .preprocess((val) => Number(val), z.number().positive("Product price must be a positive number")),
  category:z.string().min(1, "category is required"),
  coverImage: z.instanceof(File).optional(),
  document: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditProduct() {
  const pathname = usePathname();
  let id = pathname?.split("/").pop();
  const [productData, setProductData] = useState(null);
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [showImagesInput, setShowImagesInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState('');
  const [documentName, setDocumentName] = useState('');

  const coverImageRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      coverImage: null,
      document: null,
      images: [],
    },
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/products/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setProductData(data);
          form.reset({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
          });
        })
        .catch(error => console.error("Error fetching product data", error));
    }
  }, [id]);

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
    formData.append("category", values.category);
    if (values.coverImage) formData.append("coverImage", values.coverImage);
    if (values.document) formData.append("document", values.document);
    if (values.images) {
      values.images.forEach((image) => {
        formData.append('images', image);
      });
    }
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/products/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if(response.data.status === "success") {
        toast({
          description: "Product updated successfully",
        });
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error updating product",
        variant: "destructive",
      })
      console.log("Error updating product", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/products'} />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <div >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center" >
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
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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
                productData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Cover Image (Current)</h2>
                      <Image 
                        src={`/imgs/products/${productData.coverImage}`} 
                        alt="Product cover image" 
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
                productData && (
                  <div className="mt-5 w-full">
                    <h2 className="font-semibold">Images (Current)</h2>
                    <div className="flex flex-row justify-between ">
                      {productData.images.length > 0 ? (
                        productData.images.map((image, index) => (
                          <Image 
                            key={index}
                            src={`/imgs/products/${image}`} 
                            alt={`Product image ${index + 1}`} 
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
              
              {showDocumentInput ? (
                  <FormField control={form.control} name="document" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Document</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            onClick={() => documentRef.current?.click()}
                            className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                          >
                            {documentName ? 'Choose Another Document' : 'Upload Document'}
                          </Button>
                          <input
                            type="file"
                            ref={documentRef}
                            onChange={handleDocumentChange}
                            className="hidden"
                          />
                          {documentName && <p className="ml-2">Selected Document: <b>{documentName}</b></p>}
                        </div>
                      </FormControl>
                      <Button onClick={() => setShowDocumentInput(false)} className="mt-2">Cancel</Button>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                ) : (
                  productData && (
                    <div className="mt-5 w-full flex flex-col ">
                      <h2 className="font-semibold">Document (Current)</h2>
                      <div className="flex flex-row justify-between mt-1">
                        <Link href={`/files/products/${productData.document}`} download className="text-blue-500 underline">
                          <Button>
                          <p className="mr-2">{productData.document}</p> <FileDown size={18}/> 
                          </Button>
                        </Link>
                        <Button onClick={() => setShowDocumentInput(true)} className="ml-2">
                          Update Document
                        </Button>
                      </div>
                      
                    </div>
                  )
                )}
              
              <Button type="submit" className="my-3 w-full">Save</Button>
            </form>
          </Form>
        </div>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
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
