import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";

type NavbarProps = {
  actions?: ReactNode;
};

const Navbar = ({ actions }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          Stack
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link to="/notes" />}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground"
              >
                Notes
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">{actions}</div>
      </div>
    </header>
  );
};

export { Navbar };
