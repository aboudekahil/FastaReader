import { atom } from "jotai";
import { GenomeAnalysis } from "../fasta/GenomeAnalysis.ts";

export const indxBeginAtom = atom(0);
export const indxIncrementAtom = atom(84);
export const genomeAnalysisAtom = atom<GenomeAnalysis>();
