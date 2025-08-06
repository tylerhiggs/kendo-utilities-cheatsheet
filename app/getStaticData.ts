import fs from "fs";
import path from "path";
import type { GroupedSubCategories } from "./types";

export function getStaticData() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as GroupedSubCategories;
}
