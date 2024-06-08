import React from "react";
import { Spinner } from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="text-white flex items-center justify-center h-[75vh]">
      <Spinner size="small">Loading</Spinner>
    </div>
  );
}

export default Loading;
