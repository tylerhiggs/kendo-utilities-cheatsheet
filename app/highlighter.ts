import path from "path";
import fs from "fs";
import { createHighlighter } from "shiki";
import type { CssItem, GroupedSubCategories } from "./types";

const getAllScssFilesContents = async (dir: string) => {
  const highlighter = await createHighlighter({
    langs: ["css"],
    themes: ["laserwave"],
  });
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const result: CssItem[] = [];
    lines.forEach((line) => {
      const match = line.includes("@example");
      if (match) {
        const darkExample = highlighter.codeToTokens(
          line.split("@example")[1].trim(),
          { lang: "css", theme: "laserwave" }
        );
        const example = highlighter.codeToTokens(
          line.split("@example")[1].trim(),
          { lang: "css", theme: "laserwave" }
        );
        result.push({ name: "", darkExample, example, group: "" });
      } else if (line.includes("@name")) {
        const lastResult = result.at(-1);
        if (!lastResult) return;
        lastResult.name = line.split("@name")[1].trim();
      } else if (line.includes("@group")) {
        const lastResult = result.at(-1);
        if (!lastResult) return;
        lastResult.group = line.split("@group")[1].trim();
      }
    });
    return result;
  };
  const result: GroupedSubCategories = {};
  const folders = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  folders.forEach((folder) => {
    const folderPath = path.join(dir, folder.name);
    const files = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((f) => f.isFile() && !f.name.includes("index"));

    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);
      const [folderName, fileName] = filePath.split(/\\|\//).slice(-2);
      const content = fs.readFileSync(filePath, "utf8");
      if (!result[folderName]) {
        result[folderName] = {};
      }
      result[folderName][fileName.replace("_", "")] = parseContent(content);
    });
  });

  return result;
};

const kendoUtilsDir = path.join(
  process.cwd(),
  "node_modules/@progress/kendo-theme-utils/scss"
);

const scssFilesContents = await getAllScssFilesContents(kendoUtilsDir);
fs.writeFileSync(
  path.join(process.cwd(), "public/data.json"),
  JSON.stringify(scssFilesContents, null, 2),
  "utf8"
);
