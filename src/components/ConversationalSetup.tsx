import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Building2,
  Users,
  FileText,
  Settings,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ConversationalSetupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfigComplete: (config: any) => void;
}

export function ConversationalSetup({
  onConfigComplete,
}: ConversationalSetupProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm here to help you set up the perfect demo for your prospect. Let's start by telling me about the company you're demoing to - what's their industry and size?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    const responses = {
      healthcare:
        "Perfect! Healthcare organizations have unique compliance needs. I'll configure the demo with HIPAA-compliant templates, medical device contracts, and vendor agreements. What's the company size? This will help me set up the right user roles and approval workflows.",
      technology:
        "Great choice! Tech companies often need software licensing, partnership agreements, and vendor contracts. I'll set up templates for SaaS agreements, development contracts, and IP licensing. How many employees does the company have?",
      manufacturing:
        "Excellent! Manufacturing companies typically need supplier agreements, quality contracts, and distribution deals. I'll prepare templates for procurement contracts, manufacturing agreements, and logistics partnerships. What's their approximate company size?",
      "500":
        "Perfect! For a mid-size company, I'll set up department-based approval workflows with 3-tier approvals. I'm configuring: Legal team review → Department head approval → C-level sign-off. Should I also add some sample contracts that are currently in progress?",
      yes: "Excellent! I'm now seeding the demo with realistic contracts including: 2 vendor agreements pending legal review, 1 partnership deal in negotiation, 3 supplier contracts ready for signature, and 1 recently completed SaaS agreement. This will show the full contract lifecycle. Ready to launch your personalized demo?",
      launch:
        "🎉 Demo environment ready! I've created a realistic workspace for TechCorp with 12 users, 47 contracts across different stages, and industry-specific templates. Click below to start your live demo!",
    };

    const lowerMessage = userMessage.toLowerCase();
    let response =
      "I understand. Let me help you configure that. What would you like to set up next?";

    if (
      lowerMessage.includes("healthcare") ||
      lowerMessage.includes("medical")
    ) {
      response = responses.healthcare;
    } else if (
      lowerMessage.includes("tech") ||
      lowerMessage.includes("software") ||
      lowerMessage.includes("saas")
    ) {
      response = responses.technology;
    } else if (
      lowerMessage.includes("manufacturing") ||
      lowerMessage.includes("supply")
    ) {
      response = responses.manufacturing;
    } else if (lowerMessage.includes("500") || lowerMessage.includes("mid")) {
      response = responses["500"];
    } else if (lowerMessage.includes("yes") || lowerMessage.includes("sure")) {
      response = responses.yes;
    } else if (
      lowerMessage.includes("launch") ||
      lowerMessage.includes("ready") ||
      lowerMessage.includes("start")
    ) {
      // Complete the setup
      setTimeout(() => {
        onConfigComplete({
          industry: "Technology",
          companySize: "500",
          companyName: "TechCorp",
          contracts: 47,
          users: 12,
          templates: ["SaaS Agreement", "Partnership Deal", "Vendor Contract"],
        });
      }, 2000);
      response = responses.launch;
    }

    return response;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: simulateResponse(input),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    {
      icon: Building2,
      label: "Healthcare Demo",
      action: "Set up for healthcare company with 200 employees",
    },
    {
      icon: Users,
      label: "Enterprise Setup",
      action: "Configure for enterprise with 1000+ employees",
    },
    {
      icon: FileText,
      label: "Standard Templates",
      action: "Use standard contract templates",
    },
    {
      icon: Settings,
      label: "Custom Workflow",
      action: "Create custom approval workflow",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Demo Setup Assistant
            </h1>
            <p className="text-sm text-slate-500">
              Configure your personalized contract management demo
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-2xl px-6 py-4 rounded-2xl
                ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-900 border border-slate-200 shadow-sm"
                }
              `}
            >
              <p className="leading-relaxed">{message.content}</p>
              <span className={`text-xs mt-2 block opacity-70`}>
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 shadow-sm px-6 py-4 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => setInput(action.action)}
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white p-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your prospect or what you'd like to demonstrate..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
