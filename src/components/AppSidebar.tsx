
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
  Search,
  Layers,
  List,
  Tag
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
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

interface SidebarNavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  hasNotification?: boolean;
}

interface ExpandedSidebarProps {
  activeItem: string;
  onClose: () => void;
}

export const AppSidebar = () => {
  const { state } = useSidebar();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expandedSidebar, setExpandedSidebar] = useState(false);

  const mainNavItems: SidebarNavItem[] = [
    { icon: Bell, label: "Notifications", href: "#notifications", hasNotification: true },
    { icon: Calendar, label: "Calendar", href: "#calendar" },
    { icon: Building, label: "Projects", href: "#projects" },
    { icon: CheckSquare, label: "Tasks", href: "#tasks" },
    { icon: User, label: "Profile", href: "#profile" },
  ];

  const middleNavItems: SidebarNavItem[] = [
    { icon: MessageCircle, label: "Messages", href: "#messages" },
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
    if (activeItem === label) {
      // Toggle expanded sidebar if clicking the same item
      setExpandedSidebar(!expandedSidebar);
    } else {
      // Set new active item and ensure expanded sidebar is open
      setActiveItem(label);
      setExpandedSidebar(true);
    }
  };

  const handleCloseSidebar = () => {
    setExpandedSidebar(false);
  };
  
  return (
    <div className="flex h-full">
      {/* Main thin sidebar */}
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
        </SidebarHeader>

        <SidebarContent className="px-0 py-2">
          {/* Top section */}
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <NavItem 
                key={item.label}
                item={item}
                onClick={() => handleNavClick(item.label)}
                isActive={activeItem === item.label}
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
                isActive={activeItem === item.label}
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
                isActive={activeItem === item.label}
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

      {/* Expanded sidebar */}
      {expandedSidebar && activeItem && (
        <ExpandedSidebar activeItem={activeItem} onClose={handleCloseSidebar} />
      )}
    </div>
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
                isActive ? "bg-gray-100" : ""
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

const ExpandedSidebar = ({ activeItem, onClose }: ExpandedSidebarProps) => {
  // Define different content based on the active item
  const renderContent = () => {
    switch (activeItem) {
      case "Tasks":
        return (
          <div className="flex flex-col p-2">
            <div className="flex items-center mb-6 px-4 pt-2">
              <span className="text-lg font-semibold">Tasks</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                <CheckSquare className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">My tasks</span>
              </div>
              <div className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer bg-gray-100">
                <List className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">All issues</span>
              </div>
              <div className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                <Layers className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">All projects</span>
              </div>
              <div className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                <Tag className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">Labels</span>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-200" />
            
            <div className="mt-4 px-4">
              <div className="flex items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Your projects</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <span className="h-4 w-4 mr-3 bg-yellow-200 text-xs flex items-center justify-center rounded">⭐</span>
                  <span className="text-sm">GAME DESIGN (EXAMPLE)</span>
                </div>
                <div className="ml-4 flex items-center py-1.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FileText className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">Issues</span>
                </div>
                <div className="ml-4 flex items-center py-1.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <Layers className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">Components</span>
                </div>
                <div className="flex items-center py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <span className="h-4 w-4 mr-3 bg-yellow-200 text-xs flex items-center justify-center rounded">⭐</span>
                  <span className="text-sm">WELCOME TO HULY!</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto px-4 py-4">
              <div className="flex items-center py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">Help & Support</span>
              </div>
            </div>
          </div>
        );
      case "Projects":
        return (
          <div className="flex flex-col p-2">
            <div className="flex items-center mb-6 px-4 pt-2">
              <span className="text-lg font-semibold">Projects</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                <Building className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">My projects</span>
              </div>
              <div className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                <List className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">All projects</span>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-200" />
            
            <div className="mt-4 px-4">
              <div className="flex items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Recent projects</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <span className="h-4 w-4 mr-3 bg-yellow-200 text-xs flex items-center justify-center rounded">⭐</span>
                  <span className="text-sm">GAME DESIGN (EXAMPLE)</span>
                </div>
                <div className="flex items-center py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <span className="h-4 w-4 mr-3 bg-yellow-200 text-xs flex items-center justify-center rounded">⭐</span>
                  <span className="text-sm">WELCOME TO HULY!</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col p-4">
            <div className="flex items-center mb-6">
              <span className="text-lg font-semibold">{activeItem}</span>
            </div>
            <div className="text-sm text-gray-600">
              Content for {activeItem} would appear here.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-64 border-r bg-white overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default AppSidebar;
