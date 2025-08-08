import * as React from "react";

import { cn } from "@/lib/utils";
import { Kbd } from "../Kbd";

function Input({
  className,
  type,
  kbds,
  ...props
}: React.ComponentProps<"input"> & { kbds?: string[] }) {
  return (
    <div
      className={cn(
        "selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] md:text-sm",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "has-[input[aria-invalid='true']]:ring-destructive/20 dark:has-[input[aria-invalid='true']]:ring-destructive/40 has-[input[aria-invalid='true']]:border-destructive",
        className,
      )}
    >
      <input
        type={type}
        data-slot="input"
        className="file:text-foreground placeholder:text-muted-foreground w-full outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      {kbds && (
        <div className="ml-2 flex items-center gap-1">
          {kbds.map((kbd, index) => (
            <Kbd key={index} keyName={kbd} />
          ))}
        </div>
      )}
    </div>
  );
}

export { Input };
