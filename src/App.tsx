import { useCallback } from "react";
import { GenomeTable } from "./table/GenomeTable.tsx";
import { FastaReader } from "./fasta/FastaReader.ts";
import { GenomeAnalysis } from "./fasta/GenomeAnalysis.ts";
import { useSetAtom } from "jotai/react";
import { genomeAnalysisAtom, indxBeginAtom } from "./jotai/states.ts";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const setGenome = useSetAtom(genomeAnalysisAtom);
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
        toast.error("No file selected", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onloadend = () => {
        if (reader.result) {
          const result = reader.result as string;
          setIndxBegin(0);
          try {
            setGenome(new GenomeAnalysis(FastaReader(result)));
          } catch (e) {
            toast.error("Invalid fasta format.", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Flip,
            });
            throw e;
          }
        }
      };

      reader.onerror = () => {
        toast.error("Couldn't read file uploaded", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      };
    },
    [setGenome, setIndxBegin],
  );

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
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
