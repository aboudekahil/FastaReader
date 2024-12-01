import { useAtomValue } from "jotai";
import { genomeAnalysisAtom } from "../jotai/states.ts";
import { GenomeTableControls } from "./GenomeTableControls.tsx";
import { ConsensusTableRow, GenomeTableRow } from "./GenomeTableRow.tsx";
import { FunctionComponent } from "react";

export const GenomeTable: FunctionComponent = () => {
  const genomeAnalysis = useAtomValue(genomeAnalysisAtom);

  if (!genomeAnalysis) return null;

  const { genomes } = genomeAnalysis;

  return (
    <>
      <GenomeTableControls />
      <table className="table border max-w-1/2 font-mono">
        <tbody>
          <tr className="border border-red-600">
            <ConsensusTableRow
              genomeAnalysis={genomeAnalysis}
              className="shadow-2xl"
            />
          </tr>
          {genomes.map((genome, index) => (
            <tr key={`${genome.title}-${index}`} className="border">
              <GenomeTableRow
                individualGenome={genome}
                genomeAnalysis={genomeAnalysis}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
