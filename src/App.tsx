import { useState } from "react";
import Board from "./components/Board";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import AddTaskForm from "./components/AddTaskForm";
import { initialBoardData } from "./initialBoard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Task from "./components/Task";

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
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const activeBoard = boardsData.find((board) => board.id === activeBoardId);

  const activeTask =
    activeBoard?.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === activeTaskId) || null;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTaskId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = activeBoard?.columns.find((column) =>
      column.tasks.some((task) => task.id === activeId)
    );

    const targetColumn =
      activeBoard?.columns.find((column) => column.id === overId) ??
      activeBoard?.columns.find((column) =>
        column.tasks.some((task) => task.id === overId)
      );

    if (!sourceColumn || !targetColumn) return;

    const sourceIndex = sourceColumn.tasks.findIndex(
      (task) => task.id === activeId
    );
    const targetIndex = targetColumn.tasks.findIndex(
      (task) => task.id === overId
    );

    if (sourceColumn.id === targetColumn.id) {
      setBoardsData((prevBoards) =>
        prevBoards.map((board) => {
          if (board.id !== activeBoardId) return board;

          const updatedColumns = board.columns.map((column) => {
            if (column.id === sourceColumn.id) {
              const newTasks = [...column.tasks];
              const [movedTask] = newTasks.splice(sourceIndex, 1);
              newTasks.splice(targetIndex, 0, movedTask);

              return { ...column, tasks: newTasks };
            } else {
              return column;
            }
          });

          return { ...board, columns: updatedColumns };
        })
      );

      console.log(`Reordered task ${activeId} in column ${sourceColumn.id}`);
    } else {
      const taskToMove = sourceColumn.tasks[sourceIndex];

      setBoardsData((prevBoards) =>
        prevBoards.map((board) => {
          if (board.id !== activeBoardId) return board;

          const updatedColumns = board.columns.map((column) => {
            if (column.id === sourceColumn.id) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== activeId),
              };
            } else if (column.id === targetColumn.id) {
              const newTasks = [...column.tasks];
              newTasks.splice(targetIndex, 0, taskToMove);
              return {
                ...column,
                tasks: newTasks,
              };
            } else {
              return column;
            }
          });

          return { ...board, columns: updatedColumns };
        })
      );

      console.log(
        `Moved task ${activeId} from column ${sourceColumn.id} to column ${targetColumn.id}`
      );
    }
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
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SidebarTrigger />
            {activeBoard ? (
              <Board boardData={activeBoard} />
            ) : (
              <p>No board selected</p>
            )}

            <DragOverlay>
              {activeTask ? <Task task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
