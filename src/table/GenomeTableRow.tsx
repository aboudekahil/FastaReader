import { useAtomValue } from "jotai/index";
import { indxBeginAtom, indxIncrementAtom } from "../jotai/states.ts";
import { Genome } from "../fasta/Genome.ts";
import { ConsensusCell, GenomeCell } from "./GenomeCell.tsx";
import { GenomeAnalysis } from "../fasta/GenomeAnalysis.ts";
import type { JSX, FunctionComponent } from "react";
import cn from "../utils/cn.ts";

type GenomeTableRowProps = {
  individualGenome: Genome;
  genomeAnalysis: GenomeAnalysis;
  className?: string;
};

export const GenomeTableRow: FunctionComponent<GenomeTableRowProps> = ({
  individualGenome,
  genomeAnalysis,
  className,
}) => {
  const indxIncrement = useAtomValue(indxIncrementAtom);
  const indxBegin = useAtomValue(indxBeginAtom);

  const range = Math.min(
    indxIncrement,
    genomeAnalysis.consensus.genome.length,
    genomeAnalysis.consensus.genome.length - indxBegin,
  );

  const genomeCells: JSX.Element[] = [];

  for (let i = 0; i < range; i++) {
    genomeCells.push(
      <GenomeCell
        key={`${individualGenome.title}-${i}`}
        genome={individualGenome}
        genomeAnalysis={genomeAnalysis}
        indx={i}
        className={className}
      />,
    );
  }

  return (
    <>
      <th className="bg-amber-50 font-mono" key={individualGenome.title}>
        {individualGenome.title}
      </th>
      {...genomeCells}
    </>
  );
};

export const ConsensusTableRow: FunctionComponent<
  Omit<GenomeTableRowProps, "individualGenome">
> = ({ genomeAnalysis, className }) => {
  const indxIncrement = useAtomValue(indxIncrementAtom);
  const consensus = genomeAnalysis.consensus;
  const indxBegin = useAtomValue(indxBeginAtom);

  const range = Math.min(
    indxIncrement,
    genomeAnalysis.consensus.genome.length,
    genomeAnalysis.consensus.genome.length - indxBegin,
  );

  const consensusCells: JSX.Element[] = [];

  for (let i = 0; i < range; i++) {
    consensusCells.push(
      <ConsensusCell
        indx={i}
        key={`${consensus.title}-${i}`}
        className={cn(className, "sticky top-0")}
        genomeAnalysis={genomeAnalysis}
      />,
    );
  }

  return (
    <>
      <th className="bg-amber-50 font-mono sticky top-0">Consensus</th>
      {...consensusCells}
    </>
  );
};
