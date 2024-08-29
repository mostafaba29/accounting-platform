"use client";
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
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { fetchOneClient ,updateClients} from '@/lib/api/settingsRequests';
import { useState } from "react";

const formSchema = z.object({
  name_AR:z.string().min(1, { message: "Please enter client name in arabic" }),
  name_EN:z.string().min(1, { message: "Please enter client name in english" }),
});

export default function EditClient({ params }:{params:{id:string}}) {
  let id = params.id;
  const {data:client,isLoading,isError}=useQuery({
    queryKey: ['client',id],
    queryFn: () => fetchOneClient(id),
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24
  })
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_AR: client?.name_AR,
      name_EN: client?.name_EN,
    },
  });


  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("name_AR", values.name_AR);
    formData.append("name_EN", values.name_EN);

    try {
      const response = await updateClients({id:id,data:formData});
      toast({
        title: "Success",
        description: "Client updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">Edit {client?.name_EN}</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">

            <FormField control={form.control} name="name_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Client name in arabic</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
             <FormField control={form.control} name="name_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Client name in english</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            
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
