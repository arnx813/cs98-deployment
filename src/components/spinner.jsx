"use client";

import React from 'react';
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-gray-800" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;