import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Building2,
  Bitcoin,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Shield,
} from "lucide-react";

const calculators = [
  {
    name: "PIT Calculator",
    fullName: "Personal Income Tax",
    description:
      "Calculate your personal income tax under the 2026 Nigerian tax reform with the new progressive rates and deductions.",
    href: "/tools/pit-calculator",
    icon: Calculator,
    color: "primary",
    features: [
      "Progressive tax bands (0-25%)",
      "First ₦800K tax-free",
      "Statutory deductions",
      "Rent relief up to ₦500K",
    ],
  },
  {
    name: "CIT Calculator",
    fullName: "Company Income Tax",
    description:
      "Check if your company qualifies for the Small Company Exemption and calculate your CIT liability.",
    href: "/tools/cit-calculator",
    icon: Building2,
    color: "blue",
    features: [
      "Small Company Exemption",
      "0% CIT for qualifying SMEs",
      "₦100M turnover threshold",
      "Professional service check",
    ],
  },
  {
    name: "Crypto Tax",
    fullName: "Cryptocurrency Tax",
    description:
      "Calculate capital gains tax on your cryptocurrency disposals with exemptions for small transactions.",
    href: "/tools/crypto-calculator",
    icon: Bitcoin,
    color: "orange",
    features: [
      "Capital gains calculation",
      "₦800K annual exemption",
      "Small disposal exemption",
      "Loss carry-forward",
    ],
  },
  {
    name: "WHT Calculator",
    fullName: "Withholding Tax",
    description:
      "Calculate withholding tax obligations on various payment types with automatic rate adjustments.",
    href: "/tools/wht-calculator",
    icon: FileText,
    color: "purple",
    features: [
      "12 transaction types",
      "Resident/Non-resident rates",
      "TIN status adjustments",
      "SME exemptions",
    ],
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    hover: "hover:border-primary",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    hover: "hover:border-blue-500",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-500",
    hover: "hover:border-orange-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    hover: "hover:border-purple-500",
  },
};

export default function ToolsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" strokeWidth={3} />
              <span className="text-xs font-black uppercase tracking-wider">
                100% Free Tools
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
              Nigerian Tax
              <span className="block text-primary">Calculators</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl font-bold text-muted-foreground max-w-2xl mx-auto">
              Free, instant tax calculations updated for the 2026 Nigerian tax
              reform. No sign-up required.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-500" strokeWidth={3} />
                <span>2026 Tax Reform Ready</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <Shield className="h-5 w-5 text-blue-500" strokeWidth={3} />
                <span>No Data Stored</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <Sparkles className="h-5 w-5 text-primary" strokeWidth={3} />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Calculators Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {calculators.map((calc) => {
              const colors = colorClasses[calc.color as keyof typeof colorClasses];
              const Icon = calc.icon;

              return (
                <Link
                  key={calc.name}
                  href={calc.href}
                  className={`group bg-background border-2 border-border p-6 md:p-8 transition-all duration-200 ${colors.hover} hover:shadow-xl`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 ${colors.bg} border-2 ${colors.border} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`h-7 w-7 ${colors.text}`} strokeWidth={3} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                        {calc.name}
                      </h2>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                        {calc.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-bold text-muted-foreground mb-6">
                    {calc.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {calc.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm font-bold"
                      >
                        <CheckCircle
                          className={`h-4 w-4 ${colors.text} flex-shrink-0`}
                          strokeWidth={3}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 font-black uppercase text-sm">
                    <span className={colors.text}>Calculate Now</span>
                    <ArrowRight
                      className={`h-4 w-4 ${colors.text} group-hover:translate-x-1 transition-transform`}
                      strokeWidth={3}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4">
                2026 Tax Reform
                <span className="text-primary"> Benefits</span>
              </h2>
              <p className="font-bold text-muted-foreground">
                Key changes that could save you money
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "First ₦800K Tax-Free",
                  description: "No income tax on earnings up to ₦800,000 annually",
                },
                {
                  title: "Progressive Rates",
                  description: "Lower rates for lower income brackets (0-25%)",
                },
                {
                  title: "SME CIT Exemption",
                  description: "0% company tax for businesses under ₦100M turnover",
                },
                {
                  title: "No Minimum Tax",
                  description: "Minimum tax requirement eliminated under reform",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-4 bg-green-500/5 border-2 border-green-500/20"
                >
                  <h3 className="font-black uppercase text-sm mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm font-bold text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight">
              Want to Track Your Finances?
            </h2>
            <p className="font-bold text-primary-foreground/80 max-w-xl mx-auto">
              Sign up for Nalo Finance to track your income, expenses, budgets,
              and get personalized tax estimates throughout the year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="https://app.nalofinance.com/register">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 font-black text-base px-8"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" strokeWidth={3} />
                </Button>
              </Link>
              <Link href="/features/tax-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-foreground text-foreground hover:bg-foreground/10 font-black text-base px-8"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
