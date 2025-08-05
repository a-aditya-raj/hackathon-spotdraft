import { useState } from "react";
import {
  TrendingUp,
  Eye,
  MousePointer,
  Clock,
  Activity,
  BookOpen,
} from "lucide-react";
import { ContractGuidebookOverlay } from "./ContractGuidebookOverlay";

export function InsightsDashboard() {
  const [selectedProspect, setSelectedProspect] = useState("paySprint");
  const [showGuidebook, setShowGuidebook] = useState(false);

  const prospects = [
    {
      id: "paySprint",
      name: "PaySprint",
      status: "active",
      lastSession: "2h ago",
    },
    {
      id: "healthPlus",
      name: "HealthPlus",
      status: "completed",
      lastSession: "1d ago",
    },
    {
      id: "globalmanuf",
      name: "Global Manufacturing",
      status: "scheduled",
      lastSession: "Upcoming",
    },
  ];

  const insights = {
    paySprint: {
      sessionDuration: "24 minutes",
      featuresViewed: 8,
      contractsExplored: 5,
      timeSpent: {
        "Contract Creation": 8,
        "Workflow Setup": 6,
        "Team Management": 4,
        Analytics: 3,
        Templates: 3,
      },
      engagementScore: 85,
      painPoints: [
        "Spent extra time in approval workflows - indicates complex approval process",
        "Multiple revisits to contract templates - suggests template customization needs",
        "Limited time in reporting section - may need more guidance on analytics value",
      ],
      recommendations: [
        "Focus follow-up on workflow customization capabilities",
        "Prepare template customization demo for next meeting",
        "Emphasize ROI metrics and reporting benefits",
      ],
      heatmap: [
        {
          feature: "Dashboard",
          views: 12,
          avgTime: "2m 30s",
          interest: "high",
        },
        {
          feature: "Contract Creation",
          views: 8,
          avgTime: "4m 15s",
          interest: "very-high",
        },
        { feature: "Workflows", views: 6, avgTime: "3m 45s", interest: "high" },
        {
          feature: "Templates",
          views: 5,
          avgTime: "2m 10s",
          interest: "medium",
        },
        { feature: "Analytics", views: 2, avgTime: "1m 20s", interest: "low" },
      ],
    },
  };

  const currentInsights = insights[selectedProspect as keyof typeof insights];

  return (
    <div className="h-full overflow-hidden bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 h-[100px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Demo Insights</h1>
            <p className="text-slate-500 mt-1">
              Track prospect engagement and optimize your sales approach
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowGuidebook(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Generate Guidebooks</span>
            </button>
            <select
              value={selectedProspect}
              onChange={(e) => setSelectedProspect(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {prospects.map((prospect) => (
                <option key={prospect.id} value={prospect.id}>
                  {prospect.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-8 overflow-y-auto h-[calc(100dvh-100px)]">
        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Session Duration
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {currentInsights?.sessionDuration}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 text-sm font-medium ml-1">
                +45%
              </span>
              <span className="text-slate-500 text-sm ml-2">vs avg</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Features Explored
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {currentInsights?.featuresViewed}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 text-sm font-medium ml-1">
                High
              </span>
              <span className="text-slate-500 text-sm ml-2">engagement</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Engagement Score
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {currentInsights?.engagementScore}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 text-sm font-medium ml-1">
                Excellent
              </span>
              <span className="text-slate-500 text-sm ml-2">
                interest level
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Contracts Viewed
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {currentInsights?.contractsExplored}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-blue-600 text-sm font-medium">
                Deep dive
              </span>
              <span className="text-slate-500 text-sm ml-2">exploration</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Feature Heatmap */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Feature Engagement Heatmap
            </h3>
            <div className="space-y-4">
              {currentInsights?.heatmap.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">
                        {item.feature}
                      </span>
                      <span className="text-sm text-slate-500">
                        {item.avgTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.interest === "very-high"
                              ? "bg-red-500"
                              : item.interest === "high"
                              ? "bg-orange-500"
                              : item.interest === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${(item.views / 12) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-500">
                        {item.views} views
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Time Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(currentInsights?.timeSpent || {}).map(
                ([feature, minutes]) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between"
                  >
                    <span className="text-slate-700">{feature}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(minutes / 8) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-500 w-12">
                        {minutes}m
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Key Pain Points Identified
            </h3>
            <div className="space-y-3">
              {currentInsights?.painPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-red-800">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              AI Recommendations
            </h3>
            <div className="space-y-3">
              {currentInsights?.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-green-800">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contract Guidebook Overlay */}
      {showGuidebook && (
        <ContractGuidebookOverlay onClose={() => setShowGuidebook(false)} />
      )}
    </div>
  );
}
