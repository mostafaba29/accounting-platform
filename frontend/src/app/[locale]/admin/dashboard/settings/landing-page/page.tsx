"use client";
import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import BackButton from '@/components/Dashboard/BackButton';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { fetchLandingPageData, updateLandingPageData } from '@/lib/api/settingsRequests';
import { Textarea } from '@/components/ui/textarea';
import { Users, CheckCircle, Star, Rocket, Zap, Shield, Target, Headphones } from 'lucide-react';

interface Service {
    _id?: string;
    title_AR: string;
    title_EN: string;
    description_AR: string;
    description_EN: string;
    icon: string;
}

const formSchema = z.object({
    _id: z.string(),
    intro_AR: z.string().min(1, { message: "Please enter your Arabic intro" }),
    intro_EN: z.string().min(1, { message: "Please enter your English intro" }),
    services: z.array(z.object({
        _id: z.string().optional(),
        title_AR: z.string().min(1, { message: "Please enter your Arabic title" }),
        title_EN: z.string().min(1, { message: "Please enter your English title" }),
        description_AR: z.string().min(1, { message: "Please enter your Arabic description" }),
        description_EN: z.string().min(1, { message: "Please enter your English description" }),
        icon: z.string().min(1, { message: "Please select an icon" }),
    })),
});

type LandingPageData = z.infer<typeof formSchema>;

const icons = [
    { name: 'Users', component: Users },
    { name: 'CheckCircle', component: CheckCircle },
    { name: 'Star', component: Star },
    { name: 'Rocket', component: Rocket },
    { name: 'Zap', component: Zap },
    { name: 'Shield', component: Shield },
    { name: 'Target', component: Target },
    { name: 'Headphones', component: Headphones },
];

export default function LandingPageSettings() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: landingPageData, isFetched } = useQuery<LandingPageData>({
        queryKey: ['landingPageData'],
        queryFn: fetchLandingPageData,
        staleTime: 60 * 60 * 5,
    });

    const form = useForm<LandingPageData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: '',
            intro_AR: '',
            intro_EN: '',
            services: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "services",
    });

    useEffect(() => {
        if (isFetched && landingPageData) {
            form.reset(landingPageData);
        }
    }, [isFetched, landingPageData, form]);

    const {mutateAsync} = useMutation({
        mutationFn: updateLandingPageData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landingPageData'] });
            toast({
                title: "Settings updated",
                description: "Your landing page settings have been successfully updated.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "There was an error updating your settings. Please try again.",
                variant: "destructive",
            });
        },
    });

    const onSubmit = async (data: LandingPageData) => {
       try{
        await mutateAsync(data);
       }catch(error){
        console.log(error);
       }
    };

    if (!isFetched) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <BackButton text={'Go back'} link={'en/admin/dashboard/settings'} />
            <div className="flex flex-col items-center justify-center min-h-screen py-12">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 py-2 rounded-2xl">Landing Page Content</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-6">
                        <input type="hidden" {...form.register('_id')} />
                        <FormField
                            control={form.control}
                            name="intro_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Arabic introduction</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Arabic introduction" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="intro_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English introduction</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="English introduction" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Services</h2>
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border rounded">
                                    <input type="hidden" {...form.register(`services.${index}._id`)} />
                                    <FormField
                                        control={form.control}
                                        name={`services.${index}.title_AR`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Arabic Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`services.${index}.title_EN`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>English Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`services.${index}.description_AR`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Arabic Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`services.${index}.description_EN`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>English Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`services.${index}.icon`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Icon</FormLabel>
                                                <FormControl>
                                                    <div className="flex space-x-4">
                                                        {icons.map((icon) => (
                                                            <div
                                                                key={icon.name}
                                                                onClick={() => field.onChange(icon.name)}
                                                                className={`p-2 border rounded cursor-pointer ${field.value === icon.name ? 'border-blue-500' : 'border-gray-300'}`}
                                                            >
                                                                <icon.component className="w-6 h-6" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                        Remove Service
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() => append({ title_AR: '', title_EN: '', description_AR: '', description_EN: '', icon: '' })}
                            >
                                Add Service
                            </Button>
                        </div>
                        <Button type="submit" className="mt-6">Save</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}