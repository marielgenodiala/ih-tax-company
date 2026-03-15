import NavDefault from "./NavDefault";
import NavSticky from "./NavSticky";
import type { NavDefaultProps } from "./NavDefault";
import type { NavStickyProps } from "./NavSticky";

export type NavLayout = "default" | "sticky";

export interface NavSectionProps extends NavDefaultProps {
  _type: string;
  layout?: NavLayout;
  [key: string]: unknown;
}

/**
 * Renders the appropriate nav layout. Add new layouts here and in Sanity when needed.
 * - layout "default" → hamburger + slide-in panel
 * - layout "sticky" → desktop dropdowns + optional top bar
 */
export default function NavSection(props: NavSectionProps) {
  const { layout = "default", ...rest } = props;

  if (layout === "sticky") {
    return (
      <NavSticky
        logo={rest.logo as string | undefined}
        logoLine1={rest.logoLine1 as string | undefined}
        showTopBar={rest.showTopBar as boolean | undefined}
        topBarLeftLinks={rest.topBarLeftLinks as NavStickyProps["topBarLeftLinks"]}
        topBarRightLinks={rest.topBarRightLinks as NavStickyProps["topBarRightLinks"]}
        navItems={rest.navItems as NavStickyProps["navItems"]}
      />
    );
  }

  return (
    <NavDefault
      logo={rest.logo as string}
      logoText={rest.logoText as string}
      navLinks={rest.navLinks as NavDefaultProps["navLinks"]}
    />
  );
}

export { NavDefault, NavSticky };
