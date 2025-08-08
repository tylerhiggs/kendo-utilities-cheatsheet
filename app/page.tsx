import Image from "next/image";
import { getStaticData } from "./getStaticData";
import KendoCheatsheet from "@/components/KendoCheatsheet";

export default function Home() {
  const scssFilesContents = getStaticData();
  const items = Object.entries(scssFilesContents)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([groupName, subCategories]) => ({
      items: Object.entries(subCategories).map(([subCategoryName, items]) => ({
        title: subCategoryName.replace(".scss", ""),
        items,
      })),
      title: groupName.replace("-", " "),
    }));
  const flattenedItems = items.flatMap((item) =>
    item.items.flatMap((subItem) =>
      subItem.items.map((cssItem) => ({
        ...cssItem,
        group: item.title,
        subGroup: subItem.title,
      })),
    ),
  );
  return (
    <div className="font-sans">
      <main>
        <KendoCheatsheet items={flattenedItems} />
      </main>
      <footer className="mt-8 mb-4 flex w-full flex-col items-center text-sm text-stone-800 dark:text-stone-200">
        <div className="flex gap-1">
          Made with ❤️ by Tyler Higgs |
          <a
            tabIndex={0}
            className="text-fuchsia-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1HYpMIKmC3j0OBymrgLdcvq6Apd3nG_H0/view?usp=sharing"
          >
            Hire me
          </a>
        </div>
        <br />
        <a
          tabIndex={0}
          href="https://github.com/tylerhiggs/kendo-utilities-cheatsheet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-stone-800 transition duration-200 hover:font-bold hover:text-stone-900 hover:underline dark:text-stone-200 dark:hover:text-stone-100"
        >
          <Image
            src="./github-mark.svg"
            alt="GitHub"
            className="inline h-5 w-5 align-middle dark:invert"
            height={20}
            width={20}
          />
          See source code
        </a>
      </footer>
    </div>
  );
}
