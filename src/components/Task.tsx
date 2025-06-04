import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: CSS.Transform.toString(transform) }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-amber-200 p-4 m-4 rounded-lg shadow-md outline-1"
    >
      {task.title}
    </div>
  );
};
export default Task;
