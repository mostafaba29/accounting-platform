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
import { fetchPrivacyPolicyInfo, updatePrivacyPolicyInfo } from '@/lib/api/settingsRequests';
import { Textarea } from '@/components/ui/textarea';




const formSchema = z.object({
    _id: z.string(),
    description_AR: z.string().min(1, { message: "Please enter your Arabic description" }),
    description_EN: z.string().min(1, { message: "Please enter your English description" }),
    coverImage:z.instanceof(File).refine((file) => file.size > 0, {
        message: 'Please select an image',
    })
});

type privacyPolicyData = z.infer<typeof formSchema>;


export default function PrivacyPolicySettings() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [showCoverImageInput, setShowCoverImageInput] = useState(false);
    const [coverImageName, setCoverImageName] = useState('');
    const coverImageRef = useRef<HTMLInputElement>(null);

    const { data: privacyPolicyData, isFetched } = useQuery<privacyPolicyData>({
        queryKey: ['privacy-policy'],
        queryFn: fetchPrivacyPolicyInfo,
        staleTime: 60 * 60 * 5,
    });

    const form = useForm<privacyPolicyData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description_AR:'',
            description_EN:'',
            coverImage:null,
        },
    });



    useEffect(() => {
        if (isFetched && privacyPolicyData) {
            form.reset(privacyPolicyData);
        }
    }, [isFetched, privacyPolicyData, form]);

    const handleCoverImageChange = (e: { target: { files: any[]; }; } ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setCoverImageName(file ? file.name : '');
        form.setValue('coverImage', file);
    };

    const {mutateAsync} = useMutation({
        mutationFn: updatePrivacyPolicyInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['privacy-policy'] });
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

    const onSubmit = async (data: privacyPolicyData) => {
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
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 py-2 rounded-2xl">Privacy policy Content</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-6">
                        <input type="hidden" {...form.register('_id')} />
                        <FormField
                            control={form.control}
                            name="description_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Privacy policy arabic</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="privacy policy in Arabic" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Privacy policy english</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="privacy policy in English" {...field} />
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
                                privacyPolicyData && (
                                <div className="mt-5">
                                    <h2 className="font-semibold">Cover Image (Current)</h2>
                                    <Image 
                                        src={`/imgs/${privacyPolicyData.coverImage}`} 
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