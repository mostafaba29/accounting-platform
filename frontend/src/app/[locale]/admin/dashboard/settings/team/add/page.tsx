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
import BackButton from "@/components/Dashboard/BackButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



const formSchema = z.object({
  name:z.string().min(1, { message: "Please enter member name" }),
  position:z.string().min(1, { message: "Please enter member position" }),
  brief:z.string().min(1, { message: "Please enter member description" }),
  isFounder:z.boolean().default(false),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Please upload an image of the member" }),
});

export default function AddMember() {
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
    formData.append("position", values.position);
    formData.append("brief", values.brief);
    formData.append("isFounder", values.isFounder.toString());
    formData.append("images", values.image); 
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/members",
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
          description: "Member added successfully",
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
        description: "Error saving Member",
        variant: "destructive",
      });
      console.log("Error saving Consultation", error);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new member</h1>
        <p className="text-gray-500 text-xs mb-2">Elements marked with * are <b>required</b></p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Member Name:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='the name of the member ' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField control={form.control} name="isFounder" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Is Founder:</FormLabel>
                  <FormControl>
                    <Input {...field} type="boolean" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

            <FormField control={form.control} name="position" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Position:</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder='position of the member' />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="brief" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Brief:</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder='brief words about the member' />
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
              <AlertDialogTitle>Do You want to add another member ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/settings/about-us'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-sky-800 hover:bg-sky-700 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
