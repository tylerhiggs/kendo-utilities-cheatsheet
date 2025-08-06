import { getStaticData } from "./getStaticData";

export default function Home() {
  const scssFilesContents = getStaticData();

  return (
    <div className="font-sans">
      <main>
        <pre>{JSON.stringify(scssFilesContents, null, 2)}</pre>
      </main>
    </div>
  );
}
