import { X, FileText, CheckCircle } from "lucide-react";

export function ContractGuidebookOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Contract Review Guidebook
              </h2>
              <p className="text-slate-500 text-sm">
                Comprehensive checklist for contract analysis and review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <div className="prose prose-slate max-w-none">
            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  1
                </span>
                Verify Core Metadata
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Counterparty Details
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Confirm legal name, registered address, and
                      tax/registration ID.
                    </li>
                    <li>• Ensure it matches your system's vendor records.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Term & Key Dates
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Check effective date, term length, and any auto-renewal
                      provisions.
                    </li>
                    <li>
                      • Note notice windows for non-renewal or termination.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Governing Law & Jurisdiction
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>• Identify applicable law and dispute forum.</li>
                    <li>
                      • Flag any venue that's inconvenient or expensive to
                      litigate in.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  2
                </span>
                Commercial Highlights
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Payment Terms
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Ensure the stated payment cycle (e.g. Net 30) aligns
                      with your policy.
                    </li>
                    <li>
                      • Note any milestone-based payments and their triggers.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Contract Value & Currency
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Verify total value, currency, and exchange-rate
                      provisions if any.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Invoicing & Late Fees
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>• Confirm invoicing cadence (monthly, quarterly).</li>
                    <li>
                      • Check for late-payment penalties or interest rates.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  3
                </span>
                Termination & Renewal Clauses
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Termination Rights
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Distinguish "for cause" (material breach) vs. "for
                      convenience."
                    </li>
                    <li>• Note required notice periods for each.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Auto-Renewal Triggers
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Identify what constitutes renewal (no notice, tacit
                      renewal).
                    </li>
                    <li>
                      • Verify your opt-out window to avoid unwanted renewals.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  4
                </span>
                Liability & Indemnity
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Liability Cap
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Check cap amount (often prior 12 months' fees) and
                      whether it's mutual.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Carve-Outs
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Look for exclusions: IP infringement, gross negligence,
                      willful misconduct.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Indemnification Scope
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Confirm who indemnifies whom, for which claims, and
                      under what conditions.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  5
                </span>
                Data & Security Obligations
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Personal Data
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • List categories of data processed and permitted
                      purposes.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Security Standards
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Ensure required certifications (SOC 2, ISO 27001) are
                      referenced.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Subprocessors & Audits
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Check notification requirements and audit-right details.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  6
                </span>
                Insurance Requirements
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Types of Cover
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • General liability, professional/E&O, workers' comp,
                      cyber.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Coverage Amounts
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>• Match against your minimum thresholds.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  7
                </span>
                Definitions & Non-Standard Terms
              </h2>

              <div className="ml-9 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    Undefined Terms
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Highlight any term used as a defined term but not
                      defined.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium text-slate-800 mb-2">
                    "Poison Pills"
                  </h3>
                  <ul className="ml-4 space-y-1 text-sm text-slate-700">
                    <li>
                      • Watch for unilateral change rights, most-favored-nation
                      clauses, or other overbroad commitments.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  8
                </span>
                Risk Flags & Deviations
              </h2>

              <div className="ml-9 space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-800">
                    Uncapped Liability/Indemnity
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-800">
                    Vendor-Favorable Payment or Termination
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-800">
                    Broad IP Assignments to Vendor
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-800">
                    Missing Mandatory Sections (e.g. no confidentiality or
                    privacy appendix)
                  </span>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                  9
                </span>
                Attachments & Exhibits
              </h2>

              <div className="ml-9 space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Exhibit A: Scope of services or deliverables
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Pricing Schedules / SOW / SLA referenced but missing
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Other Appendices (e.g. data-privacy, security annex)
                  </span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-sm text-slate-600 italic">
                <strong>Note:</strong> This guidebook provides a comprehensive
                framework for contract review. Ensure all items are checked and
                documented as part of your review process. Flag any deviations
                or concerns for legal review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
