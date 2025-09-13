import BecomeDriver from "@/components/modules/home/BecomeDrive";
import Benefits from "@/components/modules/home/Benefits";
import { Faq } from "@/components/modules/home/Faq";
import Hero from "@/components/modules/home/Hero";
import Howitworks from "@/components/modules/home/Howitworks";
import Testimonials from "@/components/modules/home/Testimonials";

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <Hero />

            {/* How It Works Section */}
            <Howitworks />

            {/* Benefits Section */}
            <Benefits />

            {/* Testimonials Section */}
            <Testimonials />

            {/* Become Driver Section */}
            <BecomeDriver />

            {/* FAQ Section */}
            <Faq />
        </div>
    );
};

export default Home;