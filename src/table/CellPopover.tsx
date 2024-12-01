type CellPopoverProps = {
  base: string;
  position: number;
  gaps: number;
  mismatches: number;
  numberOfRows: number;
  genomeLength: number;
};

export function CellPopover({
  base,
  numberOfRows,
  gaps,
  mismatches,
  position,
  genomeLength,
}: CellPopoverProps) {
  return (
    <div className="flex flex-col bg-black text-white p-2 rounded">
      <span>
        <strong>
          <em>Base: </em>
        </strong>
        {base}
      </span>
      <span>
        <strong>
          <em>Position: </em>
        </strong>
        {position} of <em>{genomeLength} amino acids</em>
      </span>
      <span>
        <strong>
          <em>Gaps: </em>
        </strong>
        {gaps} of <em>{numberOfRows} rows</em>
      </span>
      <span>
        <strong>
          <em>Mismatches: </em>
        </strong>
        {mismatches} of <em>{numberOfRows} rows</em>
      </span>
      <span>
        <strong>
          <em>Matches: </em>
        </strong>
        {numberOfRows - mismatches} of <em>{numberOfRows} rows</em>
      </span>
    </div>
  );
}
