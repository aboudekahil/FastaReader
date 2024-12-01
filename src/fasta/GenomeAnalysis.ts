import { Genome } from "./Genome.ts";
import { consensus_fasta_genomes, ConsensusUtil } from "./ConsensusUtil.ts";

export const AMINO_ACID_NAME = {
  A: "Adenine",
  C: "Cytosine",
  G: "Guanine",
  T: "Thymine",
  U: "Uracil",
  I: "Inosine",
  R: "A or G (I)",
  Y: "C or T or U",
  K: "G or T or U",
  M: "A or C",
  S: "C or G",
  W: "A or T or U",
  B: "C or G or T or U",
  D: "A or G or T or U",
  H: "A or C or T or U",
  V: "A or C or G",
  N: "A or C or G or T or U",
  "-": "-",
} as const;

export type fasta_genomes = keyof typeof AMINO_ACID_NAME;

export class GenomeAnalysis {
  public consensus: Genome;

  constructor(public genomes: Genome[]) {
    this.consensus = new Genome("Consensus", this.getConsensusGenome(genomes));
  }

  getConsensusGenome(genomes: Genome[]) {
    let consensus = "";

    let maxLengthGenome = 0;
    for (let i = 0; i < genomes.length; i++) {
      maxLengthGenome = Math.max(genomes[i].genome.length, maxLengthGenome);
    }

    const counter = new ConsensusUtil();
    for (let i = 0; i < maxLengthGenome; i++) {
      for (let j = 0; j < genomes.length; j++) {
        if (i < genomes[j].genome.length) {
          const genomeChar = genomes[j].genome[i] as consensus_fasta_genomes;

          counter.addGenome(genomeChar);
        }
      }

      consensus += counter.getConsensusGenome();
      counter.clear();
    }

    return consensus;
  }

  getGapCount(indx: number) {
    let gapCount = 0;

    for (let i = 0; i < this.genomes.length; i++) {
      if (this.genomes[i].genome[indx] === "-") {
        gapCount++;
      }
    }

    return gapCount;
  }

  getMismatchCount(indx: number, genomeChar: string) {
    let mismatchCount = 0;

    for (let i = 0; i < this.genomes.length; i++) {
      if (this.genomes[i].genome[indx] !== genomeChar) {
        mismatchCount++;
      }
    }

    return mismatchCount;
  }

  static getBaseName(amino_acide: fasta_genomes) {
    return AMINO_ACID_NAME[amino_acide];
  }
}
