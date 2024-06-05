"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from 'zod';
import axios from 'axios';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "./ui/form"
import { Input } from "./ui/input";

const fromSchema = z.object({
    email: z.string().min(1, { message: 'Please enter your email' }),
    password: z.string().min(1, { message: 'Please enter your password' }),
});

interface AdminLoginFormProps {
    isLoggedIn:boolean;
    onLoginSuccess: () => void;
}
export default function AdminLoginForm({isLoggedIn, onLoginSuccess}: AdminLoginFormProps) {
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof fromSchema>) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', data);
            console.log(response.data.data.user);
            if (response.status === 200 && response.data.data.user.role == 'admin') {
                console.log('response', response.data);
                onLoginSuccess();
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Sheet open={!isLoggedIn}>
            {/* <SheetTrigger asChild></SheetTrigger> */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Admin Login</SheetTitle>
                    <SheetDescription> 
                        Please enter your admin credentials
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" >
                        <div className="space-y-4 py-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <button type="submit" className="w-full">
                                Login
                            </button>
                            {form.formState.errors.email && (
                                <p className="text-red-500">{form.formState.errors.email.message}</p>
                            )}
                            {form.formState.errors.password && (
                                <p className="text-red-500">{form.formState.errors.password.message}</p>
                                )}
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
        // <FormProvider {...methods}>
        //     <Sheet>
        //         <SheetTrigger>Login</SheetTrigger>
        //         <SheetContent>
        //             <SheetHeader>
        //                 <SheetTitle>Admin Login</SheetTitle>
        //                 <SheetDescription>
        //                     Please enter your admin credentials
        //                 </SheetDescription>
        //             </SheetHeader>
        //             <Form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        //                 <div className="space-y-4 py-6">
        //                     <FormField
        //                         name="username"
        //                         render={({ field }) => (
        //                             <FormItem>
        //                                 <FormLabel>Username</FormLabel>
        //                                 <FormControl>
        //                                     <Input placeholder="Username" {...field} />
        //                                 </FormControl>
        //                                 <FormDescription>
        //                                     Please enter your username
        //                                 </FormDescription>
        //                                 <FormMessage />
        //                             </FormItem>
        //                         )}
        //                     />
        //                     <FormField
        //                         name="password"
        //                         render={({ field }) => (
        //                             <FormItem>
        //                                 <FormLabel>Password</FormLabel>
        //                                 <FormControl>
        //                                     <Input type="password" placeholder="Password" {...field} />
        //                                 </FormControl>
        //                                 <FormDescription>
        //                                     Please enter your password
        //                                 </FormDescription>
        //                                 <FormMessage />
        //                             </FormItem>
        //                         )}
        //                     />
        //                 </div>
        //                 <div className="flex justify-end space-x-2 py-4">
        //                     <SheetTrigger>Cancel</SheetTrigger>
        //                     <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Login</button>
        //                 </div>
        //             </Form>
        //         </SheetContent>
        //     </Sheet>
        // </FormProvider>
    );
}
