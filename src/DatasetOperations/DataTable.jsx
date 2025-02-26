"use client";

import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ScrollArea } from "src/components/ui/scroll-area";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { getTableConfig } from "./ColumnsConfig";
import { Input } from "src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { getCurrentUser, fetchAuthSession } from "@aws-amplify/auth";


export function DataTableDemo({ initialData }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadedDatasetIds, setUploadedDatasetIDs] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [starredDatasets, setStarredDatasets] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [starredDatasetIds, setStarredDatasetIDs] = useState([]);

  const navigate = useNavigate();

  // const updateData = async (datasetID) => {
  //   const updatedRow = await getDatasets(datasetID);
  //   setData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === updatedRow.id ? { ...row, ...updatedRow } : row
  //     )
  //   );
  // };

  const { columns } = getTableConfig(data);

  const fetchUploadedDatasets = async () => {
    try {
      const username = await getCurrentUser();
      const response = await fetch(
        `http://localhost:8080/api/public/user/${username.username}/getUploaded`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user's uploaded datasets");
      }
      const data = await response.json();
      console.log("fetched dataest IDs for upload")
      setUploadedDatasetIDs(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUploadedDatasets();
  }, []);

  useEffect(() => {
    const fetchUploadedDatasetDetails = async () => {
      try {
        if (uploadedDatasetIds && uploadedDatasetIds.length > 0) {
          const datasetPromises = uploadedDatasetIds.map(async (id) => {
            const infoResponse = await fetch(
              `http://localhost:8080/api/public/datasets/getDatasetInformation/${id}`
            );
            if (!infoResponse.ok) {
              throw new Error(`Failed to fetch dataset info for ID: ${id}`);
            }
            const infoData = await infoResponse.json();

            const imageResponse = await fetch(
              `http://localhost:8080/api/public/datasets/getDatasetSinglePreviewImage/${id}`
            );
            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch dataset image for ID: ${id}`);
            }
            const imageBlob = await imageResponse.blob();
            const imageURL = URL.createObjectURL(imageBlob);

            return {
              id,
              name: infoData.name,
              price: infoData.price,
              image: imageURL,
              description: infoData.description,
            };
          });

          const datasets = await Promise.all(datasetPromises);
          setData(datasets);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedDatasetDetails();
  }, [uploadedDatasetIds]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Dataset..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button className="ml-4" onClick={() => navigate("/upload")}>
          Upload a Dataset
        </Button>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[65vh] w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}