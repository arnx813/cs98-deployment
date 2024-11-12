"use client"
 
import React, {useState, createContext} from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "../hooks/use-toast"
import { Button } from "src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "src/components/ui/dialog"



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


const MyContext = createContext();

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
    price: z.coerce.number({
        message: "Please input a price",
        required_error: "Price is required",
    }),
      
  })
  
  
  export function EditDataset({onClose, row, updateData}) {
    const defaultValues = {
        price: row.getValue('price'),
        datasetName: row.getValue('name'),
        description: row.getValue('description'),

      }
    
    const form = useForm({
      resolver: zodResolver(profileFormSchema),
      defaultValues,
      mode: "onChange",
    })
    


    const { toast } = useToast()
    const [open, setOpen] = useState(true)
    const [data, setData] = useState([])
    

  

    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
        const tags = []
        formData.append('datasetID', row.getValue('id'))
        formData.append('newValues', data.datasetName)
        formData.append('newValues', data.description)
        formData.append('newValues', data.price)
        tags.push('name')
        tags.push('description')
        tags.push('price')
        formData.append('tags', tags)

        console.log(row)
        // Send the request using fetch or axios
        const response = await fetch('http://localhost:8080/datasets/editDatasetMetadata', {
          method: 'POST',
          body: formData, // Ensure `FormData` is sent as the body
        });
    
        if (!response.ok) {
            
          throw new Error('Failed to update dataset');
        }
    
        console.log('dataset updated successfully');
        const updatedRow = getDatasets(row.getValue('id'))
        // Update data context with the updated row
        setData((prevData) => prevData.map((item) => (item.id === row.id ? updatedRow : item)));
        updateData(row.getValue('id'))
        onClose()


        setOpen(false)
        toast({
          title: 'Success!',
          description: 'Your dataset info has been updated successfully.'
        });
        
      } catch (error) {
        console.error('Error updating dataset:', error);
      }
    };

    const getDatasets = async (datasetID) => {
        try {
          const response = await fetch(`http://localhost:8080/datasets/getDatasetInformation/${datasetID}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
          }

          return await response.json();
        } catch (err) {
          throw err;
        }
      };
    
  
    return (
        
      <Dialog open={onClose} onOpenChange={onClose}>
        
        <DialogContent >
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (e) => {console.log(e)})} className="space-y-8">
            <div className="space-y-1 p-8  md:block">
              <DialogHeader>
                <DialogTitle>
                  Edit
                </DialogTitle>
                <DialogDescription>Edit Model Information</DialogDescription>
              </DialogHeader>
              <Separator className="my-6"/>
             
                <FormField
                  control={form.control}
                  name="datasetName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="datanexus" {...field}  /> 
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
                        <Input type="number" {...field} className="pl-9" onChange={(e) => {field.onChange(parseInt(e.target.value,10))}}/>
                      </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
   
              </div>
              <DialogFooter >
                    <Button type="submit">Submit</Button>
                </DialogFooter>    
            </form>
          </Form>
        </DialogContent>
        
      </Dialog>
      
    )
  }