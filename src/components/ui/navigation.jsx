"use client";

import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "../../lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import LaunchUI from "../logos/launch-ui";



export default function Navigation() {
  return (
    (<NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        
      </NavigationMenuList>
    </NavigationMenu>)
  );
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    (<li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>)
  );
});
ListItem.displayName = "ListItem";
