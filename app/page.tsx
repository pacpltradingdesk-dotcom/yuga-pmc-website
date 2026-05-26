import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BusinessLineCards from "@/components/BusinessLineCards";
import About from "@/components/About";
import Products from "@/components/Products";
import Technology from "@/components/Technology";
import WhyNowStrip from "@/components/WhyNowStrip";
import Sustainability from "@/components/Sustainability";
import CapacityCalculator from "@/components/CapacityCalculator";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
import CredentialsBar from "@/components/CredentialsBar";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <BusinessLineCards />
        <About />
        <Products />
        <Technology />
        <WhyNowStrip />
        <Sustainability />
        <CapacityCalculator />
        <CaseStudies />
        <WhyUs />
        <CredentialsBar />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
