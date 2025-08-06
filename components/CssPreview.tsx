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
  const { theme } = useTheme();
  const tokens = theme === "dark" ? darkTokens : lightTokens;
  return (
    <pre>
      <code>
        {tokens?.tokens.map((line, i) => (
          <div key={i}>
            {line.map((token, j) => (
              <span
                key={j}
                style={token.color ? { color: token.color } : undefined}
              >
                {token.content}
              </span>
            ))}
          </div>
        ))}
      </code>
    </pre>
  );
};
