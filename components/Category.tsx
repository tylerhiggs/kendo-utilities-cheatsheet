"use client";

import type { CssItem } from "@/app/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import SubCategory from "./SubCategory";
import { useState } from "react";

export default function Category({
  title,
  items,
}: {
  title: string;
  items: { title: string; items: CssItem[] }[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex w-full break-inside-avoid">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        key={title}
        className="w-full"
      >
        <div className="w-full rounded-lg border p-4">
          <CollapsibleTrigger asChild>
            <div className="bg-muted mb-2 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2">
              <h2 className="text-lg font-semibold capitalize">
                {title.replace("-", " ")}
              </h2>
              <ChevronsUpDown className="h-5 w-5 text-gray-500" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-3 p-2">
            {items.map((item) => (
              <SubCategory
                key={item.title}
                title={item.title}
                items={item.items}
              />
            ))}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
