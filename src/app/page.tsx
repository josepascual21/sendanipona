import { HeroSection, QuotesSection, IntroductionSection, PrinciplesSection } from "@/components/home";

export default function Home() {
    return (
        <div className="w-full flex flex-col">
            <HeroSection />
            <QuotesSection />
            <IntroductionSection />
            <PrinciplesSection />
        </div>
    );
}
