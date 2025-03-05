import Navigation from "./navigation";
import { Button } from "./button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "./navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Menu } from "lucide-react";
import LaunchUI from "../logos/launch-ui";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";

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
    })
    .max(160)
    .min(4),
  price: z.coerce.number({
    message: "Please input a price",
    required_error: "Price is required",
  }),

  file: z
    .any({
      required_error: "Please upload a dataset.",
    })
    .refine((value) => value instanceof File, {
      message: "Please upload a valid zip file.",
    }),
  preview: z.array(
    z.any().refine((value) => value instanceof File, {
      message: "Please upload a valid image file.",
    })
  ),
});

// This can come from your database or API.
const defaultValues = {};

export default function Navbar() {

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });


  const onSubmit = async (data) => {
    console.log(data);
  
  };


  return (
    (<header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div
        className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="navbar-simple relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              {/* <LaunchUI /> */}
              {/* Dataset Nexus */}
            </a>
            <Navigation />
          </NavbarLeft>
          <NavbarRight>

            <Button variant="outline" className="rounded-full" asChild>
              <a href="/">Questions?</a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="/">Save & Exit</a>
            </Button>
            
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>)
  );
}
