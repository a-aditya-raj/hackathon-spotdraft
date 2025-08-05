import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import type { Customer } from "../App";
import { getCustomerList } from "../services/api";

export function CustomerOverlay({
  handleCustomerSelect,
}: {
  handleCustomerSelect: (customer: Customer, fromOverlay?: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Extended customer list
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const filtered = allCustomers.filter((customer) => {
      const matchesSearch = customer.company_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    setFilteredCustomers(filtered);
  }, [allCustomers, searchTerm]);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      const customers = await getCustomerList();
      setAllCustomers(customers);
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 h-[100px]">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              All Customer Calls
            </h2>
            <p className="text-slate-500 text-sm">
              Select a customer to analyze their call transcript
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Customer Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((customer, index) => (
                <div
                  key={"customer" + index}
                  onClick={() => handleCustomerSelect(customer, true)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {customer.company_name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {filteredCustomers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No customers found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
