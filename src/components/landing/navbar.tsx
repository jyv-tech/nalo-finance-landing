"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Users,
  Calculator,
  Wallet,
  Brain,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target,
  Building2,
  CreditCard,
} from "lucide-react";
import { ThemeToggleDropdown } from "@/components/theme-toggle";
import { useState, useEffect, useCallback, useRef, KeyboardEvent } from "react";

const features = [
  {
    name: "Bank Connect",
    description: "Sync with your bank via Mono",
    href: "https://app.nalofinance.com/register",
    icon: Building2,
    color: "bg-primary",
  },
  {
    name: "Ajo Groups",
    description: "Digital contribution management",
    href: "/features/ajo-groups",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    name: "Tax Center",
    description: "2026 tax reform ready",
    href: "/features/tax-center",
    icon: Calculator,
    color: "bg-green-500",
  },
  {
    name: "Budgeting",
    description: "Smart expense tracking",
    href: "/features/budgeting",
    icon: Wallet,
    color: "bg-purple-500",
  },
  {
    name: "Smart Goals",
    description: "Goal tracking & savings",
    href: "/features/smart-goals",
    icon: Target,
    color: "bg-pink-500",
  },
  {
    name: "Financial Guide",
    description: "AI-powered Oracle",
    href: "/features/financial-guide",
    icon: Brain,
    color: "bg-orange-500",
  },
  {
    name: "Income Streams",
    description: "Hustle optimizer",
    href: "/features/income-streams",
    icon: TrendingUp,
    color: "bg-primary",
  },
  {
    name: "Loans & Debt",
    description: "Track & crush your debt",
    href: "https://app.nalofinance.com/register",
    icon: CreditCard,
    color: "bg-red-500",
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle keyboard navigation for dropdown
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (!featuresOpen && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setFeaturesOpen(true);
      setFocusedIndex(0);
      return;
    }

    if (featuresOpen) {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setFeaturesOpen(false);
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < features.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : features.length - 1));
          break;
        case "Tab":
          if (e.shiftKey && focusedIndex === 0) {
            setFeaturesOpen(false);
            setFocusedIndex(-1);
          } else if (!e.shiftKey && focusedIndex === features.length - 1) {
            setFeaturesOpen(false);
            setFocusedIndex(-1);
          }
          break;
      }
    }
  }, [featuresOpen, focusedIndex]);

  // Focus menu item when focusedIndex changes
  useEffect(() => {
    if (featuresOpen && focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex]?.focus();
    }
  }, [featuresOpen, focusedIndex]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b-4 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)]"
          : "bg-background border-b-4 border-primary"
      }`}
      aria-label="Main navigation"
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with hover effect */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-300" />
              <Logo size={36} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Features Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => { setFeaturesOpen(false); setFocusedIndex(-1); }}
              onKeyDown={handleKeyDown}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-sm font-black uppercase transition-all duration-200 ${
                  featuresOpen
                    ? "text-primary bg-primary/10"
                    : "hover:text-primary hover:bg-primary/5"
                }`}
                aria-expanded={featuresOpen}
                aria-haspopup="true"
                aria-controls="features-menu"
                aria-label="Features menu"
                onClick={() => setFeaturesOpen(!featuresOpen)}
                onKeyDown={handleKeyDown}
              >
                Features
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} strokeWidth={3} aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              <div
                id="features-menu"
                className={`absolute top-full left-0 w-80 bg-background border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all duration-200 ${
                  featuresOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                role="menu"
                aria-label="Features submenu"
              >
                <div className="p-2">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Link
                        key={`${feature.name}-${index}`}
                        href={feature.href}
                        ref={(el) => { menuItemsRef.current[index] = el; }}
                        role="menuitem"
                        tabIndex={featuresOpen ? 0 : -1}
                        className={`flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors group/item ${
                          focusedIndex === index ? "bg-muted/50" : ""
                        }`}
                        onClick={() => { setFeaturesOpen(false); setFocusedIndex(-1); }}
                      >
                        <div className={`w-10 h-10 ${feature.color} flex items-center justify-center shrink-0 group-hover/item:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-shadow`}>
                          <Icon className="h-5 w-5 text-white" strokeWidth={3} aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black uppercase group-hover/item:text-primary transition-colors">
                            {feature.name}
                          </p>
                          <p className="text-xs font-bold text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" strokeWidth={3} aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
                <div className="p-3 bg-muted/30 border-t-2 border-border">
                  <Link
                    href="/pricing"
                    className="flex items-center justify-between text-sm font-black uppercase hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" strokeWidth={3} />
                      View All Features & Pricing
                    </span>
                    <ArrowRight className="h-4 w-4" strokeWidth={3} />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/tools"
              className="px-4 py-2 text-sm font-black uppercase hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" strokeWidth={3} />
              Free Tools
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm font-black uppercase hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-black uppercase hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-black uppercase hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-black uppercase hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              Blog
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggleDropdown />
            <Link href="https://app.nalofinance.com/login">
              <Button
                variant="ghost"
                className="font-black uppercase text-sm hover:bg-transparent hover:text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="https://app.nalofinance.com/register">
              <Button className="font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all dark:border-primary dark:shadow-[4px_4px_0_0_rgba(255,192,0,1)]">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-12 h-12 flex items-center justify-center border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "top-3 rotate-45" : "top-1"
              }`} />
              <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`} />
              <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "top-3 -rotate-45" : "top-5"
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="py-4 border-t-2 border-border">
            {/* Features Section */}
            <div className="mb-4">
              <p className="text-xs font-black uppercase text-muted-foreground mb-3 px-2">Features</p>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Link
                      key={`mobile-${feature.name}-${index}`}
                      href={feature.href}
                      className="flex items-center gap-2 p-3 border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className={`w-8 h-8 ${feature.color} flex items-center justify-center shrink-0`}>
                        <Icon className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-xs font-black uppercase">{feature.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Other Links */}
            <div className="space-y-1 mb-4">
              <Link
                href="/tools"
                className="flex items-center gap-2 px-4 py-3 text-sm font-black uppercase hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4 text-primary" strokeWidth={3} />
                Free Tools
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-3 text-sm font-black uppercase hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-sm font-black uppercase hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-sm font-black uppercase hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-sm font-black uppercase hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>

            {/* Theme Toggle & Auth Buttons */}
            <div className="pt-4 border-t-2 border-border space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-black uppercase text-muted-foreground">Theme</span>
                <ThemeToggleDropdown />
              </div>
              <div className="flex gap-3">
                <Link href="https://app.nalofinance.com/login" className="flex-1">
                  <Button variant="outline" className="w-full font-black uppercase border-2">
                    Sign In
                  </Button>
                </Link>
                <Link href="https://app.nalofinance.com/register" className="flex-1">
                  <Button className="w-full font-black uppercase border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:border-primary dark:shadow-[4px_4px_0_0_rgba(255,192,0,1)]">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
