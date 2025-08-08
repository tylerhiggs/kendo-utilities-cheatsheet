"use client";

import { CssItem } from "@/app/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { ChevronsUpDown, Clipboard } from "lucide-react";
import { CssPreview } from "./CssPreview";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function SubCategory({
  title,
  items,
}: {
  title: string;
  items: CssItem[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible key={title} open={open} onOpenChange={setOpen}>
      <div>
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between p-1">
            <h3 className="text-md font-medium">
              {title.replace(".scss", "")}
            </h3>
            <ChevronsUpDown className="h-5 w-5 text-gray-500" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex w-full items-center justify-between"
            >
              <h4 className="text-muted-foreground group flex w-1/2 gap-1 text-sm font-semibold">
                <Button
                  variant="ghost"
                  className="flex h-auto w-full items-center justify-between text-wrap"
                  onClick={() => {
                    navigator.clipboard.writeText(item.rawCode);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <div className="flex overflow-x-auto text-left font-mono text-wrap">
                    {item.name}
                  </div>
                  <Clipboard className="invisible h-4 w-4 text-gray-500 group-hover:visible" />
                </Button>
              </h4>
              <div className="w-1/2">
                <CssPreview
                  lightTokens={item.example}
                  darkTokens={item.darkExample}
                />
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
