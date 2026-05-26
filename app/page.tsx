import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Products from "@/components/Products";
import Technology from "@/components/Technology";
import Sustainability from "@/components/Sustainability";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
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
        <About />
        <Products />
        <Technology />
        <Sustainability />
        <CaseStudies />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
