// Memoized popover content generation
import { fasta_genomes, GenomeAnalysis } from "../fasta/GenomeAnalysis.ts";
import { CellPopover } from "./CellPopover.tsx";

export const generatePopoverContent = (
  genomeChar: fasta_genomes,
  indx: number,
  genomeAnalysis: GenomeAnalysis,
  genomeLength: number,
) => (
  <CellPopover
    base={GenomeAnalysis.getBaseName(genomeChar)}
    position={indx + 1}
    gaps={genomeAnalysis.getGapCount(indx)}
    mismatches={genomeAnalysis.getMismatchCount(indx, genomeChar)}
    numberOfRows={genomeAnalysis.genomes.length}
    genomeLength={genomeLength}
  />
);
