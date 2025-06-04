import { useState } from "react";
import Board from "./components/Board";
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
        tasks: [],
      },
    ],
  });

  return (
    <>
      <Board boardData={boardData} />
    </>
  );
}

export default App;
