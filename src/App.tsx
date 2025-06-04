import { useState } from "react";
import Board from "./components/Board";
import { DndContext } from "@dnd-kit/core";
import AddTaskForm from "./components/AddTaskForm";
import { initialBoardData } from "./initialBoard";
function App() {
  const [boardData, setBoardData] = useState(initialBoardData[0]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id; // this is the task being dragged
    const overId = over.id; // this is the column being hovered over

    // finds the column that contains the task being dragged
    const sourceColumn = boardData.columns.find((column) =>
      column.tasks.some((task) => task.id === activeId)
    );

    // iterates over source column and grabs entire matching task
    const taskToMove = sourceColumn?.tasks.find((task) => task.id === activeId);

    // if task is dropped in its original column, do nothing
    if (sourceColumn?.id === overId) {
      console.log(`Task ${activeId} dropped in the same column ${overId}`);
      return;
    }

    const updatedColumns = boardData.columns.map((column) => {
      if (column.id === sourceColumn?.id) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== activeId),
        };
      } else if (column.id === overId) {
        return {
          ...column,
          tasks: [...column.tasks, taskToMove],
        };
      } else {
        return column;
      }
    });
    setBoardData({ columns: updatedColumns });
    console.log(`Dragged task ${activeId} over column ${overId}`);
  };

  const handleAddTask = (status, newTask) => {
    setBoardData((prevData) => {
      const updatedColumns = prevData.columns.map((column) => {
        if (column.id === status) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });
      return { columns: updatedColumns };
    });
  };

  return (
    <>
      <AddTaskForm onAddTask={handleAddTask} />
      <DndContext onDragEnd={handleDragEnd}>
        <Board boardData={boardData} />
      </DndContext>
    </>
  );
}

export default App;
