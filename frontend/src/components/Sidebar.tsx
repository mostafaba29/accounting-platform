import { useState } from "react";
import {
  FileBarChart,
  Book,
  Users,
  Home,
  Settings,
  LineChart,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
interface SideBarProps {
  onIconClick: (icon: string) => void;
}

export default function SideBar({ onIconClick }: SideBarProps) {
  const [activeIcon, setActiveIcon] = useState<string>("home");

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    onIconClick(icon);
  };

  const iconClass = (icon: string) =>
    `mb-2 p-1 rounded ${
      activeIcon === icon ? "bg-slate-300" : "hover:bg-slate-300"
    }`;

  return (
    <div className="flex flex-col justify-between w-[50px] rounded-lg border border-slate-300">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Home size="48" className={iconClass("home")} onClick={() => handleIconClick("home")}/>
            </TooltipTrigger>
            <TooltipContent><p>Home</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <FileBarChart size="48" className={iconClass("product")} onClick={() => handleIconClick("product")}/>
            </TooltipTrigger>
            <TooltipContent><p>Products</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Book size="48" className={iconClass("blog")} onClick={() => handleIconClick("blog")}/>
            </TooltipTrigger>
            <TooltipContent><p>Blogs</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Users size="48" className={iconClass("user")} onClick={() => handleIconClick("user")}/>
              </TooltipTrigger>
            <TooltipContent><p>Users</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <LineChart size="48" className={iconClass("statistics")} onClick={() => handleIconClick("statistics")} />
            </TooltipTrigger>
            <TooltipContent><p>Statistics</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Settings size="48" className={iconClass("settings")} onClick={() => handleIconClick("settings")} />
            </TooltipTrigger>
            <TooltipContent><p>Settings</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
