"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/team", label: "Team", exact: false },
  { href: "/book-online", label: "Book Online", exact: false },
  { href: "/blogs", label: "Blogs", exact: false },
  { href: "/#contact", label: "Contact", exact: true, noActive: true },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__logo">
          <Image
            src="/images/brandlogo-new.png"
            alt="IH Professionals logo"
            width={36}
            height={36}
            style={{ height: "36px", width: "auto" }}
          />
          I H Professionals &amp; Co.
        </Link>

        {/* Hamburger button */}
        <button
          type="button"
          className={`header__toggle${menuOpen ? " header__toggle--active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Backdrop overlay */}
        <div
          className={`header__backdrop${menuOpen ? " header__backdrop--visible" : ""}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in nav panel */}
        <nav
          className={`header__nav${menuOpen ? " header__nav--open" : ""}`}
          aria-label="Main navigation"
        >
          <button
            type="button"
            className="header__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          {navLinks.map((link) => {
            let isActive = false;
            if (link.noActive) {
              isActive = false;
            } else if (link.exact) {
              isActive = pathname === link.href;
            } else {
              isActive = pathname.startsWith(link.href);
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`header__link${isActive ? " header__link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
