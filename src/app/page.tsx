import HeroSection from "./components/home/HeroSection";
import QuotesSection from "./components/home/QuotesSection";
import IntroductionSection from "./components/home/IntroductionSection";
import PrinciplesSection from "./components/home/PrinciplesSection";

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
