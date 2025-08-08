"use client";
import type { CssItem } from "@/app/types";
import Image from "next/image";
import Category from "./Category";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState, useRef } from "react";
import Fuse from "fuse.js";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function KendoCheatsheet({
  items: flattenedItems,
}: {
  items: (CssItem & {
    group: string;
    subGroup: string;
  })[];
}) {
  const [filteredItems, setFilteredItems] = useState<
    {
      title: string;
      items: {
        title: string;
        items: CssItem[];
      }[];
    }[]
  >([]);

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(flattenedItems, {
        keys: ["group", "subGroup", "name", "rawCode"],
        threshold: 0.3,
      }),
    [flattenedItems],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K on Mac or Ctrl+K on other platforms
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isShortcut = isMac
        ? event.metaKey && event.key === "k"
        : event.ctrlKey && event.key === "k";

      if (isShortcut) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const results = query
      ? fuse.search(query)
      : flattenedItems.map((item) => ({ item }));
    setFilteredItems(
      results.reduce(
        (acc, { item }) => {
          const group = acc.find((g) => g.title === item.group);
          if (group) {
            const subGroup = group.items.find(
              (sg) => sg.title === item.subGroup,
            );
            if (subGroup) {
              subGroup.items.push(item);
            } else {
              group.items.push({ title: item.subGroup, items: [item] });
            }
          } else {
            acc.push({
              title: item.group,
              items: [{ title: item.subGroup, items: [item] }],
            });
          }
          return acc;
        },
        [] as {
          title: string;
          items: { title: string; items: CssItem[] }[];
        }[],
      ),
    );
  }, [query, flattenedItems, fuse]);

  return (
    <>
      <div className="my-2 grid w-full grid-cols-1 p-4 sm:grid-cols-3">
        <div className="flex items-center justify-start">
          <h1 className="text-md font-bold">
            <a
              className="font-semibold text-fuchsia-400 hover:underline"
              href="https://www.telerik.com/design-system/docs/utils/get-started/introduction/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kendo CSS Utilities
            </a>{" "}
            Cheatsheet
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Badge className="text-sm">11.2.0</Badge>
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full sm:w-96"
            spellCheck={false}
            autoFocus
          />
        </div>
        <div className="flex items-center justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/tylerhiggs/kendo-utilities-cheatsheet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                <Image
                  src="/github-mark.svg"
                  alt="GitHub"
                  className="h-6 w-6"
                  height={24}
                  width={24}
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <span>View source on GitHub</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full columns-1 flex-col gap-4 p-4 sm:columns-2 md:columns-3 lg:columns-4">
          {filteredItems.map((item) => (
            <Category key={item.title} title={item.title} items={item.items} />
          ))}
        </div>
      </div>
    </>
  );
}
