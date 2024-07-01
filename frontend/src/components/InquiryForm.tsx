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
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().min(1, { message: "Please enter your email" }),
    number: z.string().min(1, { message: "Please enter your number" }),
    message: z.string().min(1, { message: "Please enter your message" }),
})
export default function InquiryForm() {
    const form=useForm<z.infer<typeof fromSchema>>({
        resolver:zodResolver(fromSchema),
        defaultValues: {
            name: "",
            email: "",
            number: "",
            message: "",
        },
    })

    const onSubmit = async( data: z.infer<typeof fromSchema> )=>{
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/inquiries",
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[50%] flex flex-col gap-4 border border-slate-600 p-6 rounded-md shadow-md">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
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
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number:</FormLabel>
                                <Input
                                    placeholder="Number"
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
                    <Button type="submit">Send</Button>
                </form>
            </Form>
        </>
    );

}