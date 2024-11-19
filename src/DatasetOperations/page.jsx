import React from "react";
import { UserNav } from "src/components/user-nav";
import { DataTableDemo } from "./DataTable";

function DatasetOperationPage() {
  return (
    <div className="max-h-[100vh] flex-1 flex-col md:flex overflow-hidden">
      <div className="flex items-center justify-between space-y-2">
    
        {/* <div className="flex items-center space-x-2">
          <UserNav />
        </div> */}
      </div>
      <DataTableDemo />
    </div>
  );
}

export default DatasetOperationPage;
