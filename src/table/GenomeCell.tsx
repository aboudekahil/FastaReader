import cn from "../utils/cn.ts";
import { FunctionComponent, useMemo, useRef, useState } from "react";
import { useAtomValue } from "jotai/index";
import { indxBeginAtom } from "../jotai/states.ts";
import { fasta_genomes, GenomeAnalysis } from "../fasta/GenomeAnalysis.ts";
import { Popover } from "react-tiny-popover";
import { Genome } from "../fasta/Genome.ts";
import { mouseToolEvent } from "../utils/mouseTool.ts";
import { generatePopoverContent } from "./GeneratePopoverContent.tsx";
import {
  consensus_fasta_genomes,
  ConsensusUtil,
} from "../fasta/ConsensusUtil.ts";

type GenomeCellProps = {
  indx: number;
  genome: Genome;
  genomeAnalysis: GenomeAnalysis;
  className?: string;
};

export const GenomeCell: FunctionComponent<GenomeCellProps> = ({
  indx,
  genome,
  genomeAnalysis,
  className,
}) => {
  const timeRef = useRef(0);
  const [shouldOpen, setShouldOpen] = useState(false);

  const indxBegin = useAtomValue(indxBeginAtom);
  const genomeIndx = indx + indxBegin;
  const genomeChar = genome.genome[genomeIndx] as consensus_fasta_genomes;

  const consensus = genomeAnalysis.consensus;
  const consensusChar = consensus.genome[genomeIndx] as consensus_fasta_genomes;

  const cellClass = cn(
    "bg-gray-200 select-none hover:bg-gray-800 hover:text-gray-200",
    {
      "bg-red-500": !ConsensusUtil.checkEquality(genomeChar, consensusChar),
      "bg-gray-400": genomeChar === "N",
      "bg-white": genomeChar === "-",
    },
    className,
  );

  const popoverContent = useMemo(
    () =>
      generatePopoverContent(
        genomeChar,
        genomeIndx,
        genomeAnalysis,
        consensus.genome.length,
      ),
    [genomeChar, genomeIndx, genomeAnalysis, consensus.genome.length],
  );

  const [onMouseEnter, onMouseLeave] = mouseToolEvent(
    timeRef,
    () => {
      setShouldOpen(true);
    },
    () => {
      setShouldOpen(false);
    },
    500,
  );

  return (
    <Popover isOpen={shouldOpen} content={popoverContent}>
      <td
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cellClass}
      >
        {genomeChar !== "-" ? genomeChar : " "}
      </td>
    </Popover>
  );
};

export const ConsensusCell: FunctionComponent<
  Omit<GenomeCellProps, "genome">
> = ({ genomeAnalysis, className, indx }) => {
  const timeRef = useRef(0);
  const [shouldOpen, setShouldOpen] = useState(false);

  const [onMouseEnter, onMouseLeave] = mouseToolEvent(
    timeRef,
    () => {
      setShouldOpen(true);
    },
    () => {
      setShouldOpen(false);
    },
    500,
  );

  const consensus = genomeAnalysis.consensus;
  const indxBegin = useAtomValue(indxBeginAtom);
  const genomeIndx = indx + indxBegin;
  const consensusChar = consensus.genome[genomeIndx] as fasta_genomes;

  const popoverContent = useMemo(
    () =>
      generatePopoverContent(
        consensusChar,
        genomeIndx,
        genomeAnalysis,
        consensus.genome.length,
      ),
    [consensusChar, genomeIndx, genomeAnalysis, consensus.genome.length],
  );

  return (
    <Popover isOpen={shouldOpen} positions={"bottom"} content={popoverContent}>
      <td
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "bg-gray-200 select-none hover:bg-gray-800 hover:text-gray-200",
          className,
        )}
      >
        {consensusChar}
      </td>
    </Popover>
  );
};
