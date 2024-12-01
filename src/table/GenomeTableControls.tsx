import { useAtom, useAtomValue } from "jotai/index";
import {
  genomeAnalysisAtom,
  indxBeginAtom,
  indxIncrementAtom,
} from "../jotai/states.ts";
import { DebouncedInput } from "../utils/DebouncedInput.tsx";
import { useCallback, useEffect } from "react";

export function GenomeTableControls() {
  const [indxBegin, setIndxBegin] = useAtom(indxBeginAtom);
  const indxIncrement = useAtomValue(indxIncrementAtom);
  const genomeAnalysis = useAtomValue(genomeAnalysisAtom)!;

  const moveRight = useCallback(() => {
    setIndxBegin(
      (indxBegin + indxIncrement) % genomeAnalysis.consensus.genome.length,
    );
  }, [
    genomeAnalysis.consensus.genome.length,
    indxBegin,
    indxIncrement,
    setIndxBegin,
  ]);

  const moveLeft = useCallback(() => {
    setIndxBegin(Math.max(indxBegin - indxIncrement, 0));
  }, [indxBegin, indxIncrement, setIndxBegin]);

  const handleKeyDownEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && genomeAnalysis) {
        event.stopPropagation();
        moveRight();
      }

      if (event.key === "ArrowLeft") {
        event.stopPropagation();
        moveLeft();
      }
    },
    [genomeAnalysis, moveLeft, moveRight],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [handleKeyDownEvent]);

  if (!genomeAnalysis) {
    return null;
  }

  return (
    <>
      <div
        className={"border flex content-center items-center justify-between"}
      >
        <button className={"border p-2 pl-4 pr-5 "} onClick={moveLeft}>
          &lt;-
        </button>
        <progress
          className={"flex-auto min-h-1"}
          value={indxBegin}
          max={genomeAnalysis.consensus.genome.length - indxIncrement}
        ></progress>
        <button
          className={"float-right border p-2 pl-4 pr-5"}
          onClick={moveRight}
        >
          -&gt;
        </button>
      </div>
      <div
        className={
          "border flex gap-2 content-center items-center justify-center"
        }
      >
        <label>Position:</label>
        <div>
          <DebouncedInput
            value={indxBegin}
            type="number"
            min={0}
            max={genomeAnalysis.consensus.genome.length}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.stopPropagation();
              }
            }}
          />
          <span>
            /
            {Math.max(
              genomeAnalysis.consensus.genome.length - indxIncrement,
              genomeAnalysis.consensus.genome.length,
            )}
          </span>
        </div>
      </div>
    </>
  );
}
