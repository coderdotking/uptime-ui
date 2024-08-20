"use client";
import { IconLayout } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLayout } from "../layout-provider";
import React from "react";
const ToggleLayout = () => {
  const { setLayout } = useLayout();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconLayout className="h-5 w-5 cursor-pointer text-gray-600 dark:text-white " />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setLayout("default")}>
            默认布局
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLayout("card")}>
            卡片布局
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ToggleLayout;
