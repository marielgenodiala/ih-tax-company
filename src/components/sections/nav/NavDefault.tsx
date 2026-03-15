"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { normalizeHref } from "@/lib/normalizeHref";

export interface NavLink {
  href: string;
  label: string;
  exact?: boolean;
  noActive?: boolean;
}

const defaultNavLinks: NavLink[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/team", label: "Team", exact: false },
  { href: "/book-online", label: "Book Online", exact: false },
  { href: "/blogs", label: "Blogs", exact: false },
  { href: "/#contact", label: "Contact", exact: true, noActive: true },
];

export interface NavDefaultProps {
  logo?: string;
  logoText?: string;
  navLinks?: NavLink[];
}

export default function NavDefault({ logo, logoText, navLinks }: NavDefaultProps) {
  const links = navLinks?.length ? navLinks : defaultNavLinks;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
            src={logo || "/images/brandlogo-new.png"}
            alt="IH Professionals logo"
            width={36}
            height={36}
          />
          {logoText || "I H Professionals & Co."}
        </Link>

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

        <div
          className={`header__backdrop${menuOpen ? " header__backdrop--visible" : ""}`}
          onClick={() => setMenuOpen(false)}
        />

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
          {links.map((link, index) => {
            const href = normalizeHref(link.href);
            const isLast = index === links.length - 1;
            let isActive = false;
            if (link.noActive) {
              isActive = false;
            } else if (link.exact) {
              isActive = pathname === href;
            } else {
              isActive = pathname.startsWith(href);
            }
            return (
              <Link
                key={link.href}
                href={href}
                className={
                  isLast
                    ? "btn btn--primary btn btn--arrow"
                    : `header__link${isActive ? " header__link--active" : ""}`
                }
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
