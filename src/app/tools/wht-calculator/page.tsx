"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Info,
  ArrowLeft,
  AlertTriangle,
  Calendar,
  Shield,
  Percent,
} from "lucide-react";
import {
  calculateWHT,
  formatNaira,
  getTransactionTypes,
  TRANSACTION_TYPE_NAMES,
  type WHTResult,
  type TransactionType,
  type RecipientType,
} from "@/lib/calculators/wht";
import { FAQAccordion } from "@/components/tools/faq-accordion";
import { RelatedTools } from "@/components/tools/related-tools";
import { WHTCalculatorSchemas } from "@/components/seo/calculator-schemas";

const whtFAQs = [
  {
    question: "What is Withholding Tax (WHT) in Nigeria?",
    answer: "Withholding Tax is an advance payment of income tax deducted at source when certain payments are made. The payer deducts WHT from the gross payment and remits to FIRS. It serves as advance tax credit for the recipient against their final tax liability."
  },
  {
    question: "What are the WHT rates in Nigeria 2025?",
    answer: "WHT rates vary by payment type: Dividends (10%), Interest (10%), Royalties (10%), Rent (10%), Commission/Consultancy (10%), Technical/Management Fees (10%), Directors Fees (10%), Construction (5%), and Contracts (5%). Non-residents typically pay higher rates."
  },
  {
    question: "Who is exempt from WHT in Nigeria?",
    answer: "Exemptions include: Government agencies, organizations with tax exemption certificates, small companies under the SME exemption (turnover <₦25M and monthly transactions <₦2M), payments below certain thresholds, and certain transactions covered by double taxation treaties."
  },
  {
    question: "What happens if recipient has no TIN?",
    answer: "If the payment recipient doesn't have a Tax Identification Number (TIN), an additional 5% WHT applies on top of the standard rate for non-passive income. This incentivizes tax registration and compliance."
  },
  {
    question: "When must WHT be remitted in Nigeria?",
    answer: "WHT must be remitted to FIRS within 21 days from the date of deduction for companies. State WHT must typically be remitted by month-end. Late remittance attracts 10% penalty plus interest charges."
  },
  {
    question: "Can WHT be recovered in Nigeria?",
    answer: "Yes, WHT is a credit against final tax liability. Recipients can use WHT credit notes to offset their annual income tax. If WHT exceeds actual tax due, the excess can be refunded or carried forward."
  }
];

export default function WHTCalculatorPage() {
  // Form state
  const [transactionType, setTransactionType] =
    useState<TransactionType>("professional_services");
  const [grossAmount, setGrossAmount] = useState<number>(0);
  const [recipientType, setRecipientType] = useState<RecipientType>("individual");
  const [isResident, setIsResident] = useState<boolean>(true);
  const [hasTIN, setHasTIN] = useState<boolean>(true);
  const [isSmallCompany, setIsSmallCompany] = useState<boolean>(false);
  const [monthlyTransactionValue, setMonthlyTransactionValue] = useState<number>(0);

  // Result state
  const [result, setResult] = useState<WHTResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const transactionTypes = getTransactionTypes();

  const handleCalculate = () => {
    const whtResult = calculateWHT({
      transactionType,
      grossAmount,
      recipientType,
      isResident,
      hasTIN,
      isSmallCompany,
      monthlyTransactionValue: isSmallCompany ? monthlyTransactionValue : 0,
    });
    setResult(whtResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setTransactionType("professional_services");
    setGrossAmount(0);
    setRecipientType("individual");
    setIsResident(true);
    setHasTIN(true);
    setIsSmallCompany(false);
    setMonthlyTransactionValue(0);
    setResult(null);
    setShowResult(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-12 md:pt-40 md:pb-16 border-b-4 border-purple-500">
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
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center flex-shrink-0">
                <FileText
                  className="h-8 w-8 md:h-10 md:w-10 text-purple-500"
                  strokeWidth={3}
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 mb-3">
                  <Sparkles className="h-3 w-3 text-green-500" strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-green-600">
                    SME Exemptions Available
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Withholding Tax
                  <span className="block text-purple-500">Calculator</span>
                </h1>
                <p className="mt-3 font-bold text-muted-foreground">
                  Calculate WHT on payments with automatic rate adjustments for
                  residency and TIN status.
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
                  Enter Payment Details
                </h2>
              </div>

              <div className="p-4 md:p-6 space-y-6">
                {/* Transaction Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-purple-500/10 flex items-center justify-center text-[10px] font-black text-purple-500">
                      1
                    </span>
                    Transaction Type
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={transactionType}
                    onChange={(e) =>
                      setTransactionType(e.target.value as TransactionType)
                    }
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    {transactionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gross Amount */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-purple-500/10 flex items-center justify-center text-[10px] font-black text-purple-500">
                      2
                    </span>
                    Gross Payment Amount (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={grossAmount || ""}
                    onChange={(e) => setGrossAmount(Number(e.target.value) || 0)}
                    placeholder="Payment amount before WHT"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Recipient Details */}
                <div className="space-y-4 p-4 border-2 border-border bg-muted/30">
                  <p className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-purple-500/10 flex items-center justify-center text-[10px] font-black text-purple-500">
                      3
                    </span>
                    Recipient Details
                  </p>

                  {/* Recipient Type */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Recipient Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRecipientType("individual")}
                        className={`p-3 border-2 text-sm font-bold transition-colors ${recipientType === "individual" ? "border-purple-500 bg-purple-500/10" : "border-border hover:border-purple-500/50"}`}
                      >
                        Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipientType("corporate")}
                        className={`p-3 border-2 text-sm font-bold transition-colors ${recipientType === "corporate" ? "border-purple-500 bg-purple-500/10" : "border-border hover:border-purple-500/50"}`}
                      >
                        Corporate
                      </button>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-border cursor-pointer hover:border-purple-500/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={isResident}
                        onChange={(e) => setIsResident(e.target.checked)}
                        className="h-4 w-4 border-2 border-border"
                      />
                      <span className="font-bold text-sm">
                        Nigerian Resident
                      </span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-border cursor-pointer hover:border-purple-500/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasTIN}
                        onChange={(e) => setHasTIN(e.target.checked)}
                        className="h-4 w-4 border-2 border-border"
                      />
                      <div>
                        <span className="font-bold text-sm">
                          Recipient Has TIN
                        </span>
                        <p className="text-[10px] font-bold text-muted-foreground">
                          Tax Identification Number
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Small Company Exemption */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border-2 border-border cursor-pointer hover:border-purple-500/50 transition-colors bg-purple-500/5">
                    <input
                      type="checkbox"
                      checked={isSmallCompany}
                      onChange={(e) => setIsSmallCompany(e.target.checked)}
                      className="mt-1 h-4 w-4 border-2 border-border"
                    />
                    <div>
                      <span className="font-bold text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-500" strokeWidth={3} />
                        Payer is a Small Company
                      </span>
                      <p className="text-[10px] font-bold text-muted-foreground mt-1">
                        Annual turnover less than ₦25M (may qualify for WHT
                        exemption)
                      </p>
                    </div>
                  </label>

                  {isSmallCompany && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Total Transaction Value This Month (₦)
                      </label>
                      <input
                        type="number"
                        value={monthlyTransactionValue || ""}
                        onChange={(e) =>
                          setMonthlyTransactionValue(Number(e.target.value) || 0)
                        }
                        placeholder="Must be ≤ ₦2M for exemption"
                        className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-purple-500 focus:outline-none"
                      />
                      {monthlyTransactionValue > 0 && (
                        <div
                          className={`p-2 text-xs font-bold ${monthlyTransactionValue <= 2_000_000 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"}`}
                        >
                          {monthlyTransactionValue <= 2_000_000 ? (
                            <>
                              <CheckCircle
                                className="h-3 w-3 inline mr-1"
                                strokeWidth={3}
                              />
                              Below ₦2M monthly limit - Exemption applies
                            </>
                          ) : (
                            <>
                              <AlertTriangle
                                className="h-3 w-3 inline mr-1"
                                strokeWidth={3}
                              />
                              Exceeds ₦2M monthly limit - No exemption
                            </>
                          )}
                        </div>
                      )}
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
                    disabled={grossAmount <= 0}
                    className="flex-1 font-bold uppercase text-xs bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Calculate WHT
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-background border-2 border-border">
              <div className="p-4 md:p-6 border-b-2 border-border bg-muted/30">
                <h2 className="font-black uppercase tracking-tight">
                  WHT Calculation Results
                </h2>
              </div>

              {!showResult || !result ? (
                <div className="p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-muted border-2 border-border flex items-center justify-center mx-auto mb-4">
                    <FileText
                      className="h-8 w-8 text-muted-foreground"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="font-black uppercase tracking-tight mb-2">
                    Enter Payment Details
                  </p>
                  <p className="text-sm font-bold text-muted-foreground">
                    Fill in the form to calculate withholding tax obligations
                  </p>
                </div>
              ) : (
                <div className="p-4 md:p-6 space-y-6">
                  {/* Transaction Info */}
                  <div className="p-3 bg-muted/50">
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                      Transaction Type
                    </p>
                    <p className="font-black">{result.transactionTypeName}</p>
                  </div>

                  {/* Exemption Status */}
                  {result.isExempt && (
                    <div className="p-4 bg-green-500/10 border-2 border-green-500/30">
                      <div className="flex items-center gap-3">
                        <Shield
                          className="h-6 w-6 text-green-500"
                          strokeWidth={3}
                        />
                        <div>
                          <p className="font-black uppercase text-sm text-green-600">
                            WHT Exempt
                          </p>
                          <p className="text-xs font-bold text-muted-foreground">
                            {result.exemptionReason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rate Doubled Warning */}
                  {result.rateDoubled && (
                    <div className="p-4 bg-orange-500/10 border-2 border-orange-500/30">
                      <div className="flex items-center gap-3">
                        <AlertTriangle
                          className="h-6 w-6 text-orange-500"
                          strokeWidth={3}
                        />
                        <div>
                          <p className="font-black uppercase text-sm text-orange-600">
                            Rate Doubled
                          </p>
                          <p className="text-xs font-bold text-muted-foreground">
                            No TIN provided - WHT rate doubled from{" "}
                            {result.baseRate}% to {result.appliedRate}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Calculation Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50">
                      <span className="text-xs font-bold uppercase text-muted-foreground">
                        Gross Amount
                      </span>
                      <span className="font-black">
                        {formatNaira(result.grossAmount)}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center p-3 ${result.appliedRate === 0 ? "bg-green-500/10" : "bg-purple-500/10"}`}
                    >
                      <span className="text-xs font-bold uppercase flex items-center gap-2">
                        <Percent className="h-3 w-3" strokeWidth={3} />
                        WHT Rate Applied
                      </span>
                      <span
                        className={`font-black ${result.appliedRate === 0 ? "text-green-600" : "text-purple-600"}`}
                      >
                        {result.appliedRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-2 border-purple-500/30 bg-purple-500/10">
                      <span className="text-xs font-bold uppercase text-purple-600">
                        WHT Amount
                      </span>
                      <span className="font-black text-purple-600">
                        {formatNaira(result.whtAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Net Payment Hero */}
                  <div className="p-6 text-center bg-green-500 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                      Net Payment to Recipient
                    </p>
                    <p className="text-3xl md:text-4xl font-black">
                      {formatNaira(result.netPayment)}
                    </p>
                  </div>

                  {/* Remittance Schedule */}
                  {!result.isExempt && (
                    <div className="p-4 bg-blue-500/10 border-2 border-blue-500/30">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" strokeWidth={3} />
                        Remittance Schedule
                      </p>
                      <div className="space-y-2 text-sm font-bold">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Federal WHT Due:
                          </span>
                          <span>{result.remittanceInfo.federalDue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            State WHT Due:
                          </span>
                          <span>{result.remittanceInfo.stateDue}</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground mt-3">
                        Late payment attracts 10% penalty plus interest
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
            <div className="p-4 md:p-6 border-l-4 border-purple-500 bg-purple-500/5">
              <div className="flex gap-3">
                <Info
                  className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5"
                  strokeWidth={3}
                />
                <div className="space-y-2">
                  <p className="font-black uppercase text-sm">
                    WHT Key Information
                  </p>
                  <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Small companies (turnover &lt;₦25M) may be exempt if
                      monthly transactions ≤₦2M
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      WHT deducted counts as credit against recipient&apos;s final
                      tax liability
                    </li>
                    <li>
                      <AlertTriangle
                        className="h-3 w-3 text-orange-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Rates double for recipients without TIN (non-passive income
                      only)
                    </li>
                    <li>
                      <Calendar
                        className="h-3 w-3 text-blue-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Must be remitted by 21st (Federal) or month-end (State)
                    </li>
                  </ul>
                </div>
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
              faqs={whtFAQs}
            />
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="py-12 md:py-16 bg-background border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <RelatedTools currentTool="wht" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-black uppercase tracking-tight">
              Automate your WHT compliance
            </p>
            <p className="text-sm font-bold text-muted-foreground">
              Sign up for Nalo Finance to track payments and generate WHT
              remittance reports automatically.
            </p>
            <Link href="https://app.nalofinance.com/register">
              <Button className="font-bold uppercase text-xs bg-purple-500 hover:bg-purple-600">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas for SEO */}
      <WHTCalculatorSchemas />
    </>
  );
}
