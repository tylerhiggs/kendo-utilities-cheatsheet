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
  const [query, setQuery] = useState("");
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("xl");
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

  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setScreenSize("xl");
      else if (width >= 1024) setScreenSize("lg");
      else if (width >= 768) setScreenSize("md");
      else setScreenSize("sm");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const filteredItems = (
    query ? fuse.search(query) : flattenedItems.map((item) => ({ item }))
  ).reduce(
    (acc, { item }) => {
      const group = acc.find((g) => g.title === item.group);
      if (group) {
        const subGroup = group.items.find((sg) => sg.title === item.subGroup);
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
  );

  // Column distribution logic
  const columns = useMemo(() => {
    const columnCount =
      screenSize === "sm"
        ? 1
        : screenSize === "md"
          ? 2
          : screenSize === "lg"
            ? 3
            : 4;

    // Initialize columns with empty arrays and weight counters
    const cols: Array<{
      items: typeof filteredItems;
      weight: number;
    }> = Array.from({ length: columnCount }, () => ({ items: [], weight: 0 }));

    // Sort items by weight (descending) for better distribution
    const sortedItems = [...filteredItems].sort((a, b) => {
      const weightA = a.items.reduce(
        (sum, subGroup) => sum + subGroup.items.length,
        0,
      );
      const weightB = b.items.reduce(
        (sum, subGroup) => sum + subGroup.items.length,
        0,
      );
      return weightB - weightA;
    });

    // Distribute items to the column with the least weight
    sortedItems.forEach((item) => {
      const itemWeight = item.items.reduce(
        (sum, subGroup) => sum + subGroup.items.length,
        0,
      );

      // Find the column with the minimum weight
      const minWeightColumn = cols.reduce(
        (min, col, index) => (col.weight < cols[min].weight ? index : min),
        0,
      );

      cols[minWeightColumn].items.push(item);
      cols[minWeightColumn].weight += itemWeight;
    });

    return cols.map((col) => col.items);
  }, [filteredItems, screenSize]);

  return (
    <>
      <div className="my-2 grid w-full grid-cols-1 p-4 sm:grid-cols-3">
        <div className="flex items-center justify-start py-3">
          <h1 className="text-base font-bold">
            <a
              tabIndex={0}
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
          <label htmlFor="search-input" className="sr-only">
            Search utilities
          </label>
          <Input
            id="search-input"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            kbds={["meta", "k"]}
            placeholder="Search..."
            className="w-full sm:w-96"
            spellCheck={false}
            autoFocus
          />
        </div>
        <div className="invisible flex items-center justify-end sm:visible">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                tabIndex={0}
                href="https://github.com/tylerhiggs/kendo-utilities-cheatsheet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                <Image
                  src="/github-mark.svg"
                  alt="GitHub"
                  className="h-6 w-6 dark:invert"
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
      <div className="flex w-full gap-4 p-4">
        {columns.map((columnItems, columnIndex) => (
          <div key={columnIndex} className="flex flex-1 flex-col gap-4">
            {columnItems.map((item) => (
              <Category
                key={item.title}
                title={item.title}
                items={item.items}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
