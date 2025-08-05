import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface DemoWorkspaceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}

export function DemoWorkspace({ config }: DemoWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const contracts = [
    {
      id: 1,
      title: "Software License Agreement - Microsoft",
      status: "pending_review",
      value: "$125,000",
      deadline: "2024-01-15",
      assignee: "Legal Team",
      stage: "Legal Review",
    },
    {
      id: 2,
      title: "Partnership Agreement - AWS",
      status: "in_negotiation",
      value: "$450,000",
      deadline: "2024-01-20",
      assignee: "John Smith",
      stage: "Negotiation",
    },
    {
      id: 3,
      title: "Vendor Contract - Office Supplies Inc",
      status: "ready_to_sign",
      value: "$25,000",
      deadline: "2024-01-10",
      assignee: "Procurement Team",
      stage: "Signature Pending",
    },
    {
      id: 4,
      title: "SaaS Agreement - Salesforce",
      status: "completed",
      value: "$85,000",
      deadline: "2023-12-20",
      assignee: "IT Department",
      stage: "Completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review":
        return "bg-yellow-100 text-yellow-800";
      case "in_negotiation":
        return "bg-blue-100 text-blue-800";
      case "ready_to_sign":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_review":
        return <Clock className="w-4 h-4" />;
      case "in_negotiation":
        return <AlertCircle className="w-4 h-4" />;
      case "ready_to_sign":
        return <FileText className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", count: null },
    { id: "contracts", label: "Contracts", count: config?.contracts || 47 },
    { id: "templates", label: "Templates", count: 12 },
    { id: "workflows", label: "Workflows", count: 5 },
    { id: "team", label: "Team", count: config?.users || 12 },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {config?.companyName || "TechCorp"} Demo Environment
            </h1>
            <p className="text-slate-500 mt-1">
              {config?.industry || "Technology"} •{" "}
              {config?.companySize || "500"} employees
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Contract</span>
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-700">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 pb-3 border-b-2 transition-colors
                ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }
              `}
            >
              <span className="font-medium">{tab.label}</span>
              {tab.count && (
                <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "dashboard" && (
          <div className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Active Contracts
                    </p>
                    <p className="text-2xl font-bold text-slate-900">34</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    +12%
                  </span>
                  <span className="text-slate-500 text-sm ml-2">
                    from last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Pending Review
                    </p>
                    <p className="text-2xl font-bold text-slate-900">8</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-red-600 text-sm font-medium">+3</span>
                  <span className="text-slate-500 text-sm ml-2">
                    needs attention
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Contract Value
                    </p>
                    <p className="text-2xl font-bold text-slate-900">$2.4M</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    +18%
                  </span>
                  <span className="text-slate-500 text-sm ml-2">
                    this quarter
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Team Members
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {config?.users || 12}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">+2</span>
                  <span className="text-slate-500 text-sm ml-2">
                    new this month
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Contracts */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Contracts
                </h2>
              </div>
              <div className="divide-y divide-slate-200">
                {contracts.slice(0, 3).map((contract) => (
                  <div
                    key={contract.id}
                    className="p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">
                          {contract.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              contract.status
                            )}`}
                          >
                            {getStatusIcon(contract.status)}
                            <span>{contract.stage}</span>
                          </span>
                          <span className="text-sm text-slate-500">
                            Due: {contract.deadline}
                          </span>
                          <span className="text-sm text-slate-500">
                            Assigned: {contract.assignee}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {contract.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "contracts" && (
          <div className="p-8">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            {/* Contracts List */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="divide-y divide-slate-200">
                {contracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 mb-2">
                          {contract.title}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              contract.status
                            )}`}
                          >
                            {getStatusIcon(contract.status)}
                            <span>{contract.stage}</span>
                          </span>
                          <span className="text-sm text-slate-500">
                            Due: {contract.deadline}
                          </span>
                          <span className="text-sm text-slate-500">
                            Assigned: {contract.assignee}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900 mb-2">
                          {contract.value}
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
