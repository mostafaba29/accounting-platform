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
    name:z.string().min(1, { message: "Please enter member name" }),
    position:z.string().min(1, { message: "Please enter member position" }),
    brief:z.string().min(1, { message: "Please enter member description" }),
    isFounder:z.boolean().default(false),
    image: z
      .instanceof(File)
      .refine((file) => file.size > 0, { message: "Please upload an image of the member" }),
});

export default function EditMember({ params }:{params:{id:string}}) {
  let id = params.id;
  const [MemberData, setMemberData] = useState(null);
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
      position: '',
      brief: '',
      isFounder: false
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
      axios.get(`http://localhost:8000/api/v1/about/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setMemberData(data);
          console.log(data);
          form.reset({
            name: data.name,
            position: data.position,
            brief: data.brief,
            isFounder: data.isFounder,
            image: null
          });
        })
        .catch(error => console.error("Error fetching Member data", error));
    }
  }, [id,form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if(values.name) formData.append("name", values.name);
    if(values.position) formData.append("position", values.position);
    if(values.brief) formData.append("brief", values.brief);
    if(values.isFounder) formData.append("isFounder", values.isFounder.toString());
    if(values.image) formData.append("images", values.image);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/about/${id}`,
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
          description: "Member updated successfully",
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
      <BackButton text={'Go Back'} link={'/admin/dashboard/settings/about-us'} />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">Edit {MemberData?.name}</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Member Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="position" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Position</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

            
            <FormField control={form.control} name="isFounder" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Is Founder:</FormLabel>
                  <FormControl>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true" >
                          Yes
                        </SelectItem>
                        <SelectItem value="false" >
                          No
                        </SelectItem>
                    </SelectContent>
                  </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
       
            <FormField control={form.control} name="brief" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Member Description:</FormLabel>
                <FormControl>
                    <Input {...field} type="text"  />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            
            {showImageInput ? (
                <FormField control={form.control} name="coverImage" render={({ field }) => (
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
                MemberData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Image (Current)</h2>
                      <Image 
                        src={`/imgs/${MemberData.images[0]}`} 
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
