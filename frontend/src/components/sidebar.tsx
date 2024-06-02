import { useState } from 'react';
import { FileBarChart, Book, Users, Home, Settings, LineChart } from 'lucide-react';

interface SideBarProps {
  onIconClick: (icon: string) => void;
}

export default function SideBar({ onIconClick }: SideBarProps) {
  const [activeIcon, setActiveIcon] = useState<string>('product');

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    onIconClick(icon);
  };

  const iconClass = (icon: string) =>
    `mb-2 p-1 rounded ${activeIcon === icon ? 'bg-slate-300' : 'hover:bg-slate-300'}`;

  return (
    <div className="flex flex-col justify-between w-[50px] rounded-lg border border-slate-300">
      <div>
        <Home size="48" className={iconClass('home')} onClick={() => handleIconClick('home')} />
        <FileBarChart
          size="48"
          className={iconClass('product')}
          onClick={() => handleIconClick('product')}
        />
        <Book size="48" className={iconClass('blog')} onClick={() => handleIconClick('blog')} />
        <Users size="48" className={iconClass('user')} onClick={() => handleIconClick('user')} />
        <LineChart
          size="48"
          className={iconClass('statistics')}
          onClick={() => handleIconClick('statistics')}
        />
      </div>
      <div>
        <Settings size="48" className={iconClass('settings')} onClick={() => handleIconClick('settings')} />
      </div>
    </div>
  );
}
