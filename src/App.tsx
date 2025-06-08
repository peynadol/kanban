import { useState } from "react";
import Board from "./components/Board";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import AddTaskForm from "./components/AddTaskForm";
import { initialBoardData } from "./initialBoard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

type Task = {
  id: string;
  title: string;
  description?: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type Board = {
  id: string;
  title: string;
  columns: Column[];
};

function App() {
  const [boardsData, setBoardsData] = useState<Board[]>(initialBoardData);
  const [activeBoardId, setActiveBoardId] = useState<string>(
    initialBoardData[0].id
  );

  const activeBoard = boardsData.find((board) => board.id === activeBoardId);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = activeBoard?.columns.find((column) =>
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
              tasks: taskToMove ? [...column.tasks, taskToMove] : column.tasks,
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

  const addNewBoard = (newBoard: Board) => {
    setBoardsData((prevBoards) => [...prevBoards, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  const removeBoard = (boardId: string) => {
    setBoardsData((prevBoards) => {
      const updatedBoards = prevBoards.filter((board) => board.id !== boardId);

      if (activeBoardId === boardId) {
        setActiveBoardId(updatedBoards[0]?.id || "");
      }

      return updatedBoards;
    });
  };

  const handleAddTask = (status: string, newTask: Task) => {
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
          onAddBoard={addNewBoard}
          onRemoveBoard={removeBoard}
        />
        <main className="flex-1 p-4 overflow-auto">
          <AddTaskForm onAddTask={handleAddTask} />
          <DndContext onDragEnd={handleDragEnd}>
            <SidebarTrigger />
            {activeBoard ? (
              <Board boardData={activeBoard} />
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No board selected.
              </p>
            )}
          </DndContext>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
