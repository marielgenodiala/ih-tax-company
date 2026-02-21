import RevealWrapper from "@/components/ui/RevealWrapper";

export default function StatementBanner() {
  return (
    <section
      className="statement"
      style={{ backgroundImage: "url('/images/meetingRoomChairImage.avif')" }}
    >
      <div className="container">
        <RevealWrapper>
          <p className="statement__text">
            I H Professionals &amp; Co Pty Ltd provides{" "}
            <em>unparalleled personalised accounting services</em> to a broad range
            of clients across Australia. As your certified accountants, we ensure all
            of your financial decisions are made carefully and with your{" "}
            <em>best interests</em> in mind.
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
