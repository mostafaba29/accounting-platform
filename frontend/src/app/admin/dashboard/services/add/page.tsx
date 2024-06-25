"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";

const formSchema = z.object({
  title: z.string().min(1, "Service title is required").max(100),
  body: z.string(),
  category: z.string().min(1, "Category is required").max(100),
  coverImage: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Cover image is required",
  }),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddService() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("coverImage", values.coverImage);
    formData.append("category", values.category);
    console.log(values.images);
    if (values.images) {
      values.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/services",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data.message === "success") {
        toast({
          description: "Service added successfully",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        description: "Error saving serivce",
        variant: "destructive",
      });
      console.log("Error saving serivce", error);
    }
  };

  return (
    <div>
      <BackButton text={"Go Back"} link={"/admin/dashboard/services"} />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Add Service</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[1200px] w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? Array.from(e.target.files) : []
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className=" mt-1 w-full ">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
