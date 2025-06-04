import Columns from "./Columns";
const Board = ({ boardData }) => {
  return (
    console.log("Board component", boardData),
    console.log("Columns in boardData", boardData.columns),
    (
      <div className="flex gap-4">
        {boardData.columns.map((column) => (
          <Columns key={column.id} column={column} />
        ))}
      </div>
    )
  );
};

export default Board;
