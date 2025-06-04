import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
//TODO: style the dragged task
//TODO: consider using DragOverlay component in dnd-kit
//TODO: figure out how to re-order tasks within the same column, bumping other tasks up or down

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
