"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Bitcoin,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Info,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Shield,
} from "lucide-react";
import {
  calculateCryptoTax,
  formatNaira,
  type CryptoResult,
} from "@/lib/calculators/crypto";
import { FAQAccordion } from "@/components/tools/faq-accordion";
import { RelatedTools } from "@/components/tools/related-tools";
import { CryptoCalculatorSchemas } from "@/components/seo/calculator-schemas";

const cryptoFAQs = [
  {
    question: "Is cryptocurrency taxed in Nigeria?",
    answer: "Yes, cryptocurrency gains are subject to Capital Gains Tax (CGT) in Nigeria at 10%. When you sell, exchange, or dispose of crypto assets for more than you paid, the profit is taxable. However, there are exemptions for small disposals and annual gains under ₦800,000."
  },
  {
    question: "What is the crypto tax rate in Nigeria 2025?",
    answer: "Cryptocurrency gains in Nigeria are taxed at 10% Capital Gains Tax rate. This applies to profits from selling Bitcoin, Ethereum, and other digital assets. The first ₦800,000 of annual capital gains is exempt from tax."
  },
  {
    question: "Is there a tax exemption for crypto in Nigeria?",
    answer: "Yes, two main exemptions exist: 1) Small Disposal Exemption - if your total crypto disposals in a year are less than ₦10 million, no CGT applies. 2) Annual Exemption - the first ₦800,000 of capital gains annually is tax-free."
  },
  {
    question: "How do I calculate crypto tax in Nigeria?",
    answer: "Calculate your gain as: Sale Price - Purchase Price (cost basis). If gain exceeds ₦800,000 and disposals exceed ₦10M, multiply taxable gain by 10% CGT rate. Include all crypto-to-crypto trades, not just crypto-to-Naira."
  },
  {
    question: "Do I pay tax on crypto losses in Nigeria?",
    answer: "No, you don't pay tax on losses. However, capital losses can be carried forward to offset future capital gains, reducing your tax liability when you eventually make profits."
  },
  {
    question: "Is Bitcoin legal in Nigeria?",
    answer: "Yes, owning and trading Bitcoin and cryptocurrencies is legal in Nigeria. While the CBN restricted banks from facilitating crypto transactions in 2021, peer-to-peer trading remains legal, and gains are taxable under capital gains tax laws."
  }
];

export default function CryptoCalculatorPage() {
  // Form state
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [otherAnnualIncome, setOtherAnnualIncome] = useState<number>(0);

  // Result state
  const [result, setResult] = useState<CryptoResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Real-time preview
  const previewGain = salePrice - purchasePrice;
  const previewIsLoss = previewGain < 0;
  const previewExempt =
    salePrice > 0 && (salePrice < 10_000_000 || previewGain <= 800_000);

  const handleCalculate = () => {
    const cryptoResult = calculateCryptoTax({
      purchasePrice,
      salePrice,
      otherAnnualIncome,
    });
    setResult(cryptoResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setPurchasePrice(0);
    setSalePrice(0);
    setOtherAnnualIncome(0);
    setResult(null);
    setShowResult(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-12 md:pt-40 md:pb-16 border-b-4 border-orange-500">
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
              <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center flex-shrink-0">
                <Bitcoin
                  className="h-8 w-8 md:h-10 md:w-10 text-orange-500"
                  strokeWidth={3}
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 mb-3">
                  <Sparkles className="h-3 w-3 text-green-500" strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-green-600">
                    ₦800K Annual Tax-Free
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Crypto Tax
                  <span className="block text-orange-500">Calculator</span>
                </h1>
                <p className="mt-3 font-bold text-muted-foreground">
                  Calculate capital gains tax on your cryptocurrency disposals with
                  2026 exemptions.
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
                  Enter Transaction Details
                </h2>
              </div>

              <div className="p-4 md:p-6 space-y-6">
                {/* Purchase Price */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-orange-500/10 flex items-center justify-center text-[10px] font-black text-orange-500">
                      1
                    </span>
                    Purchase Price / Cost Basis (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={purchasePrice || ""}
                    onChange={(e) =>
                      setPurchasePrice(Number(e.target.value) || 0)
                    }
                    placeholder="Amount paid to acquire crypto"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-orange-500 focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] font-bold text-muted-foreground">
                    Total amount in Naira you paid to acquire the cryptocurrency
                  </p>
                </div>

                {/* Sale Price */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-orange-500/10 flex items-center justify-center text-[10px] font-black text-orange-500">
                      2
                    </span>
                    Sale Price / Proceeds (₦)
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={salePrice || ""}
                    onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                    placeholder="Amount received from sale"
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-orange-500 focus:outline-none transition-colors"
                  />

                  {/* Capital Gain Preview */}
                  {purchasePrice > 0 && salePrice > 0 && (
                    <div
                      className={`p-3 ${previewIsLoss ? "bg-red-500/10" : "bg-green-500/10"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase flex items-center gap-2">
                          {previewIsLoss ? (
                            <>
                              <TrendingDown
                                className="h-4 w-4 text-red-500"
                                strokeWidth={3}
                              />
                              <span className="text-red-600">Capital Loss</span>
                            </>
                          ) : (
                            <>
                              <TrendingUp
                                className="h-4 w-4 text-green-500"
                                strokeWidth={3}
                              />
                              <span className="text-green-600">Capital Gain</span>
                            </>
                          )}
                        </span>
                        <span
                          className={`font-black ${previewIsLoss ? "text-red-600" : "text-green-600"}`}
                        >
                          {previewIsLoss ? "-" : "+"}
                          {formatNaira(Math.abs(previewGain))}
                        </span>
                      </div>
                      {previewExempt && !previewIsLoss && (
                        <p className="text-[10px] font-bold text-green-600 mt-2 flex items-center gap-1">
                          <Shield className="h-3 w-3" strokeWidth={3} />
                          Likely tax-exempt (below threshold)
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Other Annual Income (Optional) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 bg-orange-500/10 flex items-center justify-center text-[10px] font-black text-orange-500">
                      3
                    </span>
                    Other Annual Income (₦)
                    <span className="text-muted-foreground text-[10px] ml-1">
                      Optional
                    </span>
                  </label>
                  <input
                    type="number"
                    value={otherAnnualIncome || ""}
                    onChange={(e) =>
                      setOtherAnnualIncome(Number(e.target.value) || 0)
                    }
                    placeholder="Employment, business income, etc."
                    className="w-full border-2 border-border bg-background p-3 font-medium focus:border-orange-500 focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] font-bold text-muted-foreground">
                    Include other income to determine your combined tax bracket
                  </p>
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
                    disabled={purchasePrice <= 0 || salePrice <= 0}
                    className="flex-1 font-bold uppercase text-xs bg-orange-500 hover:bg-orange-600 text-white"
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
                    <Bitcoin
                      className="h-8 w-8 text-muted-foreground"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="font-black uppercase tracking-tight mb-2">
                    Enter Transaction Details
                  </p>
                  <p className="text-sm font-bold text-muted-foreground">
                    Fill in purchase and sale prices to calculate your crypto tax
                  </p>
                </div>
              ) : (
                <div className="p-4 md:p-6 space-y-6">
                  {/* Transaction Summary */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wide">
                      Transaction Summary
                    </p>
                    <div className="flex justify-between items-center p-3 bg-muted/50">
                      <span className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <TrendingDown className="h-3 w-3" strokeWidth={3} />
                        Purchase Price
                      </span>
                      <span className="font-black">
                        {formatNaira(result.purchasePrice)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50">
                      <span className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" strokeWidth={3} />
                        Sale Price
                      </span>
                      <span className="font-black">
                        {formatNaira(result.salePrice)}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center p-3 border-2 ${result.isLoss ? "border-red-500/30 bg-red-500/10" : "border-green-500/30 bg-green-500/10"}`}
                    >
                      <span
                        className={`text-xs font-bold uppercase ${result.isLoss ? "text-red-600" : "text-green-600"}`}
                      >
                        {result.isLoss ? "Capital Loss" : "Capital Gain"}
                      </span>
                      <span
                        className={`font-black ${result.isLoss ? "text-red-600" : "text-green-600"}`}
                      >
                        {result.isLoss ? "-" : "+"}
                        {formatNaira(Math.abs(result.capitalGain))}
                      </span>
                    </div>
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
                            Tax Exempt
                          </p>
                          <p className="text-xs font-bold text-muted-foreground">
                            {result.exemptionReason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tax Calculation (if not exempt) */}
                  {!result.isExempt && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50">
                        <span className="text-xs font-bold uppercase text-muted-foreground">
                          Tax-Free Threshold
                        </span>
                        <span className="font-black text-green-600">
                          -{formatNaira(800000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-2 border-border">
                        <span className="text-xs font-bold uppercase">
                          Taxable Gain
                        </span>
                        <span className="font-black">
                          {formatNaira(result.taxableGain)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50">
                        <span className="text-xs font-bold uppercase text-muted-foreground">
                          Effective Tax Rate
                        </span>
                        <span className="font-black">
                          {result.effectiveRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tax Due Hero */}
                  <div
                    className={`p-6 text-center ${result.taxAmount === 0 ? "bg-green-500" : "bg-orange-500"} text-white`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                      Tax Due on This Transaction
                    </p>
                    <p className="text-3xl md:text-4xl font-black">
                      {formatNaira(result.taxAmount)}
                    </p>
                    {result.taxAmount === 0 && (
                      <p className="text-xs font-bold mt-2 opacity-90">
                        {result.isLoss
                          ? "No Tax - Capital Loss"
                          : "Tax-Free Under 2026 Rules"}
                      </p>
                    )}
                  </div>

                  {/* Loss Carry Forward Note */}
                  {result.isLoss && (
                    <div className="p-3 bg-blue-500/10 border-l-4 border-blue-500">
                      <p className="text-sm font-bold text-blue-600">
                        This loss of {formatNaira(Math.abs(result.capitalGain))} can
                        be carried forward to offset future crypto gains.
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
            <div className="p-4 md:p-6 border-l-4 border-orange-500 bg-orange-500/5">
              <div className="flex gap-3">
                <Info
                  className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                  strokeWidth={3}
                />
                <div className="space-y-2">
                  <p className="font-black uppercase text-sm">
                    2026 Crypto Tax Rules
                  </p>
                  <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Small disposal exemption: Transactions below ₦10M are
                      tax-free
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      First ₦800K of annual capital gains is tax-free
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Capital losses can be carried forward to offset future
                      gains
                    </li>
                    <li>
                      <CheckCircle
                        className="h-3 w-3 text-green-500 inline mr-2"
                        strokeWidth={3}
                      />
                      Progressive rates apply based on total annual income (0-25%)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-2 border-border bg-muted/30">
              <p className="font-black uppercase text-sm mb-2">
                Important Notes
              </p>
              <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                <li>
                  Crypto-to-crypto trades are taxable events (not just
                  crypto-to-fiat)
                </li>
                <li>
                  Keep records of all transactions including dates and amounts
                </li>
                <li>
                  Staking rewards and airdrops may be treated as income, not
                  capital gains
                </li>
              </ul>
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
              faqs={cryptoFAQs}
            />
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="py-12 md:py-16 bg-background border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <RelatedTools currentTool="crypto" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-black uppercase tracking-tight">
              Track all your crypto transactions
            </p>
            <p className="text-sm font-bold text-muted-foreground">
              Sign up for Nalo Finance to log your crypto trades and get
              year-round tax estimates.
            </p>
            <Link href="https://app.nalofinance.com/register">
              <Button className="font-bold uppercase text-xs bg-orange-500 hover:bg-orange-600">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas for SEO */}
      <CryptoCalculatorSchemas />
    </>
  );
}
