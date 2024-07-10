"use client";
import {useRef,useState} from 'react';
import { useForm,Controller } from "react-hook-form";
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
import { X ,Plus} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";



const formSchema = z.object({
  name:z.string().min(1, { message: "Please enter client name" }),
  description:z.string().min(1, { message: "Please enter client description" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Please upload an image of the client" }),
});

export default function AddClient() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null); 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      image: null,
      name: '',
      position: '',
      brief: '',
      isFounder: false
    }
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();



  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      form.setValue('image', file);
    }
  };
  const removeImage = () => {
    setImage(null);
    form.setValue('image', null);
    if (imageRef.current) imageRef.current.value = "";
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("images", values.image); 
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/clients",
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
          description: "Client added successfully",
        });
        form.reset({
          name: "",
          position: "",
          description: "",
          isFounder: false,
          image: null,
        }
        );
        if (imageRef.current) imageRef.current.value = "";
        setImage(null);
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error saving Client",
        variant: "destructive",
      });
      console.log("Error saving Consultation", error);
    }
  };

  return (
    <div>
      <BackButton text={"Go Back"} link={"/admin/dashboard/settings/client-list"} />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new client</h1>
        <p className="text-gray-500 text-xs mb-2">Elements marked with * are <b>required</b></p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Client Name:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='the name of the client ' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Descripition:</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder='info about the client' />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="image" render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-semibold'>Image:</FormLabel>
                    <FormControl>
                    <div>
                        <div className="flex items-center">
                        {!image && (
                            <Button
                            type="button"
                            onClick={() => imageRef.current?.click()}
                            className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[80px]"
                            >
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                            </Button>
                        )}
                        <input
                            type="file"
                            ref={imageRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        </div>
                        {image && (
                        <div className="mt-2 flex items-center justify-between text-sm font-medium">
                            <p className="truncate font-semibold">{image.name}</p>
                            <Button
                            type="button"
                            onClick={removeImage}
                            className="ml-2 p-2 rounded-full bg-red-600 hover:bg-red-700"
                            >
                            <X className="h-3 w-4 text-white" />
                            </Button>
                        </div>
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
              <AlertDialogTitle>Do You want to add another client ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/settings/client-list'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-sky-800 hover:bg-sky-700 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
