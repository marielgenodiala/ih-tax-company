import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, LinkedInIcon } from "@/lib/icons";

interface FooterProps {
  variant?: "home" | "inner";
}

export default function Footer({ variant = "inner" }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__logo">
              <Image
                src="/images/brandlogo-new.png"
                alt="IH Professionals logo"
                width={32}
                height={32}
                style={{ height: "32px", width: "auto" }}
              />
            </div>
            <h4 className="footer__heading">I H Professionals &amp; Co.</h4>
            <p>
              A registered tax agent firm providing taxation and general accounting
              services for individuals and businesses across Australia.
            </p>
            <div className="footer__socials">
              <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/book-online">Book Online</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <ul className="footer__links">
              <li><Link href="/book-online">Tax Accounting</Link></li>
              <li><Link href="/book-online">Management Accounting</Link></li>
              <li><Link href="/book-online">Auditing</Link></li>
              {variant === "home" && (
                <>
                  <li><Link href="/book-online">BAS &amp; IAS Lodgement</Link></li>
                  <li><Link href="/book-online">Bookkeeping</Link></li>
                </>
              )}
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Newsletter</h4>
            <p>Get the latest tax tips and updates delivered to your inbox.</p>
            <form className="footer__newsletter" action="https://formsubmit.co/marielgenodiala.work@gmail.com" method="POST">
              <input type="hidden" name="_next" value="/thank-you" />
              <input type="hidden" name="_subject" value="New Newsletter Subscription — IH Professionals" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="email" name="email" placeholder="Email address" className="form__input" required />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 I H Professionals &amp; Co. Pty Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
