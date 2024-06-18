import {Button} from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
    review: z.string().optional(),
    score: z
    .preprocess((val) => Number(val), z.number().min(0).max(5).positive("review score must be a positive number between 0 and 5")),
});

interface ReviewDialogProps {
    Id: string;
    type: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ReviewDialog({ Id, type, isOpen, onClose }: ReviewDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        if(data.review){
            formData.append("review", data.review);
        }
        formData.append("score", data.score.toString());
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/reviews/${Id}`,
                formData,
                {
                    withCredentials: true,
                }
            );
            onClose();
            console.log(response.data);
        } catch (error) {
            console.log("Error saving review", error);
            onClose();
        }
    };

    return(
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add your review</DialogTitle>
                    <DialogDescription>
                        Give your score and optionally write a review for this {type}.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <FormField 
                            control={form.control}
                            name="score"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Score</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Score"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="review"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Review"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        )

}