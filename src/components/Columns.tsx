import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";
type ColumnsProps = {
  column: {
    id: string;
    title: string;
    tasks: {
      id: string;
      title: string;
    }[];
  };
};

const Columns = ({ column }: ColumnsProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-gray-100 p-4 rounded w-72"
      style={{ backgroundColor: isOver ? "lightgreen" : undefined }}
    >
      <h2>
        {column.title} ({column.tasks.length})
      </h2>

      {column.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
export default Columns;
