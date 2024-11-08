"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Toast } from "./ui/toast"
import { useToast } from "../hooks/use-toast"

import { buttonVariants } from "src/components/ui/button"
import { Button } from "src/components/ui/button"
import { Label } from "./ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "src/components/ui/select"

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
import { cn } from "../lib/utils"
import { Link } from "react-router-dom"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"

const profileFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    bio: z.string().max(160).min(4),

  })
  
  
  // This can come from your database or API.
  const defaultValues = {
    bio: "I own a computer.",
    urls: [
      { value: "https://shadcn.com" },
      { value: "http://twitter.com/shadcn" },
    ],
  }
  
  export function UploadForm() {
    const form = useForm({
      resolver: zodResolver(profileFormSchema),
      defaultValues,
      mode: "onChange",
    })
  
    const { fields, append } = useFieldArray({
      name: "urls",
      control: form.control,
    })
    const { toast } = useToast()
  
    function onSubmit(data) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  
    return (
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight"> Upload</h2>
          <p className="text-muted-foreground">Insert Model Information and Upload Data</p>
        </div>
        <Separator className="my-6"/>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/6">
          </aside>
          <div className="flex-1 lg:max-w-2xl">
        
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="datanexus" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage verified email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}


              <FormField
                control={form.control}
                name="bio"
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
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-muted-foreground">$</span>
                      </div>
                      <Input id="currency" type="number" min={0} max={10000} step={0.01} placeholder="0.00" className="pl-9" />
                    </div>
      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div>
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`urls.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          URLs
                        </FormLabel>
                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                          Add links to your website, blog, or social media profiles.
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}


                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: "" })}
                >
                  Add URL
                </Button>
              </div> */}

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload</FormLabel>
                    <FormControl>
                      <div className="flex flex-nowrap">
                        <div className="hover">
                          <Input
                            placeholder="Picture"
                            type="file"
                            accept="image/*, application/pdf"
                            variant="outline"
                            className="file:bg-neutral-50 hover:file:bg-neutral-100 file:rounded-md file:border-neutral-50 file:cursor-pointer"
                            onChange={(event) =>
                              field.onChange(event.target.files ? event.target.files[0] : null)
                            }
                          />
        
                        </div>
                        <Separator orientation="vertical" />

                        <div className="">
                          <Button type="button" variant="outline" 
                          onClick={() => append({ value: "" })}
                          > Add Preview Images</Button>
                        </div>

                      </div>
                      
                      
                    </FormControl>
                    <FormDescription>
                      Tell us a bit about the data.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <Button type="submit">Submit</Button>
            </form>
          </Form>
          </div>
          </div>
      </div>
    )
  }