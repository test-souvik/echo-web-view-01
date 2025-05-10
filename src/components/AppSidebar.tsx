
import { useState } from "react";
import {
  Bell,
  Calendar,
  Building,
  User,
  MessageCircle,
  CheckSquare,
  FileText,
  Sun,
  Cloud,
  HelpCircle,
  Settings,
  Book,
  Info,
  Search
} from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarNavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  hasNotification?: boolean;
}

export const AppSidebar = () => {
  const { state } = useSidebar();
  const [activeItem, setActiveItem] = useState("Issues");

  const mainNavItems: SidebarNavItem[] = [
    { icon: Bell, label: "Notifications", href: "#notifications", hasNotification: true },
    { icon: Calendar, label: "Calendar", href: "#calendar" },
    { icon: Building, label: "Projects", href: "#projects" },
  ];

  const middleNavItems: SidebarNavItem[] = [
    { icon: User, label: "Profile", href: "#profile" },
    { icon: MessageCircle, label: "Messages", href: "#messages" },
    { icon: CheckSquare, label: "Tasks", href: "#tasks", active: true },
    { icon: FileText, label: "Documents", href: "#documents" },
    { icon: Sun, label: "Theme", href: "#theme" },
    { icon: Book, label: "Knowledge Base", href: "#knowledge" },
    { icon: Cloud, label: "Cloud Storage", href: "#storage" },
  ];

  const bottomNavItems: SidebarNavItem[] = [
    { icon: Settings, label: "Settings", href: "#settings" },
    { icon: HelpCircle, label: "Help", href: "#help" },
  ];

  const handleNavClick = (label: string) => {
    setActiveItem(label);
  };
  
  return (
    <Sidebar 
      className="border-r bg-white"
      variant="sidebar"
      collapsible="icon"
    >
      <SidebarHeader className="p-0">
        <div className="flex items-center justify-center py-4">
          <div className="h-10 w-10 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold">
            T
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="flex flex-col items-center">
            <div className="h-0.5 w-5 bg-gray-400 mb-1.5"></div>
            <div className="h-0.5 w-5 bg-gray-400"></div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-0 py-2">
        {/* Top section */}
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <NavItem 
              key={item.label}
              item={item}
              onClick={() => handleNavClick(item.label)}
              isActive={activeItem === item.label || item.active}
            />
          ))}
        </SidebarMenu>
        
        <div className="my-2 border-t border-gray-200 mx-3"></div>
        
        {/* Middle section */}
        <SidebarMenu>
          {middleNavItems.map((item) => (
            <NavItem 
              key={item.label}
              item={item}
              onClick={() => handleNavClick(item.label)}
              isActive={activeItem === item.label || item.active}
            />
          ))}
        </SidebarMenu>

        <div className="my-2 border-t border-gray-200 mx-3"></div>

        {/* Bottom section */}
        <SidebarMenu className="mt-auto">
          {bottomNavItems.map((item) => (
            <NavItem 
              key={item.label}
              item={item}
              onClick={() => handleNavClick(item.label)}
              isActive={activeItem === item.label || item.active}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-0 mt-auto">
        <div className="flex justify-center items-center p-3">
          <div className="h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold relative">
            TP
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const NavItem = ({ 
  item, 
  onClick, 
  isActive 
}: { 
  item: SidebarNavItem; 
  onClick: () => void;
  isActive: boolean;
}) => {
  const Icon = item.icon;
  
  return (
    <SidebarMenuItem>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton 
              onClick={onClick}
              data-active={isActive}
              className={cn(
                "flex justify-center w-full py-2.5",
                isActive && "bg-gray-100"
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  "h-5 w-5 text-gray-500",
                  isActive && "text-gray-700"
                )} />
                
                {item.hasNotification && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  );
};

export default AppSidebar;
