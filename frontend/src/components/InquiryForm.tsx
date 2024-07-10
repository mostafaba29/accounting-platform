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
  import {Button} from "./ui/button";

const fromSchema = z.object({
    subject: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().min(1, { message: "Please enter your email" }),
    phone: z.string().min(1, { message: "Please enter your number" }),
    message: z.string().min(1, { message: "Please enter your message" }),
    file: z.instanceof(File).refine((file) => file.size > 0, {}).optional(),
})
export default function InquiryForm() {
    const form=useForm<z.infer<typeof fromSchema>>({
        resolver:zodResolver(fromSchema),
        defaultValues: {
            subject: "",
            email: "",
            phone: "",
            message: "",
            file:null,
        },
    })

    
    const onSubmit = async( data: z.infer<typeof fromSchema> )=>{
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/contact/contact_us",
                data,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            if (response.status === 200) {
                alert("message sent successfully");
                form.reset();
            } else {
                alert("something went wrong");
        }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] flex flex-col gap-4 border border-slate-600 p-6 rounded-md shadow-md">
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject:</FormLabel>
                                <Input
                                    placeholder="Name"
                                    {...field}
                                />
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
                                <Input
                                    placeholder="Email"
                                    {...field}
                                />
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
                                <Input
                                    placeholder="Phone Number"
                                    {...field}
                                />
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
                                    placeholder="type you inquiry here"
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload File:</FormLabel>
                                <Input
                                    {...field}
                                    type="file"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Send</Button>
                </form>
            </Form>
        </>
    );

}