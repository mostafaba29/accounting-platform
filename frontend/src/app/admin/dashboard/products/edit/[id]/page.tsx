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
import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string(),
  price: z
    .preprocess((val) => Number(val), z.number().positive("Product price must be a positive number")),
  coverImage: z.instanceof(File).optional(),
  document: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditProduct() {
  const pathname = usePathname();
  let id = pathname?.split("/").pop();
  const [productData, setProductData] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/products/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setProductData(data);
          console.log(data);
          form.reset({
            name: data.name,
            description: data.description,
            price: data.price,
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
    if (values.coverImage) formData.append("coverImage", values.coverImage);
    if (values.document) formData.append("document", values.document);
    if (values.images) {
      values.images.forEach((image, index) => {
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
    } catch (error) {
      console.log("Error updating product", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/products'} />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Product</h1>
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
            <FormField control={form.control} name="coverImage" render={({ field }) => (
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
            <FormField control={form.control} name="document" render={({ field }) => (
              <FormItem>
                <FormLabel>document</FormLabel>
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
        {productData && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Current Images</h2>
            <div className="flex space-x-4">
              {productData.images.length > 0? (
                productData.images.map((image, index) => (
                  <Image key={index} src={`/imgs/products/${image}`} alt={`Product image ${index + 1}`} width={200} height={200} className="object-cover" />
                ))
              ) : (
                <p>No images found.</p>
              )}
            </div>
            <h2 className="text-xl font-bold mt-5">Cover Image</h2>
            <Image src={`/imgs/products/${productData.coverImage}`} alt="Product cover image" width={200} height={200} className="object-cover" />
            <Link href={`/files/products/${productData.document}`} download className="text-blue-500 underline">Download current file</Link> 
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
