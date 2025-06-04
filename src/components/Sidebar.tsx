import { Kanban, Trash } from "lucide-react";

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

export function AppSidebar({
  boards,
  activeBoardId,
  onSelectBoard,
  onAddBoard,
  onRemoveBoard,
}) {
  const handleAddBoard = () => {
    const newBoardTitle = prompt("Enter the title for the new board:");
    const newBoard = {
      id: Date.now().toString(),
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
                  <SidebarMenuButton onClick={() => onSelectBoard(board.id)}>
                    <Kanban />
                    <span>{board.title}</span>
                    <Trash onClick={() => onRemoveBoard(board.id)} />
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
