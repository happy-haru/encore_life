import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import { getHomepageStats } from "@/lib/actions/stats";

export default async function Home() {
  const stats = await getHomepageStats();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection stats={stats} />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
