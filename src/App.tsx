import { useState } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { CustomerOverlay } from "./components/CustomerOverlay";
import { Sidebar, ViewType } from "./components/Sidebar";
import { InsightsDashboard } from "./components/InsightsDashboard";
import { LoginForm } from "./components/loginForm";
import { AuthProvider, useAuth } from "./context/auth.context";

export interface Customer {
  company_name: string;
  company_url?: string;
  mail_domain?: string;
  pain_points: string[];
  features: {
    verify_ai: {
      value: boolean;
      reason: string;
    };
    tpp_workflow: {
      value: boolean;
      reason: string;
    };
    template_workflow: {
      value: boolean;
      reason: string;
    };
    clickwrap: {
      value: boolean;
      reason: string;
    };
    entity_management: {
      value: boolean;
      reason: string;
    };
    branding: {
      value: boolean;
      reason: string;
    };
  };
}

export interface AnalysisResult {
  customer: Customer;
  painPoints: Array<{
    point: string;
    evidence: string;
    severity: "high" | "medium" | "low";
  }>;
  featureNeeds: Array<{
    feature: string;
    reasoning: string;
    product: string;
    priority: "high" | "medium" | "low";
  }>;
  suggestedProducts: Array<{
    product: "verifai" | "clickthrough" | "clm";
    confidence: number;
    reasoning: string;
    features: string[];
  }>;
}

// Main App Content Component (authenticated users only)
function AppContent() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [currentView, setCurrentView] = useState<ViewType>("demo_setup");

  const handleCustomerSelect = (customer: Customer | null) => {
    setSelectedCustomer(customer);
    setCurrentView("demo_setup");
  };

  const handleViewMore = () => {
    setCurrentView("customers");
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-1/5 overflow-y-auto">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      </div>
      <div className="h-screen w-4/5 bg-white overflow-y-auto">
        {(() => {
          switch (currentView) {
            case "demo_setup":
              return (
                <ChatInterface
                  onViewMore={handleViewMore}
                  selectedCustomer={selectedCustomer}
                  handleCustomerSelect={handleCustomerSelect}
                />
              );
            case "insights":
              return <InsightsDashboard />;
            case "customers":
              return (
                <CustomerOverlay handleCustomerSelect={handleCustomerSelect} />
              );
          }
        })()}
      </div>
    </div>
  );
}

// Protected App Component
function ProtectedApp() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Welcome Back
          </h1>
          <LoginForm />
        </div>
      </div>
    );
  }

  // Show main app content if authenticated
  return <AppContent />;
}

// Root App Component with Auth Provider
function App() {
  return (
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  );
}

export default App;
