import { z } from "zod";
const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
});

const ColumnSchema = z.object({
  id: z.enum(["todo", "doing", "done"]),
  tasks: z.array(TaskSchema),
});

const BoardSchema = z.object({
  columns: z.array(ColumnSchema),
});
