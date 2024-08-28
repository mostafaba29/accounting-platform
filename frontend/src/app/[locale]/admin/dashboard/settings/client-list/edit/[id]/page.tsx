"use client";
import { useEffect, useState ,useRef } from "react";
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
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/Dashboard/BackButton";
import Image from "next/image";
import Link from "next/link";


const formSchema = z.object({
    name:z.string().min(1, { message: "Please enter client name" }),
    description:z.string().min(1, { message: "Please enter client description" }),
    image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Please upload an image of the client" }),
});

export default function EditClient({ params }:{params:{id:string}}) {
  let id = params.id;
  const [ClientData, setClientData] = useState(null);
  const [imageName, setImageName] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      name: '',
      description: '',
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageName(file ? file.name : '');
    form.setValue('image', file);
  };

  const removeImage = () => {
    form.setValue('image', null);
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/clients/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setClientData(data);
          console.log(data);
          form.reset({
            name: data.name,
            description: data.description,
            image: null
          });
        })
        .catch(error => console.error("Error fetching Client data", error));
    }
  }, [id,form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if(values.name) formData.append("name", values.name);
    if(values.description) formData.append("description", values.description);
    if(values.image) formData.append("images", values.image);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/clients/${id}`,
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
          description: "Client updated successfully",
        });
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error updating member",
        variant: "destructive",
      })
      console.log("Error updating member", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/settings/client-list'} />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">Edit {ClientData?.name}</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Client Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Client Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            {showImageInput ? (
                <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => imageRef.current?.click()}
                          className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                        >
                          {imageName ? 'Choose Another Image' : 'Upload Image'}
                        </Button>
                        <input
                          type="file"
                          ref={imageRef}
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {imageName && <p className="ml-2 font-medium">Selected Image: <b>{imageName}</b></p>}
                      </div>
                    </FormControl>
                    <Button onClick={() => setShowImageInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                ClientData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Image (Current)</h2>
                      <Image 
                        src={`/imgs/${ClientData.images[0]}`} 
                        alt="member image" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-sky-800 " 
                        onClick={() => setShowImageInput(true)}
                      />
                    </div>
                )
              )}
    
            <Button type="submit" className="my-1 w-full">Save</Button>
          </form>
        </Form>
        <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
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
      </div>
    </div>
  );
}
