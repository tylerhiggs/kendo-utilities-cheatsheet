import React from "react";

type KbdProps = {
  keyName: string;
};

const keySymbols: Record<string, string> = {
  shift: "⇧",
  enter: "⏎",
  tab: "⇥",
  esc: "⎋",
  backspace: "⌫",
  delete: "⌦",
  option: "⌥",
  alt: "⌥",
  control: "⌃",
  ctrl: "⌃",
  capslock: "⇪",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  space: "␣",
};

function getDisplayKey(keyName: string): string {
  const lower = keyName.toLowerCase();
  if (lower === "meta" || lower === "cmd" || lower === "command") {
    return navigator.platform.includes("Mac") ? "⌘" : "Ctrl";
  }
  return keySymbols[lower] || keyName.toUpperCase();
}

export const Kbd: React.FC<KbdProps> = ({ keyName }) => (
  <kbd className="ring-accented text-default bg-default inline-flex h-5 min-w-[20px] items-center justify-center rounded-sm px-1 font-sans text-[11px] font-medium ring ring-inset">
    {getDisplayKey(keyName)}
  </kbd>
);
