"use client";
import{ useEffect,useState,useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';
import BackButton from '@/components/Dashboard/BackButton';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { fetchAboutUsInfo, updateAboutUsInfo } from '@/lib/api/settingsRequests';
import { Textarea } from '@/components/ui/textarea';




const formSchema = z.object({
    _id: z.string(),
    aboutUs_AR: z.string().min(1, { message: "Please enter your Arabic about us" }),
    aboutUs_EN: z.string().min(1, { message: "Please enter your English about us" }),
    ourVision_AR: z.string().min(1, { message: "Please enter your Arabic our vision" }),
    ourVision_EN: z.string().min(1, { message: "Please enter your English our vision" }),
    messege_AR: z.string().min(1, { message: "Please enter your Arabic messege" }),
    messege_EN: z.string().min(1, { message: "Please enter your English messege" }),
    goals_AR: z.string().min(1, { message: "Please enter your Arabic goals" }),
    goals_EN: z.string().min(1, { message: "Please enter your English goals" }),
    coverImage:z.instanceof(File).refine((file) => file.size > 0, {
        message: 'Please select an image',
    })
});

type aboutUsData = z.infer<typeof formSchema>;


export default function AboutUsSettings() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [showCoverImageInput, setShowCoverImageInput] = useState(false);
    const [coverImageName, setCoverImageName] = useState('');
    const coverImageRef = useRef<HTMLInputElement>(null);

    const { data: aboutUsData, isFetched } = useQuery<aboutUsData>({
        queryKey: ['about-us'],
        queryFn: fetchAboutUsInfo,
        staleTime: 60 * 60 * 5,
    });

    const form = useForm<aboutUsData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            aboutUs_AR:'',
            aboutUs_EN:'',
            ourVision_AR:'',
            ourVision_EN:'',
            messege_AR:'',
            messege_EN:'',
            goals_AR:'',
            goals_EN:'',
            coverImage:null,
        },
    });



    useEffect(() => {
        if (isFetched && aboutUsData) {
            form.reset(aboutUsData);
        }
    }, [isFetched, aboutUsData, form]);

    const handleCoverImageChange = (e: { target: { files: any[]; }; } ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setCoverImageName(file ? file.name : '');
        form.setValue('coverImage', file);
    };

    const {mutateAsync} = useMutation({
        mutationFn: updateAboutUsInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-us'] });
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

    const onSubmit = async (data: aboutUsData) => {
       try{
        const formData = new FormData();
        formData.append("aboutUs_AR", data.aboutUs_AR);
        formData.append("aboutUs_EN", data.aboutUs_EN);
        formData.append("ourVision_AR", data.ourVision_AR);
        formData.append("ourVision_EN", data.ourVision_EN);
        formData.append("messege_AR", data.messege_AR);
        formData.append("messege_EN", data.messege_EN);
        formData.append("goals_AR", data.goals_AR);
        formData.append("goals_EN", data.goals_EN);
        if(data.coverImage instanceof File){
            formData.append("coverImage", data.coverImage);
        }
        await mutateAsync({data:formData,id:aboutUsData._id});
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
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 py-2 rounded-2xl">About us Content</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-6">
                        <input type="hidden" {...form.register('_id')} />
                        <FormField
                            control={form.control}
                            name="aboutUs_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>about us arabic</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="info about the company in arabic" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aboutUs_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>about us english</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="info about the company in english" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ourVision_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vision Arabic</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="company vision in arabic" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ourVision_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vision English</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="company vision in english" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="messege_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Arabic messege</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="company messege in arabic" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="messege_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English messege</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="company messege in english" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="goals_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Arabic goals</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="company goals in arabic" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="goals_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English goals</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="company goals in englsih" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {showCoverImageInput ? (
                <FormField control={form.control} name="coverImage" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Cover Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => coverImageRef.current?.click()}
                          className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                        >
                          {coverImageName ? 'Choose Another Image' : 'Upload Cover Image'}
                        </Button>
                        <input
                          type="file"
                          ref={coverImageRef}
                          onChange={handleCoverImageChange}
                          className="hidden"
                        />
                        {coverImageName && <p className="ml-2 font-medium">Selected Image: <b>{coverImageName}</b></p>}
                      </div>
                    </FormControl>
                    <Button onClick={() => setShowCoverImageInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                aboutUsData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Cover Image (Current)</h2>
                      <Image 
                        src={`/imgs/${aboutUsData.coverImage}`} 
                        alt="Product cover image" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-sky-800 " 
                        onClick={() => setShowCoverImageInput(true)}
                      />
                    </div>
                )
              )}
                        <Button type="submit" className="mt-6">Save</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}