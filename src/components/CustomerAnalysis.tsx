import { useState, useEffect } from "react";
import {
  X,
  Brain,
  AlertTriangle,
  Package,
  CheckCircle,
  ArrowRight,
  Send,
  Zap,
  Rocket,
} from "lucide-react";
import type { Customer } from "../App";

interface CustomerAnalysisProps {
  customer: Customer;
  onClose: () => void;
}

interface PainPoint {
  evidence: string;
}

interface ProductSuggestion {
  product: "verifai" | "clickthrough" | "workflow_manager";
  confidence: number;
  reasoning: string;
  features: string[];
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
  const [userInput, setUserInput] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    setSelectedProducts(productSuggestions.map((product) => product.product));
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
          return prev + 0.5;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [currentStep, customer]);

  const handleUserInputSubmit = () => {
    if (!userInput.trim()) return;

    // Process natural language input to modify configuration
    const input = userInput.toLowerCase();

    if (input.includes("disable") || input.includes("remove")) {
      // Logic to disable features based on input
    } else if (input.includes("add") || input.includes("enable")) {
      // Logic to enable additional features
    }

    setUserInput("");
    setCurrentStep("preview");
  };

  const handleLaunchDemo = () => {
    // Replace this URL with the actual demo workspace URL
    const demoUrl = "https://app.qa.dev.spotdraft.com";

    try {
      // Open the demo URL in a new tab
      const newWindow = window.open(demoUrl, "_blank", "noopener,noreferrer");

      // Check if the window was blocked by popup blocker
      if (!newWindow) {
        alert(
          "Please allow popups for this site to launch the demo workspace."
        );
      }
    } catch (error) {
      console.error("Failed to launch demo workspace:", error);
      alert("Failed to launch demo workspace. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden h-full w-full">
      <div className="bg-white w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 h-[100px]">
          <div className="flex items-center space-x-4">
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
                    ${
                      isActive
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
                    className={`ml-2 text-sm font-medium ${
                      isActive
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
        <div className="flex justify-center items-center overflow-y-auto p-6 h-[calc(100vh-100px)]">
          {currentStep === "analyzing" && (
            <div className="text-center">
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

              <div className="max-w-md mx-auto">
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
            <div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Call Summary
                </h3>
                <div className="flex items-center space-x-2 text-sm opacity-80 italic p-2 bg-slate-50 rounded-lg border border-slate-200">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
                  qui ad amet doloribus fugiat dolorum doloremque enim iste
                  magnam corporis ipsam at, eaque quas iusto? Nulla saepe quidem
                  porro delectus eaque assumenda sunt, inventore facere cum esse
                  dolorum perspiciatis aperiam iste exercitationem beatae ea
                  nobis magni pariatur praesentium odit ipsum tempore ad ab.
                  Autem, maxime assumenda sapiente aliquam esse omnis voluptates
                  odio cum quia!
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  Identified Pain Points
                </h3>
                <div className="space-y-4 mb-8">
                  {painPoints.map((pain, index) => (
                    <div key={index} className={`p-4 rounded-lg border`}>
                      <p className="text-sm opacity-80 italic">
                        "{pain.evidence}"
                      </p>
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
            </div>
          )}

          {currentStep === "products" && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Recommended Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {productSuggestions.map((product, index) => (
                  <div
                    key={index}
                    className="p-6 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-900 capitalize">
                        {product.product}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-slate-700">
                          {product.confidence}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {product.reasoning}
                    </p>
                    <div className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-slate-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">
                  Select Products for Demo Configuration
                </h4>
                <div className="flex flex-wrap gap-2">
                  {productSuggestions.map((product) => (
                    <label
                      key={product.product}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.product)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([
                              ...selectedProducts,
                              product.product,
                            ]);
                          } else {
                            setSelectedProducts(
                              selectedProducts.filter(
                                (p) => p !== product.product
                              )
                            );
                          }
                        }}
                        className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-blue-800 capitalize">
                        {product.product}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCurrentStep("review")}
                  disabled={selectedProducts.length === 0}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

              {selectedProducts.includes("clm") && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-slate-900 mb-4">
                    CLM Configuration
                  </h4>
                  <div className="space-y-6">
                    {clmFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="font-medium text-slate-900">
                              {feature.name}
                            </h5>
                            <p className="text-sm text-slate-600">
                              {feature.description}
                            </p>
                          </div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={feature.enabled}
                              onChange={(e) => {
                                setCLMFeatures((features) =>
                                  features.map((f) =>
                                    f.id === feature.id
                                      ? { ...f, enabled: e.target.checked }
                                      : f
                                  )
                                );
                              }}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                          </label>
                        </div>

                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded mb-3">
                          <strong>Evidence:</strong> {feature.evidence}
                        </div>

                        {feature.subFeatures && (
                          <div className="ml-4 space-y-2">
                            {feature.subFeatures.map((subFeature) => (
                              <div
                                key={subFeature.id}
                                className="flex items-center justify-between"
                              >
                                <div>
                                  <span className="text-sm font-medium text-slate-700">
                                    {subFeature.name}
                                  </span>
                                  <p className="text-xs text-slate-500">
                                    {subFeature.description}
                                  </p>
                                </div>
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={
                                      subFeature.enabled && feature.enabled
                                    }
                                    disabled={!feature.enabled}
                                    onChange={(e) => {
                                      setCLMFeatures((features) =>
                                        features.map((f) =>
                                          f.id === feature.id
                                            ? {
                                                ...f,
                                                subFeatures: f.subFeatures?.map(
                                                  (sf) =>
                                                    sf.id === subFeature.id
                                                      ? {
                                                          ...sf,
                                                          enabled:
                                                            e.target.checked,
                                                        }
                                                      : sf
                                                ),
                                              }
                                            : f
                                        )
                                      );
                                    }}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProducts.includes("clickthrough") && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-lg font-medium text-green-900 mb-2">
                    Clickthrough Demo
                  </h4>
                  <p className="text-green-800 mb-4">
                    I can create a personalized webpage for you to demo where I
                    will embed the Clickthrough SDK. This will allow you to
                    create interactive product tours for your stakeholders.
                  </p>
                  <button className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Enable Clickthrough Demo
                  </button>
                </div>
              )}

              {selectedProducts.includes("verifai") && (
                <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="text-lg font-medium text-purple-900 mb-2">
                    Verifai Playbooks
                  </h4>
                  <p className="text-purple-800 mb-4">
                    Based on the call, I'll prepare implementation playbooks and
                    best practice guides specifically for their industry and use
                    case.
                  </p>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Generate Playbooks
                  </button>
                </div>
              )}

              {/* Natural Language Input */}
              <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">
                  Additional Customization
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Tell me in natural language if you'd like to modify any
                  configurations or add specific features:
                </p>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., 'Add compliance tracking for healthcare' or 'Focus on enterprise features'"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUserInputSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCurrentStep("preview")}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Generate Demo Preview
                </button>
              </div>
            </div>
          )}

          {currentStep === "preview" && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Demo Preview Ready
              </h3>
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
                <div className="flex justify-end">
                  <button
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleLaunchDemo}
                  >
                    Launch Demo Workspace
                  </button>
                </div>
              </div>
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

  if (verify_ai.value) {
    suggestions.push({
      product: "verifai",
      confidence: 95,
      reasoning: verify_ai.reason,
      features: [
        "Guidebooks",
        "Playbooks",
        "Deviation Detection",
        "Contract Verification",
        "AskAI",
      ],
    });
  }

  if (tpp_workflow.value) {
    suggestions.push({
      product: "workflow_manager",
      confidence: 95,
      reasoning: tpp_workflow.reason,
      features: ["Third Party Paper Workflow", "Approval Workflows"],
    });
  }

  if (template_workflow.value) {
    if (
      !suggestions.some(
        (suggestion) => suggestion.product === "workflow_manager"
      )
    ) {
      suggestions.push({
        product: "workflow_manager",
        confidence: 95,
        reasoning: template_workflow.reason,
        features: ["Template Workflow", "Approval Workflows"],
      });
    } else {
      suggestions
        .find((suggestion) => suggestion.product === "workflow_manager")
        ?.features.push("Template Workflow");
    }
  }

  if (clickwrap.value) {
    suggestions.push({
      product: "clickthrough",
      confidence: 95,
      reasoning: clickwrap.reason,
      features: ["Legal Hub", "Clickthrough Packets", "Clickthrough Manager"],
    });
  }

  return suggestions;
};
