"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Info,
  ArrowLeft,
  Zap,
} from "lucide-react";
import {
  calculatePIT,
  calculateStandardDeductions,
  formatNaira,
  formatBandRange,
  type PITResult,
} from "@/lib/calculators/pit";
import { FAQAccordion } from "@/components/tools/faq-accordion";
import { RelatedTools } from "@/components/tools/related-tools";
import { PITCalculatorSchemas } from "@/components/seo/calculator-schemas";

const pitFAQs = [
  {
    question: "What is the tax-free threshold in Nigeria 2026?",
    answer: "Under the 2026 Nigerian tax reform, the first ₦800,000 of annual income is completely tax-free. This means if you earn ₦800,000 or less per year (about ₦66,667 per month), you pay zero income tax."
  },
  {
    question: "What are the PAYE tax rates in Nigeria 2025/2026?",
    answer: "Nigeria's 2026 tax reform introduced new progressive tax bands: 0% on first ₦800,000, 15% on ₦800,001 to ₦3,000,000, 18% on ₦3,000,001 to ₦12,000,000, 21% on ₦12,000,001 to ₦25,000,000, 23% on ₦25,000,001 to ₦50,000,000, and 25% on income above ₦50,000,000."
  },
  {
    question: "How do I calculate PAYE in Nigeria?",
    answer: "To calculate PAYE: 1) Start with gross annual income, 2) Subtract tax-deductible contributions (pension 8%, NHIS 5%, NHF 2.5%), 3) Apply the Consolidated Relief Allowance (₦200,000 + 20% of gross), 4) Apply progressive tax bands to taxable income. Our free calculator does this automatically."
  },
  {
    question: "What deductions reduce my taxable income in Nigeria?",
    answer: "Tax-deductible items include: Pension contributions (8% of basic), National Health Insurance (5% of basic), National Housing Fund (2.5% of basic), Life insurance premiums, and Consolidated Relief Allowance (₦200,000 or 1% of gross income, plus 20% of gross income)."
  },
  {
    question: "Is PAYE the same as personal income tax in Nigeria?",
    answer: "PAYE (Pay As You Earn) is the method by which employers deduct personal income tax from employee salaries monthly and remit to FIRS. Personal Income Tax is the broader category that includes PAYE for employed individuals and direct assessment for self-employed individuals."
  },
  {
    question: "When is Nigerian income tax due?",
    answer: "For PAYE, employers must remit deducted tax by the 10th of the following month. Self-employed individuals must file annual returns by March 31st. Companies must file within 6 months of their accounting year end."
  }
];

export default function PITCalculatorPage() {
  // Form state
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [pension, setPension] = useState<number>(0);
  const [nhis, setNhis] = useState<number>(0);
  const [nhf, setNhf] = useState<number>(0);
  const [rent, setRent] = useState<number>(0);
  const [lifeInsurance, setLifeInsurance] = useState<number>(0);
  const [mortgage, setMortgage] = useState<number>(0);

  // Result state
  const [result, setResult] = useState<PITResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Real-time preview of gross income
  const previewTaxFree = grossIncome <= 800000;
  const previewEstimate =
    grossIncome > 0
      ? calculatePIT({
          grossIncome,
          pension: 0,
          nhis: 0,
          nhf: 0,
          rent: 0,
          lifeInsurance: 0,
          mortgage: 0,
        })
      : null;

  const handleAutoCalculateDeductions = () => {
    const deductions = calculateStandardDeductions(grossIncome);
    setPension(Math.round(deductions.pension));
    setNhis(Math.round(deductions.nhis));
    setNhf(Math.round(deductions.nhf));
  };

  const handleCalculate = () => {
    const pitResult = calculatePIT({
      grossIncome,
      pension,
      nhis,
      nhf,
      rent,
      lifeInsurance,
      mortgage,
    });
    setResult(pitResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setGrossIncome(0);
    setPension(0);
    setNhis(0);
    setNhf(0);
    setRent(0);
    setLifeInsurance(0);
    setMortgage(0);
    setResult(null);
    setShowResult(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-12 md:pt-40 md:pb-16 border-b-4 border-primary">
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
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                <Calculator
                  className="h-8 w-8 md:h-10 md:w-10 text-primary"
                  strokeWidth={3}
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 mb-3">
                  <Sparkles className="h-3 w-3 text-green-500" strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-green-600">
                    First ₦800K Tax-Free
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Personal Income Tax
                  <span className="block text-primary">Calculator</span>
                </h1>
                <p className="mt-3 font-bold text-muted-foreground">
                  Calculate your 2026 PIT with progressive rates and all
                  available deductions.
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
                  Enter Your Details
                </h2>
              </div>

              <div className="p-4 md:p-6 space-y-6">
                {/* Gross Income */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-primary/10 flex items-center justify-center text-[10px] font-black">
                      1
                    </span>
                    Gross Annual Income (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={grossIncome || ""}
                    onChange={(e) => setGrossIncome(Number(e.target.value) || 0)}
                    placeholder="e.g., 5000000"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-primary focus:outline-none transition-colors"
                  />
                  {previewEstimate && grossIncome > 0 && (
                    <div
                      className={`p-2 text-xs font-bold ${previewTaxFree ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}
                    >
                      {previewTaxFree
                        ? "Tax-free! Income below ₦800K threshold"
                        : `Estimated tax before deductions: ${formatNaira(previewEstimate.annualTax)}`}
                    </div>
                  )}
                </div>

                {/* Statutory Deductions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                      <span className="w-5 h-5 bg-primary/10 flex items-center justify-center text-[10px] font-black">
                        2
                      </span>
                      Statutory Deductions
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAutoCalculateDeductions}
                      disabled={grossIncome <= 0}
                      className="text-xs font-bold uppercase border-2"
                    >
                      <Zap className="h-3 w-3 mr-1" strokeWidth={3} />
                      Auto-Fill
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Pension (8%)
                      </label>
                      <input
                        type="number"
                        value={pension || ""}
                        onChange={(e) => setPension(Number(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        NHIS (5%)
                      </label>
                      <input
                        type="number"
                        value={nhis || ""}
                        onChange={(e) => setNhis(Number(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        NHF (2.5%)
                      </label>
                      <input
                        type="number"
                        value={nhf || ""}
                        onChange={(e) => setNhf(Number(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Reliefs */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-primary/10 flex items-center justify-center text-[10px] font-black">
                      3
                    </span>
                    Optional Reliefs
                  </label>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                        Annual Rent Paid
                        <span className="text-green-500">(20% relief, max ₦500K)</span>
                      </label>
                      <input
                        type="number"
                        value={rent || ""}
                        onChange={(e) => setRent(Number(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">
                          Life Insurance
                        </label>
                        <input
                          type="number"
                          value={lifeInsurance || ""}
                          onChange={(e) =>
                            setLifeInsurance(Number(e.target.value) || 0)
                          }
                          placeholder="0"
                          className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">
                          Mortgage Interest
                        </label>
                        <input
                          type="number"
                          value={mortgage || ""}
                          onChange={(e) =>
                            setMortgage(Number(e.target.value) || 0)
                          }
                          placeholder="0"
                          className="w-full border-2 border-border bg-background p-2 text-sm font-medium focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
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
                    disabled={grossIncome <= 0}
                    className="flex-1 font-bold uppercase text-xs bg-primary text-primary-foreground"
                  >
                    Calculate Tax
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-background border-2 border-border">
              <div className="p-4 md:p-6 border-b-2 border-border bg-muted/30">
                <h2 className="font-black uppercase tracking-tight">
                  Tax Calculation Results
                </h2>
              </div>

              {!showResult || !result ? (
                <div className="p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-muted border-2 border-border flex items-center justify-center mx-auto mb-4">
                    <Calculator
                      className="h-8 w-8 text-muted-foreground"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="font-black uppercase tracking-tight mb-2">
                    Enter Your Income
                  </p>
                  <p className="text-sm font-bold text-muted-foreground">
                    Fill in the form and click Calculate to see your tax
                    breakdown
                  </p>
                </div>
              ) : (
                <div className="p-4 md:p-6 space-y-6">
                  {/* Summary Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50">
                      <span className="text-xs font-bold uppercase text-muted-foreground">
                        Gross Income
                      </span>
                      <span className="font-black">
                        {formatNaira(result.grossIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50">
                      <span className="text-xs font-bold uppercase text-muted-foreground">
                        Total Deductions
                      </span>
                      <span className="font-black text-green-600">
                        -{formatNaira(result.totalDeductions)}
                      </span>
                    </div>
                    {result.rentRelief > 0 && (
                      <div className="flex justify-between items-center p-3 bg-green-500/10">
                        <span className="text-xs font-bold uppercase text-green-600 flex items-center gap-2">
                          Rent Relief (20%)
                          <CheckCircle className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="font-black text-green-600">
                          -{formatNaira(result.rentRelief)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center p-3 border-2 border-border">
                      <span className="text-xs font-bold uppercase">
                        Taxable Income
                      </span>
                      <span className="font-black">
                        {formatNaira(result.taxableIncome)}
                      </span>
                    </div>
                  </div>

                  {/* Tax Due Hero */}
                  <div
                    className={`p-6 text-center ${result.annualTax === 0 ? "bg-green-500" : "bg-primary"}`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                      Annual Tax Due
                    </p>
                    <p className="text-3xl md:text-4xl font-black">
                      {formatNaira(result.annualTax)}
                    </p>
                    {result.annualTax === 0 && (
                      <p className="text-xs font-bold mt-2 opacity-90">
                        Tax-Free Under 2026 Reform
                      </p>
                    )}
                  </div>

                  {/* Monthly & Rate */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted/50 text-center">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        Monthly PAYE
                      </p>
                      <p className="text-lg font-black">
                        {formatNaira(result.monthlyTax)}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 text-center">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        Effective Rate
                      </p>
                      <p className="text-lg font-black">
                        {result.effectiveRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Tax Breakdown */}
                  {result.breakdown.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wide">
                        Tax Breakdown by Band
                      </p>
                      <div className="space-y-1">
                        {result.breakdown.map((band, index) => (
                          <div
                            key={index}
                            className={`flex justify-between items-center p-2 text-xs ${band.rate === 0 ? "bg-green-500/10" : "bg-muted/50"}`}
                          >
                            <span className="font-bold">
                              {formatBandRange(band.min, band.max)}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {(band.rate * 100).toFixed(0)}%
                            </span>
                            <span className="font-black">
                              {formatNaira(band.tax)}
                            </span>
                          </div>
                        ))}
                      </div>
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
          <div className="max-w-3xl mx-auto">
            <div className="p-4 md:p-6 border-l-4 border-primary bg-primary/5">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div className="space-y-2">
                  <p className="font-black uppercase text-sm">
                    2026 Tax Reform Benefits
                  </p>
                  <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      First ₦800,000 is completely tax-free
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Progressive rates from 0% to 25% (down from 24%)
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Rent relief: 20% of annual rent (max ₦500K)
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      No minimum tax requirement
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
              faqs={pitFAQs}
            />
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="py-12 md:py-16 bg-background border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <RelatedTools currentTool="pit" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-black uppercase tracking-tight">
              Want to track your taxes year-round?
            </p>
            <p className="text-sm font-bold text-muted-foreground">
              Sign up for Nalo Finance to get automatic tax estimates as you
              record your income.
            </p>
            <Link href="https://app.nalofinance.com/register">
              <Button className="font-bold uppercase text-xs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas for SEO */}
      <PITCalculatorSchemas />
    </>
  );
}
