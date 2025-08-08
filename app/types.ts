import type { TokensResult } from "shiki";

export type CssItem = {
  example: TokensResult;
  darkExample: TokensResult;
  rawCode: string;
  name: string;
  group: string;
};

export type SubCategory = Record<string, CssItem[]>;

export type GroupedSubCategories = Record<string, SubCategory>;
