export type consensus_fasta_genomes = keyof typeof ConsensusUtil.FASTA_MAPPINGS;

export class ConsensusUtil {
  static FASTA_MAPPINGS = {
    // length === 1
    A: ["A"],
    T: ["T"],
    C: ["C"],
    G: ["G"],
    U: ["U"],
    "-": ["-"],

    // length === 2
    R: ["A", "G"],
    M: ["A", "C"],
    S: ["C", "G"],
    W: ["A", "T", "U"],
    Y: ["C", "T", "U"],
    K: ["G", "T", "U"],

    // length === 3
    V: ["A", "C", "G"],
    H: ["A", "C", "T", "U"],
    D: ["A", "G", "T", "U"],
    B: ["C", "G", "T", "U"],

    // length === 4
    N: ["A", "C", "G", "T", "U"],
  } as const;

  private static EQUALITY_MAPPINGS = {
    A: ["A", "R", "M", "W", "V", "H", "D"],
    T: ["T", "W", "Y", "K", "H", "D", "B"],
    C: ["C", "M", "S", "Y", "V", "H", "B"],
    G: ["G", "R", "S", "K", "V", "D", "B"],
    U: ["U", "W", "Y", "K", "H", "D", "B"],
    R: ["R", "A", "G"],
    M: ["M", "A", "C"],
    S: ["S", "C", "G"],
    W: ["W", "A", "T", "U"],
    Y: ["Y", "C", "T", "U"],
    K: ["K", "G", "T", "U"],
    V: ["V", "A", "C", "G"],
    H: ["H", "A", "C", "T", "U"],
    D: ["D", "A", "G", "T", "U"],
    B: ["B", "C", "G", "T", "U"],
  };

  private countMap = new Map<"A" | "C" | "G" | "T" | "U" | "-", number>();

  addGenome(genome: consensus_fasta_genomes): void {
    ConsensusUtil.FASTA_MAPPINGS[genome].forEach((base) => {
      this.countMap.set(base, (this.countMap.get(base) || 0) + 1);
    });
  }

  getConsensusGenome(): consensus_fasta_genomes {
    if (this.countMap.size === 0) throw new Error("No input given");

    const entries = Array.from(this.countMap.entries()).sort(
      (a, b) => b[1] - a[1],
    );
    const largestCount = entries[0][1];

    const mostFrequentBases = entries
      .filter(([, count]) => count === largestCount)
      .map(([base]) => base);

    const matchResult = Object.entries(ConsensusUtil.FASTA_MAPPINGS).find(
      ([, values]) =>
        values.length === mostFrequentBases.length &&
        values.every((value) => mostFrequentBases.includes(value)),
    );

    return matchResult ? (matchResult[0] as consensus_fasta_genomes) : "N";
  }

  static checkEquality(
    genome1: consensus_fasta_genomes,
    genome2: consensus_fasta_genomes,
  ): boolean {
    if (genome1 === "N" || genome2 === "N") {
      return true;
    }

    if (genome2 === "-" || genome1 === "-") {
      return false;
    }

    if (this.EQUALITY_MAPPINGS[genome1] === undefined) {
      return false;
    }

    return this.EQUALITY_MAPPINGS[genome1].includes(genome2);
  }

  clear(): void {
    this.countMap.clear();
  }
}
