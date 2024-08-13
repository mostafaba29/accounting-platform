"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
  } from "./ui/form";
  import { Input } from "./ui/input";
  import { Button } from "./ui/button";
  import { useQueryClient,useMutation } from "@tanstack/react-query";
  import { postInquiry } from "@/lib/api/generalRequests";
  import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
    subject: z.string().min(1, { message: "Please enter the job title" }),
    email: z.string().min(1, { message: "Please enter your email" }),
    phone: z.string().min(1, { message: "Please enter your number" }),
    message: z.string().min(1, { message: "Please enter your message" }),
    file: z.custom<FileList>()
    .refine((files) => files?.length === 0 || files?.length === 1, "Please upload one file")
    .transform(files => files?.[0]),
});

export default function JoinForm() {
    const {toast} = useToast();

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            subject: "",
            email: "",
            phone: "",
            message: "",
            file:null,
        },
    })

    const {mutateAsync,isPending,isError} = useMutation({
        mutationFn:postInquiry,
        onSuccess:()=>{
            toast({
                description: "your application has been submitted",
              });
              form.reset();
        },
        onError:()=>{
            toast({
                description: "something went wrong",
                variant: "destructive",
              });
        }
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'file' && value instanceof File) {
                  formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                  formData.append(key, value as string);
                }
              });
            await mutateAsync(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[50%] flex flex-col gap-4 border border-slate-600 p-6 rounded-md shadow-md">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title:</FormLabel>
                            <Input placeholder="type the job title you are applying for ..." {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <Input placeholder="Email" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number:</FormLabel>
                            <Input placeholder="Phone Number" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Inquiry:</FormLabel>
                                <Input
                                    placeholder="type your past experience here..."
                                    {...field} 
                                    type="textarea"
                                    className="h-[150px]"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <FormField
                        control={form.control}
                        name="file"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                            <FormLabel>Upload File:</FormLabel>
                            <FormControl>
                                <Input
                                type="file"
                                onChange={(e) => {
                                    onChange(e.target.files);
                                }}
                                {...rest}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                <Button type="submit">Send</Button>
            </form>
        </Form>
    );
}
