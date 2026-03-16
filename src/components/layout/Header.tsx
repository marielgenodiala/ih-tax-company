"use client";

import NavSection from "@/components/sections/nav";
import { NavSticky } from "@/components/sections/nav";

export interface HeaderProps {
  /** When provided (e.g. from Sanity "Navigation v2"), this nav section is used. */
  navSection?: Record<string, unknown> | null;
}

export default function Header({ navSection }: HeaderProps = {}) {
  if (navSection && Object.keys(navSection).length > 0) {
    return <NavSection _type="navigationSection" {...navSection} />;
  }
  return <NavSticky />;
}
