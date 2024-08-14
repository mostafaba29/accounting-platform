"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {useQueryClient,useMutation} from "@tanstack/react-query";
import { userLogin } from "@/lib/api/userApi";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
})

type loginFormData=z.infer< typeof loginFormSchema>
export default function Login() {

  const {toast}=useToast();
  const form=useForm<loginFormData>({
    resolver:zodResolver(loginFormSchema),
  })
  const {mutateAsync,isPending,isError} = useMutation({
    mutationFn:userLogin,
    onSuccess:()=>{
      window.location.href='/';
    },
    onError:()=>{
      toast({
        description: "something went wrong",
        variant: "destructive",
      });
    }
  })

  const onSubmit= async (data:loginFormData) => {
    try{
      mutateAsync(data);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <main className="w-full h-screen grid grid-cols-2 justify-items-center items-center">
      <div className="flex flex-col items-center justify-center p-6 gap-3 md:gap-6 bg-amber-700/15 h-[55%] w-[45%] rounded-3xl shadow-md">
            <h1 className="text-3xl font-bold">Login to your account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-3" >
              <FormField 
                control={form.control}
                name='email'
                render={({ field }) =>(
                  <FormItem className="w-full">
                    <FormLabel>Email:</FormLabel>
                      <Input
                        placeholder="type your registered email..."
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name='password'
                render={({ field }) =>(
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                      <Input
                        placeholder="type your account password..."
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                )}
                />
                <Button type='submit'>Login</Button>
            </form>
            </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      <div className="hidden bg-muted lg:block lg:h-full lg:w-full">
        <Image
          src="/imgs/auth/credImage.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-fit"
        />
      </div>
    </main>
    </>
  );
}
