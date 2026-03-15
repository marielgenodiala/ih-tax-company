import Header from "@/components/layout/Header";
import { HeroHome } from "@/components/sections/hero";
import LogoCloud from "@/components/sections/logoCloud";
import Stats from "@/components/sections/stats";
import WhatYouNeed from "@/components/sections/whatYouNeed";
import Services from "@/components/sections/services";
import StatementBanner from "@/components/sections/statementBanner";
import About from "@/components/sections/about";
import CtaBanner from "@/components/sections/ctaBanner";
import BlogPreview from "@/components/sections/blogPreview";
import OpeningHours from "@/components/sections/openingHours";
import ContactForm from "@/components/sections/contactForm";
import Footer from "@/components/layout/Footer";

export default function StaticHomePage() {
  return (
    <>
      <Header />
      <HeroHome />
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
      <Footer />
    </>
  );
}
