import { Flip, toast } from "react-toastify";

const ALLOWED_GENOMES = new Set("ATGC-NUKSRYMWBDHV".split(""));

export class Genome {
  constructor(
    private _title: string,
    private _genome: string,
  ) {
    this.title = this._title;
    this.genome = this._genome.trim();
  }

  set title(title: string) {
    if (title === undefined || title === "" || title === null) {
      toast.error("Missing title", {
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
      throw new Error("Missing title");
    }
    this._title = title;
  }

  get title() {
    return this._title;
  }

  set genome(genome: string) {
    genome = genome.toUpperCase();
    for (let i = 0; i < genome.length; i++) {
      const genomeChar = genome.charAt(i);
      if (!ALLOWED_GENOMES.has(genomeChar)) {
        throw new Error("Invalid genomeAnalysis");
      }
    }
    this._genome = genome;
  }

  get genome() {
    return this._genome;
  }
}
