import Columns from "./Columns";
type BoardProps = {
  boardData: {
    id: string;
    title: string;
    columns: {
      id: string;
      title: string;
      tasks: {
        id: string;
        title: string;
      }[];
    }[];
  };
};
const Board = ({ boardData }: BoardProps) => {
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
