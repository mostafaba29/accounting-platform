"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import BackButton from '@/components/BackButton';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
const fromSchema = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    facebook: z.string().optional(),
    whatsapp: z.string().optional(),
});
export default function ContactUs () {

    const [data, setData] = useState([]);
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            email: data.email,
            phone: data.phone,
            facebook: data.facebook,
            whatsapp: data.whatsapp,
        },
    });

    const fetchContactUs = async () => {
        try{
            const response = await axios.get('http://localhost:8000/api/v1/contact');
            setData(response.data.data.data[0]);
            form.reset({
                email: response.data.data.data[0].email,
                phone: response.data.data.data[0].phone,
                facebook: response.data.data.data[0].facebook,
                whatsapp: response.data.data.data[0].whatsapp,
            })
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchContactUs();
    }, []);
    const {toast} = useToast();
    
    async function onSubmit(values: z.infer<typeof fromSchema>) {
        try {
            const response = await axios.patch('http://localhost:8000/api/v1/contact', values);
            if (response.status === 200) {
                toast({
                    title: "Saved successfully",
                    description: "Contact us updated successfully",
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <BackButton text={'Go back'} link={'/admin/dashboard/settings'} />
            <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800  py-2 rounded-2xl">Contact Us page info</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Facebook" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Whatsapp</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Whatsapp" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        </div>
        </div>
    )
}