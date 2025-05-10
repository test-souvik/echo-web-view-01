
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IssueCard from "./IssueCard";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Search,
  Filter,
  List,
  Grid2x2,
  SortDesc,
  Plus,
  Menu
} from "lucide-react";

// Sample data
const issues = [
  {
    id: "HULY-4",
    title: "Schedule your first Action Item",
    status: "backlog",
    component: null,
    hours: "0h",
    comments: 2,
    assignee: "T1",
    emoji: "📅"
  },
  {
    id: "HULY-1",
    title: "Welcome to Huly!",
    status: "todo",
    component: null,
    hours: "0h",
    comments: 1,
    assignee: "T1",
    emoji: "👋"
  },
  {
    id: "HULY-3",
    title: "Assign yourself an issue",
    status: "backlog",
    component: null,
    hours: "0h",
    comments: 2,
    assignee: "T1",
    emoji: "✏️"
  },
  {
    id: "HULY-2",
    title: "Check out your first project",
    status: "backlog",
    component: null,
    hours: "0h",
    comments: 2,
    assignee: "T1",
    emoji: "🚀"
  },
  {
    id: "HULY-5",
    title: "Explore Cards",
    status: "backlog",
    component: null,
    hours: "0h",
    comments: 0,
    assignee: "T1",
    emoji: "📦"
  }
];

const ProjectTracker = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter issues by status
  const filteredIssues = issues.filter(issue => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return issue.status === "todo";
    if (activeTab === "backlog") return issue.status === "backlog";
    return true;
  });

  // Count issues by status
  const backlogCount = issues.filter(issue => issue.status === "backlog").length;
  const todoCount = issues.filter(issue => issue.status === "todo").length;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-semibold">Tracker</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button className="bg-white text-gray-600 hover:bg-gray-50" variant="ghost" size="icon">
                  <List className="h-5 w-5" />
                </Button>
                <Button className="bg-white text-gray-600 hover:bg-gray-50" variant="ghost" size="icon">
                  <Grid2x2 className="h-5 w-5" />
                </Button>
                <Button className="bg-white text-gray-600 hover:bg-gray-50" variant="ghost" size="icon">
                  <SortDesc className="h-5 w-5" />
                </Button>
                <Button className="text-gray-600" variant="outline">
                  All issues
                </Button>
              </div>
            </div>
          </header>

          {/* Toolbar */}
          <div className="bg-white border-b px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex flex-wrap gap-2">
              <Button className="bg-huly-blue hover:bg-blue-600 flex items-center gap-2" size="sm">
                <Plus className="h-4 w-4" /> 
                New issue
              </Button>
              <div className="flex flex-wrap">
                <Button className="flex items-center gap-1 rounded-r-none" variant="outline" size="sm">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search issues..." 
                    className="h-9 w-full sm:w-60 rounded-l-none border-l-0 px-3" 
                  />
                  <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="backlog">Backlog</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main content */}
          <div className="bg-[#F8F9FA] p-4 md:p-6 flex-1 overflow-y-auto">
            {/* Status sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Backlog Section */}
              <div>
                <div className="bg-gray-100 rounded-md px-4 py-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border border-gray-400"></div>
                    <span className="font-medium">Backlog</span>
                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 text-xs">{backlogCount}</span>
                  </div>
                </div>
                
                {filteredIssues
                  .filter(issue => activeTab === "active" ? false : issue.status === "backlog")
                  .map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
              </div>
              
              {/* Todo Section */}
              <div>
                <div className="bg-gray-100 rounded-md px-4 py-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border border-gray-400"></div>
                    <span className="font-medium">Todo</span>
                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 text-xs">{todoCount}</span>
                  </div>
                </div>
                
                {filteredIssues
                  .filter(issue => activeTab === "backlog" ? false : issue.status === "todo")
                  .map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProjectTracker;
