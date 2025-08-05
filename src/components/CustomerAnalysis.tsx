import { useState, useEffect } from "react";
import {
  X,
  Brain,
  AlertTriangle,
  Package,
  CheckCircle,
  ArrowRight,
  Zap,
  Rocket,
  Trash,
  Info,
  Loader2,
} from "lucide-react";
import type { Customer } from "../App";
import { FEATURES } from "../constants/features";
import { CLICKTHROUGH_URL, createWorkspace, WORKSPACE_URL } from "../services/api";
import { ContractGuidebookOverlay } from "./ContractGuidebookOverlay";

interface CustomerAnalysisProps {
  customer: Customer;
  onClose: () => void;
}

interface PainPoint {
  evidence: string;
}

interface ProductSuggestion {
  product: "verifai" | "clickthrough" | "workflow_manager";
  product_name: string;
  confidence: number;
  reasoning: string;
  features: string[];
  enabled: boolean;
}

interface CLMFeature {
  id: string;
  name: string;
  description: string;
  evidence: string;
  enabled: boolean;
  subFeatures?: {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
  }[];
}

const steps = [
  { id: "analyzing", label: "Analyzing", icon: Brain, order: 1 },
  {
    id: "painpoints",
    label: "Summary & Pain Points",
    icon: AlertTriangle,
    order: 2,
  },
  {
    id: "products",
    label: "Products & Features",
    icon: Package,
    order: 3,
  },
  {
    id: "review",
    label: "Review & Customize",
    icon: CheckCircle,
    order: 4,
  },
  {
    id: "preview",
    label: "Preview & Launch",
    icon: Rocket,
    order: 5,
  },
];

export function CustomerAnalysis({ customer, onClose }: CustomerAnalysisProps) {
  const [currentStep, setCurrentStep] = useState<
    "analyzing" | "painpoints" | "products" | "review" | "preview"
  >("analyzing");
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<
    ProductSuggestion[]
  >([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [clmFeatures, setCLMFeatures] = useState<CLMFeature[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showAddPainPointInput, setShowAddPainPointInput] =
    useState<boolean>(false);
  const [painPointInput, setPainPointInput] = useState<string>("");
  const [creatingWorkspace, setCreatingWorkspace] = useState<boolean>(false);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [userInputError, setUserInputError] = useState<string>("");
  const [clickthroughUrl, setClickthroughUrl] = useState<string | null>(null);
  const [showPlaybooks, setShowPlaybooks] = useState<boolean>(false);
  const createWorkspaceConfig = {
    company_name: customer.company_name,
    company_email_domains: customer.mail_domain
      ? [customer.mail_domain]
      : ["yopmail.com"],
    invited_users: invitedUsers,
    feature_list: selectedProducts,
    demo_access_end_date: new Date(
      new Date().setDate(new Date().getDate() + 30)
    )
      .toISOString()
      .split("T")[0],
    create_dummy_data: true,
  };

  useEffect(() => {
    setSelectedProducts(
      productSuggestions
        .filter((product) => product.enabled)
        .map((product) => product.product)
    );
    setCLMFeatures(
      productSuggestions
        .filter((product) => product.enabled)
        .map((product) =>
          product.features.map((feature) => ({
            id: feature,
            name: feature,
            description: feature,
            enabled: true,
            evidence: product.reasoning,
          }))
        )
        .flat()
    );
  }, [productSuggestions]);

  // Simulate AI analysis
  useEffect(() => {
    const analyzeTranscript = () => {
      // Extract pain points
      const extractedPainPoints: PainPoint[] = [];
      customer.pain_points.forEach((painPoint) => {
        extractedPainPoints.push({
          evidence: painPoint,
        });
      });

      // Product suggestions
      const suggestions: ProductSuggestion[] = getSuggestedProducts(customer);

      setPainPoints(extractedPainPoints);
      setProductSuggestions(suggestions);
      setCLMFeatures(
        suggestions
          .map((suggestion) => {
            const features = suggestion.features.map((feature) => ({
              id: feature,
              name: feature,
              description: feature,
              enabled: true,
              evidence: suggestion.reasoning,
            }));
            return features;
          })
          .flat()
      );
    };
    if (currentStep === "analyzing") {
      const timer = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              // Analyze transcript and extract insights
              analyzeTranscript();
              setCurrentStep("painpoints");
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [currentStep, customer]);

  const handleAddInviteUser = (email: string) => {
    const trimmedEmails = email.trim().split(",");

    // Clear previous error
    setUserInputError("");

    if (!trimmedEmails.length) {
      setUserInputError("Please enter an email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    trimmedEmails.forEach((email) => {
      if (!emailRegex.test(email.trim())) {
        setUserInputError("Please enter a valid email address");
        return;
      }
    });

    // Check for duplicates
    trimmedEmails.forEach((email) => {
      if (invitedUsers.includes(email)) {
        setUserInputError("This email has already been added");
        return;
      }
    });

    // Add user successfully
    setInvitedUsers([...trimmedEmails]);
  };

  const handleRemoveInviteUser = (email: string) => {
    setInvitedUsers((prev) => prev.filter((user) => user !== email));
  };

  const handleCreateDemoWorkspace = async () => {
    // TODO: Create demo workspace api call on success, redirect to the demo workspace
    setCreatingWorkspace(true);
    try {
      createWorkspaceConfig.company_name = customer.company_name;
      createWorkspaceConfig.company_email_domains = customer.mail_domain
        ? [customer.mail_domain]
        : ["yopmail.com"];
      createWorkspaceConfig.invited_users = invitedUsers;
      createWorkspaceConfig.feature_list = selectedProducts;
      createWorkspaceConfig.demo_access_end_date = new Date(
        new Date().setDate(new Date().getDate() + 30)
      )
        .toISOString()
        .split("T")[0];
      createWorkspaceConfig.create_dummy_data = true;
      const response = await createWorkspace(createWorkspaceConfig);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setCreatingWorkspace(false);
    setCurrentStep("preview");
  };

  const handleLaunchDemo = () => {
    window.open(WORKSPACE_URL, "_blank");
  };

  const onShowAddPainPointInputClick = () => {
    setShowAddPainPointInput(true);
  };

  const onAddPainPointClick = () => {
    if (!painPointInput.trim()) return;
    setPainPoints([{ evidence: painPointInput }, ...painPoints]);
    setShowAddPainPointInput(false);
    setPainPointInput("");
  };

  if (creatingWorkspace) {
    return (
      <div className="flex items-center justify-center overflow-hidden h-full w-full">
        <div className="bg-white w-full h-full flex justify-center items-center">
          <div className="flex items-center justify-between p-6 h-[100px]">
            <div className="flex flex-col items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Creating Workspace...
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPlaybooks) {
    return <ContractGuidebookOverlay onClose={() => setShowPlaybooks(false)} />;
  }

  return (
    <div className="flex items-center justify-center overflow-hidden h-full w-full">
      <div className="bg-white w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 h-[100px]">
          <div className="flex items-center space-x-4">
            {customer.company_logo?.logo &&
              customer.company_logo?.type === "image" && (
                <img
                  src={customer.company_logo.logo}
                  alt={customer.company_name}
                  className="w-10 h-10 object-contain rounded-full"
                />
              )}
            {customer.company_logo?.logo &&
              customer.company_logo?.type === "svg" && (
                <div
                  className="rounded-full"
                  dangerouslySetInnerHTML={{
                    __html: customer.company_logo.logo,
                  }}
                />
              )}
            <h2 className="text-xl font-semibold text-slate-900">
              {customer.company_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex justify-center items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted =
                step.order <
                (steps.find((s) => s.id === currentStep)?.order ?? 0);

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isActive
                        ? "bg-blue-600 text-white"
                        : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }
                  `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${isActive
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-green-600"
                          : "text-slate-500"
                      }`}
                  >
                    {step.label}
                  </span>
                  {index < 4 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 h-[calc(100vh-200px)]">
          {currentStep === "analyzing" && (
            <div className="text-center flex flex-col items-center justify-center h-full w-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Analyzing Call Transcript
              </h3>
              <p className="text-slate-600 mb-8">
                Processing conversation to identify pain points and
                opportunities...
              </p>

              <div className="w-full max-w-md">
                <div className="bg-slate-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-500">
                  {analysisProgress}% complete
                </p>
              </div>
            </div>
          )}

          {currentStep === "painpoints" && (
            <>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Call Summary
                </h3>
                <div className="flex items-center space-x-2 text-sm opacity-80 italic p-2 bg-slate-50 rounded-lg border border-slate-200">
                  {customer.summary}
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    Identified Pain Points
                  </h3>
                  {!showAddPainPointInput && (
                    <button
                      className="px-4 py-1 text-sm bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      onClick={onShowAddPainPointInputClick}
                    >
                      Add Pain Point
                    </button>
                  )}
                </div>
                <div className="space-y-4 mb-8">
                  {showAddPainPointInput && (
                    <div className="p-4 rounded-lg border flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Enter pain point"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={painPointInput}
                        onChange={(e) => setPainPointInput(e.target.value)}
                      />
                      <button
                        className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${!painPointInput.trim()
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                          }`}
                        onClick={onAddPainPointClick}
                        disabled={!painPointInput.trim()}
                      >
                        Add
                      </button>
                      <button
                        className={`px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors`}
                        onClick={() => {
                          setShowAddPainPointInput(false);
                          setPainPointInput("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {painPoints.map((pain, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border flex items-center justify-between`}
                    >
                      <p className="text-sm opacity-80 italic">
                        "{pain.evidence}"
                      </p>
                      <button
                        className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        onClick={() => {
                          setPainPoints(
                            painPoints.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep("products")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue to Product Recommendations
                </button>
              </div>
            </>
          )}

          {currentStep === "products" && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {selectedProducts.map((featureName: string, index: number) => (
                  <div
                    key={index}
                    className="p-6 bg-slate-50 rounded-xl border border-slate-200 h-[350px]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-900 capitalize">
                        <div className="flex items-center gap-2">
                          {FEATURES[featureName as keyof typeof FEATURES].name}
                          <div className="relative group">
                            <Info className="w-4 h-4 cursor-pointer" />
                            <div className="absolute left-1/2 -translate-x-1/4 mt-2 z-[51] hidden group-hover:block bg-slate-900 text-white text-xs text-light rounded px-2 py-1 w-64 shadow-lg">
                              <p className="text-sm font-medium text-slate-100">
                                What does it do?
                              </p>
                              <p className="text-xs text-slate-100">
                                {
                                  FEATURES[featureName as keyof typeof FEATURES]
                                    .description
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-slate-700">
                          {
                            productSuggestions.find(
                              (p) => p.product === featureName
                            )?.confidence
                          }
                          %
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Why?{" "}
                      {
                        productSuggestions.find(
                          (p) => p.product === featureName
                        )?.reasoning
                      }
                    </p>
                    <div className="space-y-2">
                      {productSuggestions
                        .find((p) => p.product === featureName)
                        ?.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
                {!selectedProducts.length && (
                  <div className="h-[350px] w-full flex items-center justify-center">
                    No products selected
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">
                  Select Products or Features for Demo Configuration
                </h4>
                <div className="flex flex-wrap gap-10">
                  {Object.keys(FEATURES).map((feature: string) => (
                    <label
                      key={feature}
                      className="flex items-center space-x-2  hover:cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-blue-300 h-[20px] w-[20px] text-blue-600 focus:ring-blue-500"
                        checked={selectedProducts.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, feature]);
                            setCLMFeatures(
                              clmFeatures.map((f) =>
                                f.id === feature ? { ...f, enabled: true } : f
                              )
                            );
                          } else {
                            setSelectedProducts(
                              selectedProducts.filter((p) => p !== feature)
                            );
                            setCLMFeatures(
                              clmFeatures.map((f) =>
                                f.id === feature ? { ...f, enabled: false } : f
                              )
                            );
                          }
                        }}
                      />
                      <span className="text-md font-medium text-slate-800 capitalize">
                        {FEATURES[feature as keyof typeof FEATURES].name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCurrentStep("review")}
                  disabled={selectedProducts.length === 0}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Configuration
                </button>
              </div>
            </div>
          )}

          {currentStep === "review" && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Review Configuration
              </h3>

              <div className="grid grid-cols-1 gap-6 mb-4">
                <form className="bg-white p-6 rounded-lg shadow mb-6 space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="organisationName"
                    >
                      Company Name
                    </label>
                    <input
                      id="organisationName"
                      type="text"
                      value={createWorkspaceConfig?.company_name}
                      onChange={(e) => {
                        createWorkspaceConfig.company_name = e.target.value;
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="mailDomain"
                    >
                      Email Domain
                    </label>
                    <input
                      id="mailDomain"
                      type="text"
                      value={createWorkspaceConfig?.company_email_domains?.join(
                        ", "
                      )}
                      onChange={(e) => {
                        createWorkspaceConfig.company_email_domains =
                          e.target.value.split(", ");
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="validTill"
                    >
                      Trial Workspace Valid Till
                    </label>
                    <input
                      id="validTill"
                      type="date"
                      value={(() => {
                        const date = new Date();
                        date.setDate(date.getDate() + 30);
                        return date.toISOString().split("T")[0];
                      })()}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Selected Features
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {Object.keys(FEATURES).map((feature) => (
                        <label
                          key={feature}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProducts([
                                  ...selectedProducts,
                                  feature,
                                ]);
                                setCLMFeatures(
                                  clmFeatures.map((f) =>
                                    f.id === feature
                                      ? { ...f, enabled: true }
                                      : f
                                  )
                                );
                              } else {
                                setSelectedProducts(
                                  selectedProducts.filter((p) => p !== feature)
                                );
                                setCLMFeatures(
                                  clmFeatures.map((f) =>
                                    f.id === feature
                                      ? { ...f, enabled: false }
                                      : f
                                  )
                                );
                              }
                            }}
                            className="rounded border-blue-300 h-[20px] w-[20px] text-blue-600"
                          />
                          <span className="text-md text-slate-800 capitalize">
                            {FEATURES[feature as keyof typeof FEATURES].name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="invitedUsers"
                    >
                      Invite Users
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        id="invitedUsers"
                        type="text"
                        placeholder="Enter comma separated email addresses"
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            handleAddInviteUser(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                        className={`flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${userInputError
                            ? "border-red-300 focus:ring-red-500 bg-red-50"
                            : "border-slate-300 focus:ring-blue-500 bg-slate-100"
                          }`}
                      />
                    </div>
                    {userInputError && (
                      <p className="text-sm text-red-600 mb-2">
                        {userInputError}
                      </p>
                    )}
                    <p className="text-xs text-slate-500 mb-3">
                      Press Enter to invite users
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {invitedUsers.map((user, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-slate-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full"
                        >
                          <span>{user}</span>
                          <button
                            onClick={() => handleRemoveInviteUser(user)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label={`Remove ${user}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCreateDemoWorkspace}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Demo Workspace
                </button>
              </div>
            </div>
          )}

          {currentStep === "preview" && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Demo Preview Ready
              </h3>
              {clickthroughUrl && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <iframe
                    src={clickthroughUrl}
                    className="w-full h-[500px] border-0"
                  />
                  <div className="flex justify-end">
                    <button
                      className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => {
                        setClickthroughUrl(null);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {!clickthroughUrl && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">
                        Demo Configuration Complete
                      </h4>
                      <p className="text-green-700">
                        Your personalized demo workspace is ready for{" "}
                        {customer.company_name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">
                        Configured Products
                      </h5>
                      <ul className="space-y-1">
                        {selectedProducts.map((product) => (
                          <li
                            key={product}
                            className="text-sm text-slate-600 capitalize"
                          >
                            • {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">
                        Key Features
                      </h5>
                      <ul className="space-y-1">
                        {clmFeatures
                          .filter((f) => f.enabled)
                          .map((feature) => (
                            <li
                              key={feature.id}
                              className="text-sm text-slate-600"
                            >
                              • {feature.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {selectedProducts.includes("clickthrough") && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="text-lg font-medium text-green-900 mb-2">
                        Clickthrough Demo
                      </h4>
                      <p className="text-green-800 mb-4">
                        I have created a personalized webpage for you to demo
                        where I have embedded the Clickthrough SDK. This allows
                        you to create interactive product tours for your
                        stakeholders.
                      </p>
                      <button
                        className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        onClick={() => {
                          setClickthroughUrl(CLICKTHROUGH_URL);
                        }}
                      >
                        View Clickthrough Demo
                      </button>
                    </div>
                  )}

                  {selectedProducts.includes("verifai") && (
                    <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="text-lg font-medium text-purple-900 mb-2">
                        Verifai Playbooks
                      </h4>
                      <p className="text-purple-800 mb-4">
                        Based on the call, I have prepared implementation
                        playbooks and best practice guides specifically for your
                        industry and use case.
                      </p>
                      <button
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        onClick={() => {
                          setShowPlaybooks(true);
                        }}
                      >
                        Generate Guides
                      </button>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={handleLaunchDemo}
                    >
                      Launch Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const getSuggestedProducts = (customer: Customer) => {
  const suggestions: ProductSuggestion[] = [];
  const { verify_ai, tpp_workflow, template_workflow, clickwrap } =
    customer.features;

  const tpp_features = [
    "Third Party Paper Workflow",
    "Approval Workflows",
    "Intake Forms",
    "Entity Management",
    "Branding",
  ];

  const template_features = [
    "Template Workflow",
    "Approval Workflows",
    "Entity Management",
    "Branding",
  ];

  suggestions.push({
    product: "verifai",
    enabled: verify_ai.value,
    product_name: "VerifAI",
    confidence: 97,
    reasoning: verify_ai.reason,
    features: ["VerifAI", "AskAI", "Smart Data Capture"],
  });

  suggestions.push({
    product: "workflow_manager",
    enabled: tpp_workflow.value || template_workflow.value,
    product_name: "Workflow Manager",
    confidence: 95,
    reasoning: tpp_workflow.reason,
    features: [
      ...(tpp_workflow.value ? tpp_features : []),
      ...(template_workflow.value ? template_features : []),
    ],
  });

  suggestions.push({
    product: "clickthrough",
    enabled: clickwrap.value,
    product_name: "Clickthrough",
    confidence: 98,
    reasoning: clickwrap.reason,
    features: ["Legal Hub", "Clickthrough Packets", "Clickthrough Manager"],
  });

  return suggestions;
};
