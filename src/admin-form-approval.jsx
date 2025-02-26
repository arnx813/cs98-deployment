"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/spinner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

import { Button } from "./components/ui/button";

const data = [
  {
    email: "aaronxie2003@gmail.com",
    sellerType: "Organization",
    questions: [
      { question: "Question 1", answer: "Answer 1" },
      { question: "Question 2", answer: "Answer 2" },
      { question: "Question 3", answer: "Answer 3" },
    ],
  },
  // ... other data entries
];

const columns = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "sellerType",
    header: "Seller Type",
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end">
        <ArrowRight className="h-4 w-4 text-gray-500" />
      </div>
    ),
  },
];

export function AdminApprovalsTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedSeller, setSelectedSeller] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const simulateLoading = async (callback) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsLoading(false);
    callback();
  };

  const handleRowClick = (row) => {
    simulateLoading(() => {
      setSelectedSeller(row.original);
      setOpen(true);
    });
  };

  const handleApprove = () => {
    simulateLoading(() => {
      console.log("Approved:", selectedSeller);
      setOpen(false);
    });
  };

  const handleReject = () => {
    simulateLoading(() => {
      console.log("Rejected:", selectedSeller);
      setOpen(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {isLoading && <LoadingSpinner />}
      <div className="mx-auto px-4 pt-16">
        <div className="max-w-[80vw] mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Admin Approvals - Seller Form</h1>
          <div className="bg-white rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-gray-600">
                        {header.column.id === "actions" ? null : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Seller Application</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-6">
              {selectedSeller.questions.map((qa, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium text-gray-900">{qa.question}</p>
                  <p className="text-gray-600">{qa.answer}</p>
                </div>
              ))}
              <div className="flex space-x-4 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={handleReject}
                  disabled={isLoading}
                >
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isLoading}
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminApprovalsTable;