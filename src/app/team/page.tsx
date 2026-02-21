import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import CtaBanner from "@/components/sections/CtaBanner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Our Team | I H Professionals & Co.",
  description:
    "Meet the team at I H Professionals & Co. — certified accounting professionals dedicated to your financial success.",
};

const team = [
  {
    name: "Iris Hao",
    role: "Partner, MTax, BCom, RTA, JP",
    image: "/images/team/Iris 3.avif",
  },
  {
    name: "Scott Pan",
    role: "Accountant",
    image: "/images/team/Scott 1.avif",
  },
  {
    name: "Natasha Crisanto",
    role: "Administrator",
    image: "/images/team/Photo 2 of me_edited.avif",
  },
];

export default function TeamPage() {
  return (
    <>
      <section
        className="page-hero"
        style={{ backgroundImage: "url('/images/coverImage.avif')" }}
      >
        <div className="container">
          <h1>Our Accounting Family</h1>
          <p>We&apos;re here to help.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealWrapper>
            <div className="team-intro">
              <span className="section-label">Meet the Team</span>
              <h2>
                The People Behind
                <br />
                <em>I H Professionals</em>
              </h2>
              <p>
                Our team of certified accounting professionals works diligently and
                collaboratively to bring you individualized attention and effective,
                timely financial management solutions. At I H Professionals &amp; Co
                Pty Ltd, we love what we do, which translates into positive client
                experiences. Schedule a consultation and see how you can benefit from
                working with us.
              </p>
            </div>
          </RevealWrapper>
          <div className="grid grid--3">
            {team.map((member, i) => (
              <RevealWrapper key={member.name} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="team-card">
                  <div className="team-card__image">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={220}
                      height={220}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__role">{member.role}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Schedule a Consultation"
        text="See how you can benefit from working with us."
        buttonText="Book Online"
        buttonHref="/book-online"
      />

      <Footer />
    </>
  );
}
