import path from "path";
import fs from "fs";
import { createHighlighter } from "shiki";
import type { CssItem, GroupedSubCategories } from "./types";

const getAllScssFilesContents = async (dir: string) => {
  const highlighter = await createHighlighter({
    langs: ["css"],
    themes: ["laserwave", "slack-ochin"],
  });
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const result: CssItem[] = [];
    let shouldContinue = true;
    lines.forEach((line) => {
      if (!shouldContinue) return;
      if (!line.trim().startsWith("//") && line.trim() !== "") {
        shouldContinue = false;
      }
      const match = line.includes("@example");
      if (match) {
        const code = line.split("@example")[1].trim().replaceAll("; ", ";\n");

        const darkExample = highlighter.codeToTokens(`{${code}}`, {
          lang: "css",
          theme: "laserwave",
        });
        const example = highlighter.codeToTokens(`{${code}}`, {
          lang: "css",
          theme: "slack-ochin",
        });
        darkExample.tokens[0][0].content =
          darkExample.tokens[0][0].content.replace("{", "");
        darkExample.tokens.at(-1)!.at(-1)!.content =
          darkExample.tokens[0][0].content.replace("}", "");
        example.tokens[0][0].content = example.tokens[0][0].content.replace(
          "{",
          "",
        );
        example.tokens.at(-1)!.at(-1)!.content =
          example.tokens[0][0].content.replace("}", "");
        result.push({
          name: "",
          darkExample,
          example,
          group: "",
          rawCode: code,
        });
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
      .filter((f) => f.isFile() && !f.name.includes("index"))
      .sort((a, b) => a.name.localeCompare(b.name));

    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);
      const [folderName, fileName] = filePath.split(/\\|\//).slice(-2);
      const content = fs.readFileSync(filePath, "utf8");
      if (!result[folderName]) {
        result[folderName] = {};
      }
      const parsed = parseContent(content);
      if (!parsed.length) return;
      result[folderName][fileName.replace("_", "")] = parsed;
    });
  });

  return result;
};

const kendoUtilsDir = path.join(
  process.cwd(),
  "node_modules/@progress/kendo-theme-utils/scss",
);

const scssFilesContents = await getAllScssFilesContents(kendoUtilsDir);
fs.writeFileSync(
  path.join(process.cwd(), "public/data.json"),
  JSON.stringify(scssFilesContents, null, 2),
  "utf8",
);
