
import { useState } from "react";
import {
  LayoutDashboard,
  ListTodo,
  User,
  Settings,
  Calendar,
  Menu,
  Star,
  PlusCircle,
  ChevronDown,
  Tag,
  Folder,
  FileText,
  Component,
  Milestone,
  CircleCheck,
  CircleHelp,
} from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarNavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  tooltip?: string;
}

export const AppSidebar = () => {
  const { state } = useSidebar();
  const [activeItem, setActiveItem] = useState("Issues");

  const mainNavItems: SidebarNavItem[] = [
    { icon: CircleCheck, label: "My issues", href: "#my-issues" },
    { icon: CircleHelp, label: "All issues", href: "#all-issues", active: true },
  ];

  const projectNavItems: SidebarNavItem[] = [
    { icon: Folder, label: "All projects", href: "#all-projects" },
    { icon: Tag, label: "Labels", href: "#labels" },
  ];

  const handleNavClick = (label: string) => {
    setActiveItem(label);
  };
  
  return (
    <Sidebar 
      className="border-r bg-white"
      variant="sidebar"
      collapsible={state === "expanded" ? "icon" : "offcanvas"}
    >
      <SidebarHeader>
        <div className="flex items-center p-2">
          <div className="h-9 w-9 rounded bg-orange-500 flex items-center justify-center text-white font-bold">
            T
          </div>
          {state === "expanded" && (
            <h2 className="text-lg font-semibold ml-2">Tracker</h2>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>
        
        <div className="px-2 pb-2">
          <Button 
            className={cn(
              "w-full justify-start bg-huly-blue hover:bg-blue-600 transition-all",
              state === "collapsed" && "p-2 justify-center"
            )} 
            size={state === "collapsed" ? "icon" : "default"}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            {state === "expanded" && <span>New issue</span>}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton 
                  data-active={activeItem === item.label || item.active}
                  onClick={() => handleNavClick(item.label)}
                  tooltip={state === "collapsed" ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {state === "expanded" && <span>{item.label}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenu>
            {projectNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton 
                  data-active={activeItem === item.label}
                  onClick={() => handleNavClick(item.label)}
                  tooltip={state === "collapsed" ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {state === "expanded" && <span>{item.label}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          {state === "expanded" && (
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-3 py-2">
              <span>YOUR PROJECTS</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          )}
          <SidebarGroupContent className="px-2">
            <ProjectItem 
              emoji="🎮" 
              title="GAME DESIGN (EXAMPLE)" 
              isExpanded={state === "expanded"} 
            />
            <ProjectItem 
              emoji="👋" 
              title="WELCOME TO HULY!" 
              isExpanded={state === "expanded"} 
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={state === "collapsed" ? "Help & Support" : undefined}>
              <CircleHelp className="h-4 w-4 mr-2" />
              {state === "expanded" && <span>Help & Support</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const ProjectItem = ({ emoji, title, isExpanded = true }: { emoji: string; title: string; isExpanded?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!isExpanded) {
    return (
      <div className="flex items-center justify-center my-2 p-1 rounded hover:bg-gray-100 cursor-pointer">
        <span className="text-lg">{emoji}</span>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <div 
        className="flex items-center py-1 px-2 rounded hover:bg-gray-100 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="h-4 w-4 rounded bg-yellow-200 mr-2 flex items-center justify-center">
          {emoji}
        </span>
        <span className="text-sm truncate">{title}</span>
      </div>
      
      {isOpen && (
        <div className="ml-6 mt-1">
          <ProjectSubItem icon={FileText} text="Issues" />
          <ProjectSubItem icon={Component} text="Components" />
          <ProjectSubItem icon={Milestone} text="Milestones" />
          <ProjectSubItem icon={FileText} text="Templates" />
        </div>
      )}
    </div>
  );
};

const ProjectSubItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => {
  return (
    <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100 text-gray-700 cursor-pointer">
      <Icon className="h-4 w-4 mr-2" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

const SidebarSeparator = () => (
  <div className="h-px bg-gray-200 my-2 mx-2" />
);

export default AppSidebar;
