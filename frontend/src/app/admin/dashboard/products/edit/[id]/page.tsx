"use client";
import { useEffect, useState , useRef } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categories } from "@/components/types/Categories";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import { FileDown } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  title_AR: z.string().optional(),
  title_EN: z.string().optional(),
  description_AR: z.string().optional(),
  description_EN: z.string().optional(),
  body_AR: z.string().optional(),
  body_EN: z.string().optional(),
  video: z.instanceof(File).optional(),
  basicVersion: z.object({
    document: z.instanceof(File).optional(),
    price: z.preprocess((val) => Number(val), z.number().positive("Product price must be a positive number").optional())
  }),
  openVersion: z.object({
    document: z.instanceof(File).optional(),
    price: z.preprocess((val) => Number(val), z.number().positive("Product price must be a positive number").optional())
  }),
  editableVersion: z.object({
    document: z.instanceof(File).optional(),
    price: z.preprocess((val) => Number(val), z.number().positive("Product price must be a positive number").optional())
  }),
  category: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditProduct({ params }: { params: { id: string } }) {
  let id = params.id;
  const [productData, setProductData] = useState(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [coverImageName, setCoverImageName] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [videoName, setVideoName] = useState('');
  const [showImagesInput, setShowImagesInput] = useState(false);
  const [showBasicDocumentInput, setShowBasicDocumentInput] = useState(false);
  const [basicDocumentName, setBasicDocumentName] = useState('');
  const [showOpenDocumentInput, setShowOpenDocumentInput] = useState(false);
  const [openDocumentName, setOpenDocumentName] = useState('');
  const [showEditableDocumentInput, setShowEditableDocumentInput] = useState(false);
  const [editableDocumentName, setEditableDocumentName] = useState('');

  const coverImageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const basicDocumentRef = useRef<HTMLInputElement>(null);
  const openDocumentRef = useRef<HTMLInputElement>(null);
  const editableDocumentRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_AR: '',
      title_EN: '',
      description_AR: '',
      description_EN: '',
      body_AR: '',
      body_EN: '',
      category: '',
      video: null,
      basicVersion: {
        document: '',
        price: null,
      },
      openVersion: {
        document: '',
        price: null,
      },
      editableVersion: {
        document: '',
        price: null,
      },
    },
  });

  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/products/${id}`)
        .then(response => {
          const data = response.data.data.data;
          setProductData(data);
          console.log(data);
          form.reset({
            title_AR: data.title_AR,
            title_EN: data.title_EN,
            body_AR: data.body_AR,
            body_EN: data.body_EN,
            description_AR: data.description_AR,
            description_EN: data.description_EN,
            category: data.category,
            basicVersion: {
              price:data.basic_version.price,
            },
            openVersion: {
              price:data.open_version.price,
            },
            editableVersion: {
              price:data.editable_version.price,
            },
          });
        })
        .catch(error => console.error("Error fetching Consult data", error));
    }
  }, [id,form]);
  const handleCoverImageChange = (e: { target: { files: any[]; }; } ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : '');
    form.setValue('coverImage', file);
  };
  
  const handleVideoChange = (e: {target: {files:any[];};})=>{
    const file = e.target.files ? e.target.files[0] : null;
    setVideoName(file ? file.name : '');
    form.setValue('video', file);
  }
  const handleBasicDocumentChange = (e: { target: { files: any[]; }; } ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setBasicDocumentName(file ? file.name : '');
    form.setValue('basicVersion.document', file);
  };
  
  const handleOpenDocumentChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files ? e.target.files[0] : null;
    setOpenDocumentName(file ? file.name : '');
    form.setValue('openVersion.document', file);
  };
  
  const handleEditableDocumentChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files ? e.target.files[0] : null;
    setEditableDocumentName(file ? file.name : '');
    form.setValue('editableVersion.document', file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if(values.title_AR && values.title_AR !== productData?.title_AR)formData.append("title_AR", values.title_AR);
    if(values.title_EN && values.title_EN !== productData?.title_EN)formData.append("title_EN", values.title_EN);
    if(values.description_AR && values.description_AR !== productData?.description_AR)formData.append("description_AR", values.description_AR);
    if(values.description_EN && values.description_EN !== productData?.description_EN)formData.append("description_EN", values.description_EN);
    if(values.body_EN && values.body_EN !== productData?.body_EN)formData.append("body_EN", values.body_EN);
    if(values.body_AR && values.body_AR !== productData?.body_AR)formData.append("body_AR", values.body_AR);
    if(values.category && values.category !== productData?.category)formData.append("category", values.category);
    if(values.video && values.video)formData.append("video", values.video);
    if(values.coverImage && values.coverImage)formData.append("coverImage", values.coverImage);
    if(values.basicVersion.document && values.basicVersion.document !== productData?.basic_version.document){
      formData.append("basic_version_document", values.basicVersion.document);
    }
    if(values.basicVersion.price && values.basicVersion.price !== productData?.basic_version.price){
      formData.append("basic_version[price]", values.basicVersion.price.toString());
    }
    if(values.openVersion.document && values.openVersion.document !== productData?.open_version.document){
      formData.append("open_version_document", values.openVersion.document);
    }
    if(values.openVersion.price && values.openVersion.price !== productData?.open_version.price){
      formData.append("open_version[price]", values.openVersion.price.toString());
    }
    if(values.editableVersion.document && values.editableVersion.document !== productData?.editable_version.document){
      formData.append("editable_version_document", values.editableVersion.document);
    }
    if(values.editableVersion.price && values.editableVersion.price !== productData?.editable_version.price){
      formData.append("editable_version[price]", values.editableVersion.price.toString());
    }
    if (values.images ) {
      values.images.forEach((image) => {
        formData.append('images', image);
      });
    }
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/products/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if(response.data.status === "success") {
        toast({
          description: "Product updated successfully",
        });
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error updating product",
        variant: "destructive",
      })
      console.log("Error updating product", error);
    }
  };

  return (
    <div>
      <BackButton text={'Go Back'} link={'/admin/dashboard/products'} />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">Edit {productData?.title_EN}</h1>
        <div >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center" >
            <div className="grid grid-cols-2 gap-5">
            <FormField control={form.control} name="title_AR" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Arabic Title:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Title of the product' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="title_EN" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* English Title:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='Title of the product' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Category:</FormLabel>
                  <FormControl>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <div className="grid grid-cols-3 gap-5">
                  <FormField control={form.control} name="basicVersion.price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Basic Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="openVersion.price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Open Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="editableVersion.price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Editable Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
              </div>
              
            <div className='grid grid-cols-1 gap-5'>
              <FormField control={form.control} name="description_AR" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>* Arabic Description:</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder='Description of the product' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="description_EN" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>* English Description:</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder='Description of the product' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>

            <div className="grid grid-cols-1 gap-11" >
                <FormField control={form.control} name="body_AR" render={({ field }) => (
                  <FormItem >
                    <FormLabel className='font-semibold'>* Arabic body:</FormLabel>
                    <FormControl >
                      <Controller control={form.control} name="body_AR" render={({ field }) => (
                        <ReactQuill value={field.value} onChange={field.onChange} theme='snow' className='h-[150px]' /> 
                      )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="body_EN" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* English body:</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="body_EN" render={({ field }) => (
                      <ReactQuill value={field.value} onChange={field.onChange} theme='snow' className='h-[150px]'/> 
                    )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
                />
            </div>

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
                productData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Cover Image (Current)</h2>
                      <Image 
                        src={`/imgs/${productData.coverImage}`} 
                        alt="Product cover image" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-sky-800 " 
                        onClick={() => setShowCoverImageInput(true)}
                      />
                    </div>
                )
              )}
              {showVideoInput ? (
                <FormField control={form.control} name="video" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Video</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => videoRef.current?.click()}
                          className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                        >
                          {videoName ? 'Choose Another Video' : 'Upload Video'}
                        </Button>
                        <input
                          type="file"
                          ref={videoRef}
                          onChange={handleVideoChange}
                          className="hidden"
                        />
                        {videoName && <p className="ml-2 font-medium">Selected Video: <b>{videoName}</b></p>}
                      </div>
                    </FormControl>
                    <Button onClick={() => setShowVideoInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ): (
                productData && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Video (Current)</h2>
                      <video
                        src={`/imgs/${productData.video}`} 
                        controls
                        className="object-cover cursor-pointer border border-sky-800 " 
                        onClick={() => setShowVideoInput(true)}
                      />
                    </div>
                )
              )}
              {showImagesInput ? (
                <FormField control={form.control} name="images" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        ref={imagesRef}
                        onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                      />
                    </FormControl>
                    <Button onClick={() => setShowImagesInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                productData && (
                  <div className="mt-5 w-full">
                    <h2 className="font-semibold">Images (Current)</h2>
                    <div className="flex flex-row justify-between ">
                      {productData.images.length > 0 ? (
                        productData.images.map((image, index) => (
                          <Image 
                            key={index}
                            src={`/imgs/${image}`} 
                            alt={`Product image ${index + 1}`} 
                            width={400} 
                            height={250} 
                            className="object-cover cursor-pointer border-sky-800 border" 
                            onClick={() => setShowImagesInput(true)}
                          />
                        ))
                      ) : (
                        <p className="mt-2 font-semibold">No images found.</p>
                      )}
                    </div>
                  </div>
                )
              )} 
              
               {showBasicDocumentInput ? (
                  <FormField control={form.control} name="basicVersion.document" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Basic Version Document</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            onClick={() => basicDocumentRef.current?.click()}
                            className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                          >
                            {basicDocumentName ? 'Choose Another Document' : 'Upload Document'}
                          </Button>
                          <input
                            type="file"
                            ref={basicDocumentRef}
                            onChange={handleBasicDocumentChange}
                            className="hidden"
                          />
                          {basicDocumentName && <p className="ml-2">Selected Document: <b>{basicDocumentName}</b></p>}
                        </div>
                      </FormControl>
                      <Button onClick={() => setShowBasicDocumentInput(false)} className="mt-2">Cancel</Button>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                ) : (
                  productData && (
                    <div className="mt-5 w-full flex flex-col ">
                      <h2 className="font-semibold">Basic Version Document (Current)</h2>
                      <div className="flex flex-row justify-between mt-1">
                        <Link href={`/files/products`} download className="text-blue-500 underline">
                          <Button className="flex flex-row justify-between w-[800px]">
                            <p className="mr-2">{`${productData.basic_version.document}`}</p> <FileDown size={18}/> 
                          </Button>
                        </Link>
                        <Button onClick={() => setShowBasicDocumentInput(true)} className="ml-2">
                          Update Document
                        </Button>
                      </div>
                    </div>
                  )
                )}  

              {showOpenDocumentInput ? (
                  <FormField control={form.control} name="openVersion.document" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>open Version Document</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            onClick={() => openDocumentRef.current?.click()}
                            className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                          >
                            {openDocumentName ? 'Choose Another Document' : 'Upload Document'}
                          </Button>
                          <input
                            type="file"
                            ref={openDocumentRef}
                            onChange={handleOpenDocumentChange}
                            className="hidden"
                          />
                          {openDocumentName && <p className="ml-2">Selected Document: <b>{openDocumentName}</b></p>}
                        </div>
                      </FormControl>
                      <Button onClick={() => setShowOpenDocumentInput(false)} className="mt-2">Cancel</Button>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                ) : (
                  productData && (
                    <div className="mt-5 w-full flex flex-col ">
                      <h2 className="font-semibold">Open Version Document (Current)</h2>
                      <div className="flex flex-row justify-between mt-1">
                        <Link href={`/files/products`} download className="text-blue-500 underline">
                          <Button className="flex flex-row justify-between w-[800px]">
                            <p className="mr-2 ">{`${productData.open_version.document}`}</p> <FileDown size={18}/> 
                          </Button>
                        </Link>
                        <Button onClick={() => setShowOpenDocumentInput(true)} className="ml-2">
                          Update Document
                        </Button>
                      </div>
                    </div>
                  )
                )}

                {showEditableDocumentInput ? (
                  <FormField control={form.control} name="editableVersion.document" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Editable Version Document</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            onClick={() => editableDocumentRef.current?.click()}
                            className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                          >
                            {editableDocumentName ? 'Choose Another Document' : 'Upload Document'}
                          </Button>
                          <input
                            type="file"
                            ref={editableDocumentRef}
                            onChange={handleEditableDocumentChange}
                            className="hidden"
                          />
                          {editableDocumentName && <p className="ml-2">Selected Document: <b>{editableDocumentName}</b></p>}
                        </div>
                      </FormControl>
                      <Button onClick={() => setShowEditableDocumentInput(false)} className="mt-2">Cancel</Button>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                ) : (
                  productData && (
                    <div className="mt-5 w-full flex flex-col ">
                      <h2 className="font-semibold">Editable Version Document (Current)</h2>
                      <div className="flex flex-row justify-between mt-1">
                        <Link href={`/files/products`} download className="text-blue-500 underline">
                          <Button className="flex flex-row justify-between w-[800px]">
                            <p className="mr-2 ">{`${productData.editable_version.document}`}</p> <FileDown size={18}/> 
                          </Button>
                        </Link>
                        <Button onClick={() => setShowEditableDocumentInput(true)} className="ml-2">
                          Update Document
                        </Button>
                      </div>
                    </div>
                  )
                )}

              <Button type="submit" className="my-3 w-full">Save</Button>
            </form>
          </Form>
        </div>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/products'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-sky-800 hover:bg-sky-700 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
