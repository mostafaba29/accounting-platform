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

const formSchema = z.object({
    email: z.string().min(1, { message: "Please enter your email" }),
    phone: z.string().min(1, { message: "Please enter your number" }),
    message: z.string().min(1, { message: "Please enter your message" }),
    file: z.instanceof(File).refine((file) => file.size > 0, {
        message: "Please upload a file",
    }),
});

export default function JoinForm() {
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

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = {
                subject: "job application",
                message: "application for a job",
                ...data,
            };

            const response = await axios.post(
                "http://localhost:8000/api/v1/contact/contact_us",
                formData,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            if (response.status === 200) {
                alert("Message sent successfully");
                form.reset(); // Reset form after successful submission
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[50%] flex flex-col gap-4 border border-slate-600 p-6 rounded-md shadow-md">
                {/* Email */}
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
                {/* Phone Number */}
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
                {/* File Upload */}
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload File:</FormLabel>
                            <Input {...field} type="file" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Submit Button */}
                <Button type="submit">Send</Button>
            </form>
        </Form>
    );
}
