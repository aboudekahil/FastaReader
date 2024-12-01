import {
  useState,
  useEffect,
  FunctionComponent,
  ChangeEvent,
  HTMLProps,
} from "react";
import { useAtom, useAtomValue } from "jotai/index";
import { genomeAnalysisAtom, indxBeginAtom } from "../jotai/states.ts";
import { Flip, toast } from "react-toastify";

export const DebouncedInput: FunctionComponent<HTMLProps<HTMLInputElement>> = (
  props,
) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [indxBeginValue, setIndxBegin] = useAtom(indxBeginAtom);
  const genomeLength =
    useAtomValue(genomeAnalysisAtom)!.consensus.genome.length;
  const [isLastChanged, setIsLastChanged] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== indxBeginValue) {
        if (isLastChanged) {
          setIndxBegin(inputValue);
          setIsLastChanged(false);
        } else {
          setInputValue(indxBeginValue);
        }
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [indxBeginValue, inputValue, isLastChanged, setIndxBegin]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const svalue = e.target.value;
    if (svalue === "") {
      setInputValue(0);
      setIsLastChanged(true);
    }
    const value = parseInt(svalue);
    if (isNaN(value)) {
      toast.error("Input given Not a Number", {
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
      throw new Error("Invalid value");
    }

    setInputValue(value);
    setIsLastChanged(true);
  };

  return (
    <input
      {...props}
      type={"number"}
      onChange={handleInputChange}
      value={inputValue}
      min={0}
      max={genomeLength}
    />
  );
};
