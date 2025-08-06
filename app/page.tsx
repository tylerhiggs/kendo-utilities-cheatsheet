import { Input } from "@/components/ui/input";
import { getStaticData } from "./getStaticData";
import { CssPreview } from "@/components/CssPreview";

export default function Home() {
  const scssFilesContents = getStaticData();

  return (
    <div className="font-sans">
      <main>
        <div className="my-2 flex w-full items-center justify-center p-4">
          <Input placeholder="Search..." />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(scssFilesContents).map(([folderName, files]) => (
            <div key={folderName} className="rounded-lg border p-4">
              <h2 className="mb-2 text-lg font-semibold">{folderName}</h2>
              {Object.entries(files).map(([fileName, items]) => (
                <div key={fileName} className="mb-4">
                  <h3 className="text-md font-medium">{fileName}</h3>
                  {items.map((item) => (
                    <div key={item.name} className="mt-2">
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <CssPreview
                        lightTokens={item.example}
                        darkTokens={item.darkExample}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
