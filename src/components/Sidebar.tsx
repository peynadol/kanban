import { Kanban, Trash } from "lucide-react";
import { nanoid } from "nanoid";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type Task = {
  id: string;
  title: string;
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

type AppSidebarProps = {
  boards: Board[];
  activeBoardId: string;
  onSelectBoard: (boardId: string) => void;
  onAddBoard: (board: Board) => void;
  onRemoveBoard: (boardId: string) => void;
};

export function AppSidebar({
  boards,
  activeBoardId,
  onSelectBoard,
  onAddBoard,
  onRemoveBoard,
}: AppSidebarProps) {
  const handleAddBoard = () => {
    const newBoardTitle = prompt("Enter the title for the new board:");
    const newBoard: Board = {
      id: nanoid(),
      title: newBoardTitle || "New Board",
      columns: [
        { id: "todo", title: "To Do", tasks: [] },
        { id: "doing", title: "Doing", tasks: [] },
        { id: "done", title: "Done", tasks: [] },
      ],
    };
    onAddBoard(newBoard);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>All Boards ({boards.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectBoard(board.id)}
                    className={
                      board.id === activeBoardId ? "bg-primary text-white" : ""
                    }
                  >
                    <Kanban />
                    <span>{board.title}</span>
                    <Trash
                      className="bg-red-500 text-white rounded-full p-1 ml-auto"
                      onClick={() => onRemoveBoard(board.id)}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenuButton onClick={handleAddBoard} className="mt-2">
              Add new board
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
