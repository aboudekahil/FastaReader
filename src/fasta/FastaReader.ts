import { Genome } from "./Genome.ts";

export function FastaReader(fasta: string): Genome[] {
  const result: Genome[] = [];

  const lines = fasta.split(">");

  for (let i = 0; i < lines.length; i += 1) {
    const pair = lines[i].split("\n");

    if (pair.length === 1) {
      continue;
    }

    const title = pair[0].trim();
    const genome = pair.slice(1).join("");

    if (title === "" || genome === "") {
      continue;
    }
    result.push(new Genome(title, genome));
  }

  return result;
}
