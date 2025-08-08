"use client";
import React from "react";
import type { TokensResult } from "shiki";
import { useTheme } from "next-themes";
type CssPreviewProps = {
  lightTokens: TokensResult | null;
  darkTokens: TokensResult | null;
};

export const CssPreview: React.FC<CssPreviewProps> = ({
  lightTokens,
  darkTokens,
}) => {
  const { systemTheme: theme } = useTheme();

  const tokens = theme === "dark" ? darkTokens : lightTokens;
  return (
    <pre
      className="m-1 w-full rounded p-2 font-mono text-sm whitespace-pre-wrap"
      style={{ backgroundColor: tokens?.bg }}
    >
      <code>
        {tokens?.tokens.map((line, i) => (
          <div key={i}>
            {line.map((token, j) => (
              <span key={j} style={{ color: token.color }}>
                {token.content}
              </span>
            ))}
          </div>
        ))}
      </code>
    </pre>
  );
};
