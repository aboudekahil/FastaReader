import { useCallback } from "react";
import { GenomeTable } from "./table/GenomeTable.tsx";
import { FastaReader } from "./fasta/FastaReader.ts";
import { GenomeAnalysis } from "./fasta/GenomeAnalysis.ts";
import { useSetAtom } from "jotai/react";
import { genomeAnalysisAtom, indxBeginAtom } from "./jotai/states.ts";

export default function App() {
  const setGenome = useSetAtom(genomeAnalysisAtom);
  // const setIndxBegin = useSetAtom(indxBeginAtom);
  const setIndxBegin = useSetAtom(indxBeginAtom);

  const formOnSubmit = useCallback(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault();

      const fileInput: HTMLInputElement =
        formEvent.currentTarget.getElementsByTagName("input")[0];

      if (
        !fileInput.files ||
        (fileInput.files && fileInput.files.length === 0)
      ) {
        throw new Error("No files selected");
      }

      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onloadend = () => {
        if (reader.result) {
          const result = reader.result as string;
          setIndxBegin(0);
          setGenome(new GenomeAnalysis(FastaReader(result)));
        }
      };

      reader.onerror = (e) => {
        throw e;
      };
    },
    [setGenome, setIndxBegin],
  );

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <form onSubmit={formOnSubmit}>
        <input
          type={"file"}
          accept={".fasta, .fas, .fa, .fna, .ffn, .faa, .mpfa, .frn"}
        />
        <button
          type="submit"
          className="bg-gray-200 p-2 font-bold text-[#111111AA] rounded shadow"
        >
          Submit
        </button>
      </form>
      <div className="overscroll-x-contain h-1/2">
        <GenomeTable />
      </div>
    </main>
  );
}
