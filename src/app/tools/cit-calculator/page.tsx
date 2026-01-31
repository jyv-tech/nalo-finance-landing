"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Info,
  ArrowLeft,
} from "lucide-react";
import {
  calculateCIT,
  formatNaira,
  PROFESSIONAL_SERVICES,
  type CITResult,
} from "@/lib/calculators/cit";
import { FAQAccordion } from "@/components/tools/faq-accordion";
import { RelatedTools } from "@/components/tools/related-tools";
import { CITCalculatorSchemas } from "@/components/seo/calculator-schemas";

const citFAQs = [
  {
    question: "What is the Company Income Tax rate in Nigeria 2025?",
    answer: "Nigeria has tiered CIT rates based on company size: Small Companies (turnover < ₦25 million) pay 0% tax, Medium Companies (₦25-100 million turnover) pay 20%, and Large Companies (> ₦100 million turnover) pay 30% on taxable profits."
  },
  {
    question: "What is the Small Company Exemption in Nigeria?",
    answer: "Small Company Exemption allows Nigerian companies with annual turnover below ₦100 million and total assets below ₦250 million to pay 0% company income tax. This is designed to support small businesses and startups. Professional service companies are excluded."
  },
  {
    question: "How is CIT calculated in Nigeria?",
    answer: "CIT is calculated as: Taxable Profit × Applicable Rate. First determine company size by turnover and assets, then apply the rate (0%, 20%, or 30%) to assessable profit. Minimum tax of 0.5% of turnover may apply if higher than computed tax."
  },
  {
    question: "What is the minimum tax for companies in Nigeria?",
    answer: "Companies with turnover above ₦25 million are subject to minimum tax of 0.5% of gross turnover. This applies if the calculated CIT is lower than the minimum tax amount, ensuring all medium and large companies contribute."
  },
  {
    question: "Which businesses don't qualify for SME exemption?",
    answer: "Professional service companies are excluded from the Small Company Exemption, regardless of turnover. This includes legal firms, accounting practices, medical services, engineering consultancies, IT services, and other professional advisory services."
  },
  {
    question: "When must Nigerian companies file CIT returns?",
    answer: "Nigerian companies must file CIT returns within 6 months after their accounting year end. New companies have 18 months from incorporation for their first return. Late filing attracts penalties of ₦25,000 for the first month and ₦5,000 for each subsequent month."
  }
];

export default function CITCalculatorPage() {
  // Form state
  const [assessableProfit, setAssessableProfit] = useState<number>(0);
  const [annualTurnover, setAnnualTurnover] = useState<number>(0);
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [isProfessionalService, setIsProfessionalService] = useState<boolean>(false);

  // Result state
  const [result, setResult] = useState<CITResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Real-time eligibility preview
  const previewEligible =
    annualTurnover > 0 &&
    annualTurnover <= 100_000_000 &&
    totalAssets <= 250_000_000 &&
    !isProfessionalService;

  const handleCalculate = () => {
    const citResult = calculateCIT({
      assessableProfit,
      annualTurnover,
      totalAssets,
      isProfessionalService,
    });
    setResult(citResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setAssessableProfit(0);
    setAnnualTurnover(0);
    setTotalAssets(0);
    setIsProfessionalService(false);
    setResult(null);
    setShowResult(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-12 md:pt-40 md:pb-16 border-b-4 border-blue-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={3} />
              All Tax Tools
            </Link>

            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <Building2
                  className="h-8 w-8 md:h-10 md:w-10 text-blue-500"
                  strokeWidth={3}
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 mb-3">
                  <Sparkles className="h-3 w-3 text-green-500" strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-green-600">
                    0% CIT for SMEs
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Company Income Tax
                  <span className="block text-blue-500">Calculator</span>
                </h1>
                <p className="mt-3 font-bold text-muted-foreground">
                  Check if your company qualifies for the Small Company Exemption
                  under the 2026 tax reform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Form Card */}
            <div className="bg-background border-2 border-border">
              <div className="p-4 md:p-6 border-b-2 border-border bg-muted/30">
                <h2 className="font-black uppercase tracking-tight">
                  Enter Company Details
                </h2>
              </div>

              <div className="p-4 md:p-6 space-y-6">
                {/* Assessable Profit */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500">
                      1
                    </span>
                    Assessable Profit (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={assessableProfit || ""}
                    onChange={(e) =>
                      setAssessableProfit(Number(e.target.value) || 0)
                    }
                    placeholder="Net profit after adjustments"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] font-bold text-muted-foreground">
                    Net profit after accounting and tax adjustments
                  </p>
                </div>

                {/* Annual Turnover */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500">
                      2
                    </span>
                    Annual Turnover (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={annualTurnover || ""}
                    onChange={(e) =>
                      setAnnualTurnover(Number(e.target.value) || 0)
                    }
                    placeholder="Total gross revenue"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  {annualTurnover > 0 && (
                    <div
                      className={`p-2 text-xs font-bold ${annualTurnover <= 100_000_000 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"}`}
                    >
                      {annualTurnover <= 100_000_000 ? (
                        <>
                          <CheckCircle
                            className="h-3 w-3 inline mr-1"
                            strokeWidth={3}
                          />
                          Below ₦100M threshold
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 inline mr-1" strokeWidth={3} />
                          Exceeds ₦100M threshold
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Total Fixed Assets */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500">
                      3
                    </span>
                    Total Fixed Assets (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={totalAssets || ""}
                    onChange={(e) => setTotalAssets(Number(e.target.value) || 0)}
                    placeholder="Property, plant & equipment"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  {totalAssets > 0 && (
                    <div
                      className={`p-2 text-xs font-bold ${totalAssets <= 250_000_000 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"}`}
                    >
                      {totalAssets <= 250_000_000 ? (
                        <>
                          <CheckCircle
                            className="h-3 w-3 inline mr-1"
                            strokeWidth={3}
                          />
                          Below ₦250M threshold
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 inline mr-1" strokeWidth={3} />
                          Exceeds ₦250M threshold
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Professional Service */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500">
                      4
                    </span>
                    Business Type
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-border cursor-pointer hover:border-blue-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isProfessionalService}
                      onChange={(e) =>
                        setIsProfessionalService(e.target.checked)
                      }
                      className="mt-1 h-4 w-4 border-2 border-border"
                    />
                    <div>
                      <span className="font-bold text-sm">
                        Professional Service Company
                      </span>
                      <p className="text-[10px] font-bold text-muted-foreground mt-1">
                        Legal, accounting, medical, engineering, IT consulting,
                        etc.
                      </p>
                    </div>
                  </label>
                  {isProfessionalService && (
                    <div className="p-2 text-xs font-bold bg-orange-500/10 text-orange-600">
                      <XCircle className="h-3 w-3 inline mr-1" strokeWidth={3} />
                      Professional services are excluded from exemption
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t-2 border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1 font-bold uppercase text-xs border-2"
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCalculate}
                    disabled={assessableProfit <= 0 || annualTurnover <= 0}
                    className="flex-1 font-bold uppercase text-xs bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Calculate CIT
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-background border-2 border-border">
              <div className="p-4 md:p-6 border-b-2 border-border bg-muted/30">
                <h2 className="font-black uppercase tracking-tight">
                  CIT Calculation Results
                </h2>
              </div>

              {!showResult || !result ? (
                <div className="p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-muted border-2 border-border flex items-center justify-center mx-auto mb-4">
                    <Building2
                      className="h-8 w-8 text-muted-foreground"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="font-black uppercase tracking-tight mb-2">
                    Enter Company Details
                  </p>
                  <p className="text-sm font-bold text-muted-foreground">
                    Fill in the form to check exemption eligibility and calculate
                    CIT
                  </p>
                </div>
              ) : (
                <div className="p-4 md:p-6 space-y-6">
                  {/* Eligibility Status */}
                  <div
                    className={`p-4 ${result.qualifiesForExemption ? "bg-green-500/10 border-2 border-green-500/30" : "bg-orange-500/10 border-2 border-orange-500/30"}`}
                  >
                    <div className="flex items-center gap-3">
                      {result.qualifiesForExemption ? (
                        <CheckCircle
                          className="h-6 w-6 text-green-500"
                          strokeWidth={3}
                        />
                      ) : (
                        <XCircle
                          className="h-6 w-6 text-orange-500"
                          strokeWidth={3}
                        />
                      )}
                      <div>
                        <p className="font-black uppercase text-sm">
                          {result.qualifiesForExemption
                            ? "Qualifies for Exemption"
                            : "Does Not Qualify"}
                        </p>
                        <p className="text-xs font-bold text-muted-foreground">
                          Small Company Exemption Status
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Disqualification Reasons */}
                  {result.disqualificationReasons.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                        Disqualification Reasons
                      </p>
                      <ul className="space-y-1">
                        {result.disqualificationReasons.map((reason, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm font-bold text-muted-foreground"
                          >
                            <XCircle
                              className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5"
                              strokeWidth={3}
                            />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Summary Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50">
                      <span className="text-xs font-bold uppercase text-muted-foreground">
                        Assessable Profit
                      </span>
                      <span className="font-black">
                        {formatNaira(result.assessableProfit)}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center p-3 ${result.citRate === 0 ? "bg-green-500/10" : "bg-muted/50"}`}
                    >
                      <span className="text-xs font-bold uppercase text-muted-foreground">
                        CIT Rate Applied
                      </span>
                      <span
                        className={`font-black ${result.citRate === 0 ? "text-green-600" : ""}`}
                      >
                        {result.citRate}%
                      </span>
                    </div>
                  </div>

                  {/* CIT Due Hero */}
                  <div
                    className={`p-6 text-center ${result.citAmount === 0 ? "bg-green-500" : "bg-blue-500"} text-white`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                      Company Income Tax Due
                    </p>
                    <p className="text-3xl md:text-4xl font-black">
                      {formatNaira(result.citAmount)}
                    </p>
                    {result.citAmount === 0 && (
                      <p className="text-xs font-bold mt-2 opacity-90">
                        Small Company Exemption Applied
                      </p>
                    )}
                  </div>

                  {/* Exemption Note */}
                  {result.exemptionReason && (
                    <div className="p-3 bg-green-500/10 border-l-4 border-green-500">
                      <p className="text-sm font-bold text-green-600">
                        {result.exemptionReason}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-4 md:p-6 border-l-4 border-blue-500 bg-blue-500/5">
              <div className="flex gap-3">
                <Info
                  className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                  strokeWidth={3}
                />
                <div className="space-y-2">
                  <p className="font-black uppercase text-sm">
                    Small Company Exemption Criteria
                  </p>
                  <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Annual turnover must be ₦100 million or less
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Total fixed assets must be ₦250 million or less
                    </li>
                    <li>
                      <XCircle
                        className="h-3 w-3 text-destructive inline mr-2"
                        strokeWidth={3}
                      />
                      Must NOT be a professional service company
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-2 border-border">
              <p className="font-black uppercase text-sm mb-3">
                Excluded Professional Services
              </p>
              <div className="flex flex-wrap gap-2">
                {PROFESSIONAL_SERVICES.map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-muted text-xs font-bold"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion
              title="Frequently Asked Questions"
              faqs={citFAQs}
            />
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="py-12 md:py-16 bg-background border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <RelatedTools currentTool="cit" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-black uppercase tracking-tight">
              Track your business finances
            </p>
            <p className="text-sm font-bold text-muted-foreground">
              Sign up for Nalo Finance to monitor your turnover, profits, and tax
              obligations in real-time.
            </p>
            <Link href="https://app.nalofinance.com/register">
              <Button className="font-bold uppercase text-xs bg-blue-500 hover:bg-blue-600">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas for SEO */}
      <CITCalculatorSchemas />
    </>
  );
}
