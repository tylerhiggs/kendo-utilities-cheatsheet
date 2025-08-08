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
    </div>
  );
}
