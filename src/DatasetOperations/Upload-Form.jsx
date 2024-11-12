"use client"
 
import React, {useState, useRef} from 'react';

import { Icons } from '../components/icons';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "../hooks/use-toast"
import { Button } from "src/components/ui/button"
import { Label } from "../components/ui/label"
import { ScrollArea } from 'src/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "src/components/ui/dialog"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form"
import { Input } from "src/components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Separator } from "../components/ui/separator"

const profileFormSchema = z.object({
    datasetName: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    description: z
      .string({
        required_error: "Please include a description.",
      }).max(160).min(4),
    price: z.coerce
    .number({
      message: "Please input a price",
      required_error: "Price is required",
    }),
      
    file: z
      .any({
        required_error: "Please upload a dataset.",
      }).refine(value => value instanceof File, 
        {
          message: "Please upload a valid zip file."
        }
      ),
    preview: z
      .array(
        z.any().refine(
          value => value instanceof File,
          {
            message: "Please upload a valid image file."
          }
        )
      ),

  })
  
  
  // This can come from your database or API.
  const defaultValues = {}
  
  export function UploadForm() {
    const form = useForm({
      resolver: zodResolver(profileFormSchema),
      defaultValues,
      mode: "onChange",
    })
  


    const { toast } = useToast()
    const [zipFileName, setZipFileName] = useState('');
    const [previewFileNames, setPreviewFileNames] = useState([]);
    const zipInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(true)

    const handleRemoveFile = (index) => {
      setPreviewFileNames((prevFiles) => prevFiles.filter((_, i) => i !== index));
      form.setValue(
        'preview',
        previewFileNames.filter((_, i) => i !== index)
      );
    };
  

    const onSubmit = async (data) => {
      try {
        const formData = new FormData();

        formData.append('datasetName', data.datasetName);
        formData.append('description', data.description);
        formData.append('price', data.price);
        const tags = []
        tags.push('classes')
        formData.append('files', data.file)
        data.preview.forEach(element => {
          formData.append('files', element)
          tags.push('preview_image')
        });
        formData.append('tags', tags)
    
        // Send the request using fetch or axios
        const response = await fetch('http://localhost:8080/datasets/uploadDataset', {
          method: 'POST',
          body: formData, // Ensure `FormData` is sent as the body
        });
    
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
    
        console.log('File uploaded successfully');
        setOpen(false)
        toast({
          title: 'Success!',
          description: 'Your file has been uploaded successfully.'
        });
        
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        
        <DialogContent className="sm:max-w-[80vw] lg:h-[85vh] ">
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (e) => {console.log(e)})} className="space-y-8">
            <div className="space-y-1 p-8  md:block">
              <DialogHeader>
                <DialogTitle>
                  Upload
                </DialogTitle>
                <DialogDescription>Insert Model Information and Upload Data</DialogDescription>
              </DialogHeader>
              <Separator className="my-6"/>
              <ScrollArea className="h-[60vh] w-[75vw] overflow-hidden">
              <div className="space-y-4 p-8 pb-6 md:block">
                <FormField
                  control={form.control}
                  name="datasetName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="datanexus" {...field} value={field.value ?? ''} /> 
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="hellower"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tell us a bit about the data.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <Input type="number" placeholder="Enter price" className="pl-9" onChange={(e) => {field.onChange(parseInt(e.target.value,10))}}/>
                      </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              {/* Single .zip file upload */}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload</FormLabel>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <div className='flex items-center gap-2'>
                          <Button as="Label" variant="outline" type="button" onClick={() => zipInputRef.current && zipInputRef.current.click()}>
                          <Icons.Upload className="mr-2 h-4 w-4" />  Choose a File
  
                          </Button>
                          <Input
                            ref={zipInputRef}
                            id="zip-upload"
                            type="file"
                            accept=".zip"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files ? event.target.files[0] : null;
                              setZipFileName(file ? file.name : '');
                              field.onChange(file);
                            }}
                          />
                          </div>
             
                        
                          <div className='grid gap-2'>
             
                            {zipFileName && (
                             
                              <div className='flex items-center gap-2'>
                                <Icons.File className="mr-2 h-4 w-4"/>
                                <div>
                                  <Label>
                                  {zipFileName}
                                </Label>

                                </div>
                              </div>
                            )}
              

                          </div>
                        </div>
                        
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preview Images</FormLabel>
                      <FormControl>
                        <>
                          <div className="flex flex-nowrap items-center">
                            <Button variant="outline" type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                              <Icons.Upload className="mr-2 h-4 w-4" /> Select Preview Images
                  
                            </Button>
                            <Input
                              ref={fileInputRef}
                              id="multi-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple
                              onChange={(event) => {
                                const files = event.target.files ? Array.from(event.target.files) : [];
                                const newFileNames = files.map((file) => file.name);
                                setPreviewFileNames((prev) => [...prev, ...newFileNames]);
                                field.onChange([...(field.value || []), ...files]);
                              }}
                            />
                          </div>

                          {previewFileNames.length > 0 && (
                            <div className="grid gap-2 ">
                              <ul>
                              {previewFileNames.slice(0,3).map((name, index) => (
                                <li key={index}>

                                <div className='flex items-center gap-2'>
                                  <Icons.File className="mr-2 h-4 w-4"/>
                                  
                                    <TooltipProvider>
                                      <Tooltip>
                                        {/* {name} */}
                                        {previewFileNames[index].length > 10 ? (
                                          
                                          <TooltipTrigger asChild>
                                            <div className='w-32 truncate'>
                                              <Label>{name}</Label>
                                            </div>
                                          </TooltipTrigger>
                                          
                                        ) : (
                                          <div className='w-32'>
                                            <Label>{name}</Label>
                                          </div>                                          
                                        )}
                                        <TooltipContent>{name}</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>     
                                  <div>
                                    <Button type="button" variant="ghost" onClick={() => handleRemoveFile(index)}><Icons.Trash className="mr-2 h-4 w-4" /></Button>
                                  </div>
                                </div>

                                  </li>
                                  ))}
                                </ul>
                                {previewFileNames.length > 3 && (
                                  <p className="grid grid-cols-6 gap-4 text-sm text-center mt-1">
                                    {previewFileNames.length - 3} more file(s)...
                                  </p>
                                )}
                            </div>
                          )}
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 </div>
                </ScrollArea> 
                <DialogFooter >
                    <Button type="submit">Submit</Button>
                  </DialogFooter>                
              </div>    
            </form>
          </Form>
        </DialogContent>
        
      </Dialog>
    )
  }