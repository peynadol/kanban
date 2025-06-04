export const initialBoardData = [
  {
    id: "board-1",
    title: "Personal Kanban",
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
  },
  {
    id: "board-2",
    title: "Work Project",
    columns: [
      {
        id: "todo",
        tasks: [
          { id: "task-5", title: "Setup project repo" },
          { id: "task-6", title: "Write project plan" },
        ],
      },
      {
        id: "doing",
        tasks: [{ id: "task-7", title: "Initial prototype" }],
      },
      {
        id: "done",
        tasks: [{ id: "task-8", title: "Team kickoff meeting" }],
      },
    ],
  },
  {
    id: "board-3",
    title: "Learning Kanban",
    columns: [
      {
        id: "todo",
        tasks: [
          { id: "task-9", title: "Learn Zustand" },
          { id: "task-10", title: "Learn TanStack Query" },
        ],
      },
      {
        id: "doing",
        tasks: [{ id: "task-11", title: "Practice DnD Kit" }],
      },
      {
        id: "done",
        tasks: [{ id: "task-12", title: "React Hook Form deep dive" }],
      },
    ],
  },
];
