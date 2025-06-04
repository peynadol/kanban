import { useState } from "react";
import Board from "./components/Board";
import { DndContext } from "@dnd-kit/core";
function App() {
  const [boardData, setBoardData] = useState({
    columns: [
      {
        id: "todo",
        tasks: [
          { id: "task-1", title: "Learn React" },
          { id: "task-2", title: "Build Kanban Board" },
        ],
      },
      {
        id: "doing",
        tasks: [{ id: "task-3", title: "Writing Zod schemas" }],
      },
      {
        id: "done",
        tasks: [{ id: "task-4", title: "Render tasks" }],
      },
    ],
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id; // this is the task
    const overId = over.id; // this is the column

    //TODO: find source column
    //TODO: find task
    // if source id is the same as over id, do nothing
    // if source id is different - add task to destination column and remove from source column
    // update state

    console.log(`Dragged task ${activeId} over column ${overId}`);
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Board boardData={boardData} />
      </DndContext>
    </>
  );
}

export default App;
