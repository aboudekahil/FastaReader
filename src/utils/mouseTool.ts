import React, { MutableRefObject } from "react";

export function mouseToolEvent(
  timeRef: MutableRefObject<number>,
  cbEnter: (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  ) => void,
  cbLeave: (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  ) => void,
  delay: number,
) {
  const onMouseEnter = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  ) => {
    timeRef.current = setTimeout(() => {
      cbEnter(event);
    }, delay);
  };

  const onMouseLeave = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  ) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      cbLeave(event);
    }
  };

  return [onMouseEnter, onMouseLeave];
}
