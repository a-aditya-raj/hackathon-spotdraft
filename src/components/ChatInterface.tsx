import { useEffect, useState } from "react";
import { Search, Send } from "lucide-react";
import { CustomerAnalysis } from "./CustomerAnalysis";
import type { Customer } from "../App";
import { getCustomerList } from "../services/api";
import logo from "../assets/logo.png";

interface ChatInterfaceProps {
  handleCustomerSelect: (
    customer: Customer | null,
    fromOverlay?: boolean
  ) => void;
  onViewMore: () => void;
  selectedCustomer: Customer | null;
}

export function ChatInterface({
  onViewMore,
  selectedCustomer,
  handleCustomerSelect,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  let timeout: NodeJS.Timeout | null = null;

  const [isLoading, setIsLoading] = useState(false);

  // Sample recent customers
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);

  const onCustomerSelect = (customer: Customer) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    setInput(`Help me curate a demo workspace for ${customer.company_name}`);
    timeout = setTimeout(() => {
      handleCustomerSelect(customer);
    }, 1500);
  };

  useEffect(() => {
    setRecentCustomers(allCustomers.slice(0, 3));
  }, [allCustomers]);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      const customers = await getCustomerList();
      setAllCustomers(customers);
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const companyName = allCustomers.find((customer) =>
      input.includes(customer.company_name)
    );

    if (companyName) {
      handleCustomerSelect(companyName);
    } else {
      setInput("");
    }
  };

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center">
      {/* Logo/Brand */}
      {!selectedCustomer && (
        <>
          <div className="mb-12">
            <div className="h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <img src={logo} alt="Echo" width={100} height={100} />
            </div>
            <p className="text-slate-400 text-center mt-2">Sales Assistant</p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-8">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-900 z-10" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Search customers or ask about analysis..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-600 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm"
              />
              <button
                onClick={handleSend}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-900 z-10"
              >
                <Send className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-900 z-10" />
              </button>
            </div>
          </div>

          {/* Customer Pills */}
          <div className="w-full max-w-6xl px-6">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">
                    Recent Customers
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentCustomers.map((customer, index) => (
                    <div
                      key={"customer" + index}
                      onClick={() => onCustomerSelect(customer)}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
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
                        <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {customer.company_name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* View All Button */}
            {!isLoading && (
              <div className="text-center">
                <button
                  onClick={onViewMore}
                  className="px-6 py-3 bg-white hover:bg-slate-600 hover:text-white text-slate-900 border border-slate-600 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm"
                >
                  View All Customers
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Customer Analysis Modal */}
      {selectedCustomer && (
        <CustomerAnalysis
          customer={selectedCustomer}
          onClose={() => handleCustomerSelect(null)}
        />
      )}
    </div>
  );
}
