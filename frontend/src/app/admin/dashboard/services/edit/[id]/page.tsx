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
  name: z.string().min(1, "Service name is required").max(100),
  body: z.string(),
  imageCover: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditService() {
  const pathname = usePathname();
  let id = pathname?.split("/").pop();
  const [ServiceData, setServiceData] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      body: "",
    },
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/services/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setServiceData(data);
          console.log(data);
          form.reset({
            name: data.name,
            body: data.body,
          });
        })
        .catch(error => console.error("Error fetching Service data", error));
    }
  }, [id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.body);
    if (values.imageCover) formData.append("coverImage", values.imagecover);
    if (values.images) {
      values.images.forEach((image, index) => {
        formData.append('images', image);
      });
    }
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/services/${id}`,
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
      console.log("Error updating Service", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/services'} />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Service</h1>
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
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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
        {ServiceData && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Current Images</h2>
            <div className="flex space-x-4">
              {ServiceData.images.length > 0? (
                ServiceData.images.map((image, index) => (
                  <Image key={index} src={`/imgs/services/${image}`} alt={`Service image ${index + 1}`} width={200} height={200} className="object-cover" />
                ))
              ) : (
                <p>No images found.</p>
              )}
            </div>
            <h2 className="text-xl font-bold mt-5">Cover Image</h2>
            <Image src={`/imgs/services/${ServiceData.imageCover}`} alt="Service cover image" width={200} height={200} className="object-cover" />
             
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
