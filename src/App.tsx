import { useState } from "react";
import Board from "./components/Board";
import { DndContext } from "@dnd-kit/core";
import AddTaskForm from "./components/AddTaskForm";
import { initialBoardData } from "./initialBoard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

function App() {
  const [boardsData, setBoardsData] = useState(initialBoardData);
  const [activeBoardId, setActiveBoardId] = useState(initialBoardData[0].id);

  const activeBoard = boardsData.find((board) => board.id === activeBoardId);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = activeBoard.columns.find((column) =>
      column.tasks.some((task) => task.id === activeId)
    );

    const taskToMove = sourceColumn?.tasks.find((task) => task.id === activeId);

    if (sourceColumn?.id === overId) {
      console.log(`Task ${activeId} dropped in the same column ${overId}`);
      return;
    }

    setBoardsData((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== activeBoardId) return board;

        const updatedColumns = board.columns.map((column) => {
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

        return { ...board, columns: updatedColumns };
      })
    );

    console.log(`Dragged task ${activeId} over column ${overId}`);
  };

  const handleAddTask = (status, newTask) => {
    setBoardsData((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== activeBoardId) return board;

        const updatedColumns = board.columns.map((column) => {
          if (column.id === status) {
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            };
          }
          return column;
        });

        return { ...board, columns: updatedColumns };
      })
    );
  };

  return (
    <div className="flex min-h-screen w-full">
      <SidebarProvider>
        <AppSidebar
          boards={boardsData}
          activeBoardId={activeBoardId}
          onSelectBoard={setActiveBoardId}
        />
        <main className="flex-1 p-4 overflow-auto">
          <AddTaskForm onAddTask={handleAddTask} />
          <DndContext onDragEnd={handleDragEnd}>
            <SidebarTrigger />
            <Board boardData={activeBoard} />
          </DndContext>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
