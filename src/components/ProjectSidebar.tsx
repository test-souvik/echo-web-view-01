
import { Folder, Tag, Component, Milestone, FileText, ChevronDown, CircleCheck, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectSidebar = () => {
  return (
    <aside className="hidden sm:block w-64 border-r bg-white overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className="h-9 w-9 rounded bg-orange-500 flex items-center justify-center text-white font-bold">
            T
          </div>
          <h2 className="text-lg font-semibold ml-2">Tracker</h2>
        </div>
        
        {/* New Issue Button */}
        <div className="mb-4">
          <Button className="bg-huly-blue hover:bg-blue-600 w-full justify-start" size="sm">
            <Plus className="h-4 w-4 mr-2" /> New issue
          </Button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="space-y-1">
          <SidebarButton icon={CircleCheck} text="My issues" />
          <SidebarButton icon={CircleHelp} text="All issues" active />
        </nav>
        
        <div className="mt-4 border-t pt-4">
          <SidebarButton icon={Folder} text="All projects" />
          <SidebarButton icon={Tag} text="Labels" />
        </div>
        
        {/* Projects Section */}
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2 px-1">
            <span>YOUR PROJECTS</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          
          <div className="mb-3">
            <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
              <span className="h-4 w-4 rounded bg-yellow-200 mr-2">🎮</span>
              <span className="text-sm">GAME DESIGN (EXAMPLE)</span>
            </div>
            
            <div className="ml-6 mt-1">
              <SidebarLink icon={FileText} text="Issues" />
              <SidebarLink icon={Component} text="Components" />
              <SidebarLink icon={Milestone} text="Milestones" />
              <SidebarLink icon={FileText} text="Templates" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
              <span className="h-4 w-4 rounded bg-yellow-200 mr-2">👋</span>
              <span className="text-sm">WELCOME TO HULY!</span>
            </div>
            
            <div className="ml-6 mt-1">
              <SidebarLink icon={FileText} text="Issues" />
              <SidebarLink icon={Component} text="Components" />
              <SidebarLink icon={Milestone} text="Milestones" />
              <SidebarLink icon={FileText} text="Templates" />
            </div>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100 text-gray-600">
            <CircleHelp className="h-4 w-4 mr-2" />
            <span className="text-sm">Help & Support</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Helper components
const SidebarButton = ({ icon: Icon, text, active = false }) => {
  return (
    <button
      className={`flex items-center w-full py-1.5 px-2 rounded ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <Icon className="h-4 w-4 mr-2" />
      <span className="text-sm">{text}</span>
    </button>
  );
};

const SidebarLink = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100 text-gray-700">
      <Icon className="h-4 w-4 mr-2" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

const Plus = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export default ProjectSidebar;
