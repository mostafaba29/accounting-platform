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
import {useMutation,useQueryClient} from '@tanstack/react-query';
import { AddClients } from '@/lib/api/settingsRequests';



const formSchema = z.object({
  name_AR:z.string().min(1, { message: "Please enter client name in arabic" }),
  name_EN:z.string().min(1, { message: "Please enter client name in english" }),
});

export default function AddClient() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name_AR: "",
      name_EN: "",
    }
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: AddClients,
    onSuccess: () => {
      setSaveDialogOpen(false);
      toast({
        title: "Success",
        description: "Client added successfully",
      });
    },
    onError: () => {
      toast({
        description: "Error saving Client",
        variant: "destructive",
      });
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name_AR", values.name_AR);
    formData.append("name_EN", values.name_EN);
    try {
      await mutateAsync(formData);
  }catch(error){
    console.log(error);
  }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new client</h1>
        <p className="text-gray-500 text-xs mb-2">Elements marked with * are <b>required</b></p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
            <FormField control={form.control} name="name_AR" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Client arabic name:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='the name of the client in arabic ' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="name_EN" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Client english name:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='the name of the client in english' />
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
