import { ConsensusUtil } from "../src/fasta/ConsensusUtil";
import { expect, test } from "vitest";

test("Consensus Util counting test", () => {
  const cutil = new ConsensusUtil();
  cutil.addGenome("A");
  cutil.addGenome("A");
  cutil.addGenome("C");
  cutil.addGenome("C");

  expect(cutil.getConsensusGenome()).toBe("M");
  cutil.clear();

  cutil.addGenome("N");
  cutil.addGenome("N");
  cutil.addGenome("N");
  cutil.addGenome("N");
  cutil.addGenome("A");

  expect(cutil.getConsensusGenome()).toBe("A");
  cutil.clear();

  cutil.addGenome("N");
  cutil.addGenome("N");
  cutil.addGenome("N");
  cutil.addGenome("N");

  expect(cutil.getConsensusGenome()).toBe("N");
  cutil.clear();

  cutil.addGenome("A");
  cutil.addGenome("C");
  cutil.addGenome("G");
  cutil.addGenome("T");
  expect(cutil.getConsensusGenome()).toBe("N");
});

test("Consensus Util equality test", () => {
  expect(ConsensusUtil.checkEquality("A", "M")).toBeTruthy();
  expect(ConsensusUtil.checkEquality("C", "N")).toBeTruthy();
  expect(ConsensusUtil.checkEquality("A", "A")).toBeTruthy();
});
