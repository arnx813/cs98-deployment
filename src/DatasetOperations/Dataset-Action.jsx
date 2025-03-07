import { Button } from "src/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { EditDataset } from "./Edit-Dataset";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { useState } from "react";

export function DatasetAction({ row, updateData }) {
  const [showEditDataset, setshowEditDataset] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;


  const handleEditClick = () => {
    setshowEditDataset(true);
    // setTimeout(() => setshowEditDataset(true), 0)
    console.log(showEditDataset);
  };

  const closeEditDataset = () => {
    setshowEditDataset(false);
  };

  const deleteDataset = async () => {
    try {
      const user = await fetch(
        `${BASE_URL}/datasets/deleteDataset/${row.getValue("id")}`,
        { method: "DELETE" }
      );
      // console.log(user.signInDetails.loginId);
    } catch (error) {
      console.error("Error deleting dataset:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleEditClick}>
            Edit Dataset
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View payment Details</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteDataset}>
            Delete Dataset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showEditDataset && (
        <EditDataset
          onClose={closeEditDataset}
          row={row}
          updateData={updateData}
        />
      )}
    </>
  );
}
