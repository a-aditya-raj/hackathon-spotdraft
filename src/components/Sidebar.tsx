import { Users, Brain, Sparkles, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/auth.context";

export type ViewType = "demo_setup" | "insights" | "customers";

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user, logout, isLoading } = useAuth();

  const menuItems = [
    { id: "demo_setup" as ViewType, label: "Demo Setup", icon: Sparkles },
    { id: "insights" as ViewType, label: "Insights", icon: Brain },
    { id: "customers" as ViewType, label: "Customers", icon: Users },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 h-[100px] flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <img
              src={logo}
              alt="Echo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm text-slate-800">Sales Assistant</p>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col justify-between">
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-blue-600" : "text-slate-400"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600">
                  {user ? getUserInitials(user.name) : "U"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
