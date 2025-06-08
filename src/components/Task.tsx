import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react"; // or any icon you like

type TaskProps = {
  task: {
    id: string;
    title: string;
  };
};

const Task = ({ task }: TaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    willChange: transform ? "transform" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-amber-200 p-4 m-4 rounded-lg shadow-md outline-1 flex justify-between items-center"
    >
      <span>{task.title}</span>

      <button
        {...attributes}
        {...listeners}
        className="cursor-grab p-1 text-gray-600 hover:text-black"
      >
        <GripVertical size={16} />
      </button>
    </div>
  );
};

export default Task;
