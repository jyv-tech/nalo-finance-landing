"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Clock,
  Twitter,
  Linkedin,
  Instagram,
  HelpCircle,
  Bug,
  Lightbulb,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitContactForm(formData);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "", category: "general" });
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/20 mb-6">
                <MessageSquare className="h-4 w-4 text-primary" strokeWidth={3} />
                <span className="text-xs font-black uppercase tracking-wide">
                  We're Here to Help
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
                Get In Touch
                <br />
                <span className="text-primary">With Our Team</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground mb-8">
                Have questions? Need support? Want to share feedback? We're all ears.
                Our team typically responds within 24 hours.
              </p>
            </div>

            {/* Right - Abstract Illustration */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Chat bubble shapes */}
                <div className="absolute top-4 right-8 w-64 h-48 bg-primary border-4 border-black" />
                <div className="absolute top-20 right-24 w-48 h-36 bg-background border-4 border-black" />
                {/* Envelope shape */}
                <div className="absolute bottom-16 right-4 w-40 h-28 bg-black" />
                <div className="absolute bottom-20 right-8 w-32 h-20 bg-primary/50 border-4 border-black" />
                {/* Decorative elements */}
                <div className="absolute top-0 right-80 w-16 h-16 bg-primary/30 border-4 border-primary" />
                <div className="absolute top-56 right-72 w-20 h-20 border-4 border-black" />
                {/* Lines */}
                <div className="absolute top-36 right-4 w-24 h-1 bg-black" />
                <div className="absolute top-40 right-8 w-16 h-1 bg-primary" />
                <div className="absolute top-44 right-4 w-20 h-1 bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <Card className="border-2 border-border bg-background">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black uppercase mb-2">Email Us</h3>
                <p className="text-sm font-bold text-muted-foreground mb-3">
                  For general inquiries and support
                </p>
                <a
                  href="mailto:hello@nalofinance.com"
                  className="text-sm font-black text-primary hover:underline"
                >
                  hello@nalofinance.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-background">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black uppercase mb-2">Visit Us</h3>
                <p className="text-sm font-bold text-muted-foreground mb-3">
                  Our office location
                </p>
                <p className="text-sm font-black">
                  Lagos, Nigeria 🇳🇬
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-background">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black uppercase mb-2">Response Time</h3>
                <p className="text-sm font-bold text-muted-foreground mb-3">
                  We typically respond within
                </p>
                <p className="text-sm font-black">
                  24 Hours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="p-8 bg-success/10 border-2 border-success text-center">
                  <div className="w-16 h-16 bg-success/20 border-2 border-success flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-success" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2 text-success">Message Sent!</h3>
                  <p className="text-sm font-bold text-muted-foreground">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-describedby={error ? "form-error" : undefined}>
                  {error && (
                    <div
                      id="form-error"
                      role="alert"
                      aria-live="polite"
                      className="p-4 bg-destructive/10 border-2 border-destructive flex items-start gap-3"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" strokeWidth={3} aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold text-destructive">{error}</p>
                      </div>
                    </div>
                  )}
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-black uppercase mb-2">
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full p-3 border-2 border-border bg-background font-bold focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-black uppercase mb-2">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full p-3 border-2 border-border bg-background font-bold focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-black uppercase mb-2">
                      Category <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full p-3 border-2 border-border bg-background font-bold focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="partnership">Partnership/Business</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-black uppercase mb-2">
                      Subject <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full p-3 border-2 border-border bg-background font-bold focus:outline-none focus:border-primary transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-black uppercase mb-2">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      rows={6}
                      className="w-full p-3 border-2 border-border bg-background font-bold focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full font-black text-base border-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <Send className="ml-2 h-5 w-5" strokeWidth={3} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* FAQ / Quick Links */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black uppercase mb-6">Common Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: HelpCircle,
                      title: "Need Help Getting Started?",
                      description: "Check out our blog for guides, tutorials, and tips to get the most out of Nalo.",
                      action: "Read Our Blog",
                      href: "/blog",
                    },
                    {
                      icon: Bug,
                      title: "Found a Bug?",
                      description: "Report technical issues directly through the app or via email for faster resolution.",
                      action: "Report Bug",
                      href: "mailto:hello@nalofinance.com?subject=Bug Report",
                    },
                    {
                      icon: Lightbulb,
                      title: "Have a Feature Idea?",
                      description: "We love hearing from users! Share your ideas and help shape Nalo's future.",
                      action: "Submit Idea",
                      href: "mailto:hello@nalofinance.com?subject=Feature Request",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Card key={index} className="border-2 border-border bg-background">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                              <Icon className="h-5 w-5 text-primary" strokeWidth={3} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-black uppercase mb-2">{item.title}</h3>
                              <p className="text-sm font-bold text-muted-foreground mb-3">{item.description}</p>
                              <a
                                href={item.href}
                                className="text-sm font-black text-primary hover:underline inline-flex items-center gap-1"
                              >
                                {item.action}
                                <ChevronRight className="h-4 w-4" strokeWidth={3} />
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Social Media */}
              <div className="p-6 bg-muted/30 border-l-4 border-primary">
                <h3 className="text-xl font-black uppercase mb-4">Follow Us</h3>
                <p className="text-sm font-bold text-muted-foreground mb-4">
                  Stay updated with product news, tips, and announcements
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://twitter.com/nalofinance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background border-2 border-border hover:border-primary flex items-center justify-center transition-colors"
                  >
                    <Twitter className="h-5 w-5" strokeWidth={3} />
                  </a>
                  <a
                    href="https://linkedin.com/company/nalofinance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background border-2 border-border hover:border-primary flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="h-5 w-5" strokeWidth={3} />
                  </a>
                  <a
                    href="https://instagram.com/nalofinance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background border-2 border-border hover:border-primary flex items-center justify-center transition-colors"
                  >
                    <Instagram className="h-5 w-5" strokeWidth={3} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-lg md:text-xl font-bold mb-8 opacity-90">
              Join 10,000+ Nigerians already using Nalo. Start free today.
            </p>
            <Link href="https://app.nalofinance.com/register">
              <Button
                size="lg"
                variant="outline"
                className="font-black text-base px-8 border-2 bg-white text-primary hover:bg-white/90"
              >
                GET STARTED
                <ChevronRight className="ml-2 h-5 w-5" strokeWidth={3} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
