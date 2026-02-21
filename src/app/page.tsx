import Hero from "@/components/sections/Hero";
import LogoCloud from "@/components/sections/LogoCloud";
import Stats from "@/components/sections/Stats";
import WhatYouNeed from "@/components/sections/WhatYouNeed";
import Services from "@/components/sections/Services";
import StatementBanner from "@/components/sections/StatementBanner";
import About from "@/components/sections/About";
import CtaBanner from "@/components/sections/CtaBanner";
import BlogPreview from "@/components/sections/BlogPreview";
import OpeningHours from "@/components/sections/OpeningHours";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Stats />
      <WhatYouNeed />
      <Services />
      <StatementBanner />
      <About />
      <CtaBanner />
      <BlogPreview />
      <OpeningHours />
      <ContactForm />
      <Footer variant="home" />
    </>
  );
}
