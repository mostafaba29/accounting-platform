"use client";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
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
      if(response.data.message === "success") {
        toast({
          description: "Product updated successfully",
        });
        window.location.href = '/admin/dashboard/products';
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px]" >
              <div className="flex flex-col items-center gap-6">
              <div className="w-full grid grid-cols-3 gap-3">
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
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>
              
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="description" render={({ field }) => (
                      <ReactQuill value={field.value} onChange={field.onChange} className="w-full min-w-[1500px]"/>
                    )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>
              <div className="flex flex-row items-center justify-between">
              {showCoverImageInput ? (
                <FormField control={form.control} name="coverImage" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                      />
                    </FormControl>
                    <Button onClick={() => setShowCoverImageInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                productData && (
                  <div className="mt-5">
                    <h2 className="text-xl font-bold">Cover Image</h2>
                    <Image 
                      src={`/imgs/products/${productData.coverImage}`} 
                      alt="Product cover image" 
                      width={250} 
                      height={250} 
                      className="object-cover cursor-pointer" 
                      onClick={() => setShowCoverImageInput(true)}
                    />
                  </div>
                )
              )}
              {showImagesInput ? (
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
                    <Button onClick={() => setShowImagesInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                productData && (
                  <div className="mt-5">
                    <h2 className="text-xl font-bold">Images</h2>
                    <div className="flex space-x-4">
                      {productData.images.length > 0 ? (
                        productData.images.map((image, index) => (
                          <Image 
                            key={index}
                            src={`/imgs/products/${image}`} 
                            alt={`Product image ${index + 1}`} 
                            width={200} 
                            height={200} 
                            className="object-cover cursor-pointer" 
                            onClick={() => setShowImagesInput(true)}
                          />
                        ))
                      ) : (
                        <p>No images found.</p>
                      )}
                    </div>
                  </div>
                )
              )}
              </div>
              
              {showDocumentInput ? (
                <FormField control={form.control} name="document" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                      />
                    </FormControl>
                    <Button onClick={() => setShowDocumentInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                productData && (
                  <div className="mt-5 w-full flex flex-row justify-between">
                    <h2 className="text-xl font-bold">Document</h2>

                    <Link href={`/files/products/${productData.document}`} download className="text-blue-500 underline">
                      <Button>Download Document</Button>
                    </Link>
                    <Button onClick={() => setShowDocumentInput(true)} className="ml-2">
                      Update Document
                    </Button>
                  </div>
                )
              )}
              
              <Button type="submit" className="my-1 w-full">Save</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
