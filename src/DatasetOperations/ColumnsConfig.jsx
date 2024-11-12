"use client";

import React from "react";

import { ArrowUpDown } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import { DatasetAction } from "./Dataset-Action";


export function getTableConfig(data, updateData){

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div className="w-[200px] ">{row.getValue("name")}</div>,
      },
      {
        id: "id",
        enableHiding: true,
        accessorKey: "id",
        header: ()=> null,
        cell: () => null,
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <span className="w-[500px] truncate font-medium">{row.getValue("description")}</span>
          </div>
        ),
      },
      {
        id: "price",
        accessorKey: "price",
        header: ({ column }) => (
          <div className="text-right text-sm text-muted-foreground">
            Current Price
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-sm text-muted-foreground"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <ArrowUpDown />
            </Button>
          </div>
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("price"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
    
          return (
            <DatasetAction row={row} updateData={updateData} />
          );
        },
      },
      
    ];

    return {columns, data}
    

}

