"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { normalizeHref } from "@/lib/normalizeHref";
import { EmailIcon, PhoneIcon } from "@/lib/icons";

export interface TopBarLink {
  label: string;
  href: string;
}

export interface NavDropdownChild {
  label: string;
  href: string;
  desc?: string;
}

export interface NavItemSticky {
  label: string;
  href?: string;
  highlight?: boolean;
  children?: NavDropdownChild[];
  /** When true, show the Services link inside this item's dropdown (only applies when item has children). */
  showServicesLinkInDropdown?: boolean;
  /** Label for the Services link (e.g. "Our Services"). Used when showServicesLinkInDropdown is true. */
  servicesLinkLabel?: string;
  /** URL for the Services link. Used when showServicesLinkInDropdown is true. */
  servicesLinkUrl?: string;
}

export interface NavStickyProps {
  logo?: string;
  logoLine1?: string;
  showTopBar?: boolean;
  topBarLeftLinks?: TopBarLink[];
  topBarRightLinks?: TopBarLink[];
  navItems?: NavItemSticky[];
}

const defaultNavItems: NavItemSticky[] = [
  { label: "About Us", href: "/#about" },
  { label: "Contact Us", href: "/#contact", highlight: true },
];

function DropdownMenu({
  item,
  isOpen,
  onToggle,
  isMobile,
  servicesLink,
}: {
  item: NavItemSticky;
  isOpen: boolean;
  onToggle: (label: string | null) => void;
  isMobile: boolean;
  servicesLink?: { label: string; url: string } | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Desktop only: capture-phase doc listener breaks mobile accordion toggle on some devices. */
    if (isMobile) return;
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle(null);
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick, true);
    }
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, [isOpen, onToggle, isMobile]);

  const children = item.children ?? [];

  return (
    <div ref={ref} className="nav-sticky__dropdown-wrap">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(isOpen ? null : item.label);
        }}
        className="nav-sticky__dropdown-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <span
          className="nav-sticky__dropdown-chevron"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {isOpen && children.length > 0 && (
        <div
          className={`nav-sticky__dropdown-panel ${isMobile ? "nav-sticky__dropdown-panel--mobile" : ""}`}
          role="menu"
        >
          {children.map((child) => (
            <Link
              key={child.label}
              href={normalizeHref(child.href)}
              className="nav-sticky__dropdown-item"
              role="menuitem"
            >
              <span className="nav-sticky__dropdown-item-label">
                {child.label}
              </span>
              {child.desc && (
                <span className="nav-sticky__dropdown-item-desc">
                  {child.desc}
                </span>
              )}
            </Link>
          ))}
          {servicesLink && (
            <Link
              href={normalizeHref(servicesLink.url)}
              className="nav-sticky__dropdown-item nav-sticky__dropdown-services-link"
              role="menuitem"
            >
              <span className="nav-sticky__dropdown-item-label">
                {servicesLink.label} →
              </span>
            </Link>
          )}
          {item.href && (
            <div className="nav-sticky__dropdown-footer">
              <Link
                href={normalizeHref(item.href)}
                className="nav-sticky__dropdown-view-all"
              >
                View All {item.label} Services →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function NavSticky({
  logo,
  logoLine1 = "I H Professionals & Co.",
  showTopBar = true,
  topBarLeftLinks,
  topBarRightLinks,
  navItems = defaultNavItems,
}: NavStickyProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* Update scrolled appearance via DOM (no setState) to avoid blink on load/scroll */
  useLayoutEffect(() => {
    let rafId: number | null = null;
    let lastScrolled: boolean | null = null;
    const updateScrolled = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const isScrolled = window.scrollY > 40;
      if (lastScrolled === isScrolled) return;
      lastScrolled = isScrolled;
      el.setAttribute("data-scrolled", isScrolled ? "true" : "false");
      el.querySelector("nav")?.classList.toggle("nav-sticky--scrolled", isScrolled);
      const cta = el.querySelector(".nav-sticky__cta");
      if (cta) {
        cta.classList.toggle("btn--primary", isScrolled);
        cta.classList.toggle("btn--white", !isScrolled);
      }
    };
    const onScroll = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateScrolled();
        rafId = null;
      });
    };
    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--nav-sticky-height",
        `${el.offsetHeight}px`,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const items = navItems?.length ? navItems : defaultNavItems;
  const leftLinks = topBarLeftLinks ?? [
    {
      label: "info@ihprofessionals.com.au",
      href: "mailto:info@ihprofessionals.com.au",
    },
    { label: "+61 2 9000 0000", href: "tel:+61290000000" },
  ];
  const rightLinks = topBarRightLinks ?? [
    { label: "Insights", href: "/blogs" },
    { label: "Book Online", href: "/book-online" },
  ];

  return (
    <div ref={wrapperRef} className="nav-sticky__wrapper">
      {showTopBar && (
        <div className="nav-sticky__topbar">
          <div className="nav-sticky__topbar-inner">
            <div className="nav-sticky__topbar-left">
              {leftLinks.map((link) => {
                const isMailto = link.href.startsWith("mailto:");
                const isTel = link.href.startsWith("tel:");
                const href =
                  isMailto || isTel ? link.href : normalizeHref(link.href);
                return (
                  <a
                    key={link.href}
                    href={href}
                    className="nav-sticky__topbar-link"
                  >
                    {isMailto && (
                      <span className="nav-sticky__topbar-icon" aria-hidden>
                        <EmailIcon />
                      </span>
                    )}
                    {isTel && (
                      <span className="nav-sticky__topbar-icon" aria-hidden>
                        <PhoneIcon />
                      </span>
                    )}
                    {link.label}
                  </a>
                );
              })}
            </div>
            <div className="nav-sticky__topbar-right">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={normalizeHref(link.href)}
                  className="nav-sticky__topbar-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <nav className="nav-sticky">
        <div className="nav-sticky__inner">
          <Link href="/" className="nav-sticky__logo">
            {logo ? (
              <Image
                src={logo}
                alt={logoLine1 ? `${logoLine1} logo` : "Site logo"}
                width={48}
                height={48}
                className="nav-sticky__logo-img"
              />
            ) : (
              <div className="nav-sticky__logo-box">IH</div>
            )}
            {logoLine1 && (
              <span className="nav-sticky__logo-line1">{logoLine1}</span>
            )}
          </Link>

          {/* Desktop nav */}
          <div className="nav-sticky__desktop">
            {items.map((item) =>
              item.children?.length ? (
                <DropdownMenu
                  key={item.label}
                  item={item}
                  isOpen={openMenu === item.label}
                  onToggle={setOpenMenu}
                  isMobile={false}
                  servicesLink={
                    item.showServicesLinkInDropdown
                      ? {
                          label: item.servicesLinkLabel ?? "Our Services",
                          url: item.servicesLinkUrl ?? "/#services",
                        }
                      : null
                  }
                />
              ) : item.highlight ? (
                <Link
                  key={item.label}
                  href={normalizeHref(item.href ?? "#")}
                  className="btn btn--arrow nav-sticky__cta btn--white"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={normalizeHref(item.href ?? "#")}
                  className="nav-sticky__link"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`nav-sticky__toggle${mobileOpen ? " nav-sticky__toggle--active" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={`nav-sticky__mobile-backdrop${mobileOpen ? " nav-sticky__mobile-backdrop--open" : ""}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
        <div
          className={`nav-sticky__mobile${mobileOpen ? " nav-sticky__mobile--open" : ""}`}
          aria-label="Main navigation"
        >
          <button
            type="button"
            className="nav-sticky__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="nav-sticky__mobile-body">
            {/* Order: non-highlight items → right links → highlight CTA (same format/spacing for md & mobile) */}
            {items
              .filter((item) => !item.highlight)
              .map((item) =>
                item.children?.length ? (
                  <DropdownMenu
                    key={item.label}
                    item={item}
                    isOpen={openMenu === item.label}
                    onToggle={setOpenMenu}
                    isMobile
                    servicesLink={
                      item.showServicesLinkInDropdown
                        ? {
                            label: item.servicesLinkLabel ?? "Our Services",
                            url: item.servicesLinkUrl ?? "/#services",
                          }
                        : null
                    }
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={normalizeHref(item.href ?? "#")}
                    className="nav-sticky__mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={normalizeHref(link.href)}
                className="nav-sticky__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {items
              .filter((item) => item.highlight)
              .map((item) => (
                <Link
                  key={item.label}
                  href={normalizeHref(item.href ?? "#")}
                  className="btn btn--primary btn--arrow nav-sticky__mobile-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
          </div>
          <p className="nav-sticky__mobile-copy">
            © {new Date().getFullYear()} I H Professionals &amp; Co. Pty Ltd. All
            rights reserved.
          </p>
        </div>
      </nav>
    </div>
  );
}
