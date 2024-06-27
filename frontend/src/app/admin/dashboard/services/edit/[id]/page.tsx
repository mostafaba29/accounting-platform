"use client";
import { useEffect, useState ,useRef } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  title: z.string().min(1, "Service title is required").max(100),
  body: z.string(),
  category:z.string().min(1,"category is required").max(50),
  coverImage: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditService() {
  const pathname = usePathname();
  let id = pathname?.split("/").pop();
  const [ServiceData, setServiceData] = useState(null);
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
      title: "",
      body: "",
    },
  });

  const handleCoverImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : '');
    form.setValue('coverImage', file);
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/services/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setServiceData(data);
          console.log(data);
          form.reset({
            title: data.title,
            category: data.category,
            body: data.body,
          });
        })
        .catch(error => console.error("Error fetching Service data", error));
    }
  }, [id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("category",values.category);
    if (values.coverImage) formData.append("coverImage", values.coverImage);
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
      if (response.data.message === "success") {
        toast({
          description: "Service updated successfully",
        });
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error updating Service",
        variant: "destructive",
      })
      console.log("Error updating Service", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/services'} />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Service</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Title</FormLabel>
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
            <FormField control={form.control} name="body" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Body</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="body" render={({ field }) => (
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
                ServiceData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Cover Image (Current)</h2>
                      <Image 
                        src={`/imgs/services/${ServiceData.coverImage}`} 
                        alt="service cover image" 
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
                ServiceData && (
                  <div className="mt-5 w-full">
                    <h2 className="font-semibold">Images (Current)</h2>
                    <div className="flex flex-row justify-between ">
                      {ServiceData.images.length > 0 ? (
                        ServiceData.images.map((image, index) => (
                          <Image 
                            key={index}
                            src={`/imgs/Services/${image}`} 
                            alt={`Service image ${index + 1}`} 
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
              <Link href='/admin/dashboard/services'>
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
