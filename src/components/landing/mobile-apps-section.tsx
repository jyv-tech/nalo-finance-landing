import { Smartphone, Apple, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOBILE_APP_CONFIG } from "@/lib/constants";

export function MobileAppsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border-2 border-warning/20">
              <Bell className="h-4 w-4 text-warning" strokeWidth={3} />
              <span className="text-xs font-black uppercase tracking-wide text-warning">
                Coming Soon
              </span>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
                Your Finances,
                <br />
                <span className="text-primary">In Your Pocket</span>
              </h2>
              <p className="text-lg md:text-xl font-bold text-muted-foreground">
                Nalo Finance mobile apps are coming to iOS and Android. Manage your money on the go with native apps built for speed and simplicity.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  title: "Native iOS & Android Apps",
                  description: "Built with Swift and Kotlin for maximum performance",
                },
                {
                  title: "Offline Mode",
                  description: "Track expenses and view reports without internet",
                },
                {
                  title: "Push Notifications",
                  description: "Get alerts for Ajo payments, budget limits, and tax deadlines",
                },
                {
                  title: "Biometric Security",
                  description: "Face ID and fingerprint login for instant access",
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                    <span className="font-black text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-sm mb-1">{feature.title}</h3>
                    <p className="text-sm font-bold text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Waitlist CTA */}
            <div className="p-6 bg-primary/5 border-l-4 border-primary">
              <p className="text-sm font-black uppercase mb-2">Be the First to Know</p>
              <p className="text-sm font-bold text-muted-foreground mb-4">
                Join the waitlist and get early access when we launch. Plus, get 3 months of Premium free!
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border-2 border-border bg-background text-sm font-bold focus:outline-none focus:border-primary"
                />
                <Button className="font-black uppercase text-sm px-6 whitespace-nowrap">
                  Join Waitlist
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - App Preview */}
          <div className="relative">
            {/* Phone Mockup Container */}
            <div className="relative max-w-sm mx-auto">
              {/* Background Decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 border-4 border-primary/20" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-success/10 border-4 border-success/20" />

              {/* Phone Frame */}
              <div className="relative bg-card border-4 border-border shadow-2xl p-6 space-y-6">
                {/* App Stores Coming Soon */}
                <div className="space-y-4">
                  {/* iOS */}
                  <div className="p-4 bg-muted/50 border-2 border-border flex items-center gap-4">
                    <div className="w-12 h-12 bg-foreground border-2 border-border flex items-center justify-center">
                      <Apple className="h-7 w-7 text-background" strokeWidth={3} fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Download on</p>
                      <p className="text-base font-black uppercase">App Store</p>
                    </div>
                    <div className="px-3 py-1 bg-warning/10 border-2 border-warning/20">
                      <span className="text-xs font-black uppercase text-warning">Soon</span>
                    </div>
                  </div>

                  {/* Android */}
                  <div className="p-4 bg-muted/50 border-2 border-border flex items-center gap-4">
                    <div className="w-12 h-12 bg-success border-2 border-border flex items-center justify-center">
                      <Download className="h-7 w-7 text-success-foreground" strokeWidth={3} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Get it on</p>
                      <p className="text-base font-black uppercase">Google Play</p>
                    </div>
                    <div className="px-3 py-1 bg-warning/10 border-2 border-warning/20">
                      <span className="text-xs font-black uppercase text-warning">Soon</span>
                    </div>
                  </div>
                </div>

                {/* App Screenshot Placeholder */}
                <div className="bg-primary/5 border-2 border-primary/20 p-8 text-center">
                  <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" strokeWidth={3} />
                  <p className="text-sm font-black uppercase mb-2">Mobile Apps in Development</p>
                  <p className="text-xs font-bold text-muted-foreground">
                    Full feature parity with web app
                  </p>
                </div>

                {/* Launch Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Beta Testing</span>
                    <span className="text-xs font-black text-success uppercase">In Progress</span>
                  </div>
                  <div className="h-2 bg-muted border-2 border-border">
                    <div className="h-full bg-success" style={{ width: "75%" }} />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground text-center">
                    Expected launch: {MOBILE_APP_CONFIG.launchDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beta Tester Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center p-6 bg-background border-2 border-border">
            <p className="text-3xl md:text-4xl font-black text-primary">{MOBILE_APP_CONFIG.betaTesters}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase mt-2">Beta Testers</p>
          </div>
          <div className="text-center p-6 bg-background border-2 border-border">
            <p className="text-3xl md:text-4xl font-black text-primary">{MOBILE_APP_CONFIG.betaRating}★</p>
            <p className="text-xs font-bold text-muted-foreground uppercase mt-2">Beta Rating</p>
          </div>
          <div className="text-center p-6 bg-background border-2 border-border">
            <p className="text-3xl md:text-4xl font-black text-primary">{MOBILE_APP_CONFIG.platforms}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase mt-2">Both Platforms</p>
          </div>
          <div className="text-center p-6 bg-background border-2 border-border">
            <p className="text-3xl md:text-4xl font-black text-primary">{MOBILE_APP_CONFIG.launchDate}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase mt-2">Launch Date</p>
          </div>
        </div>
      </div>
    </section>
  );
}
