/**
 * 🐔 "This file contains a component used to style the shell of our app. In
 *     case you missed it, this file's name ends with `.server.js`. That means
 *     it will only be rendered on the server. All of our readers on the
 *     receiving end won't have to download all the JavaScript used in this
 *     file."
 *
 * 🐔 "If it seems like I'm repeating myself, you'll need to get used to it.
 *     Copy and pasting the same bit of text is easier on my feet. Wait... do I
 *     type with my feet or my wings? Probably my feet."
 */

import Link from "next/link";

import { cn } from "../lib/cn";

/**
 * A navigation item with special styling if the item's route is currently being
 * displayed.
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
const NavItem = ({ activeRoute, href, children }) => {
  const isActive = activeRoute === href;

  return (
    <li>
      <Link href={href}>
        <a
          className={cn(
            "relative inline-block rounded-full px-6 py-3 text-center",
            isActive
              ? "bg-gray-100 font-semibold"
              : "bg-transparent text-black/30"
          )}
        >
          <span className="absolute inset-x-0 flex items-center px-6">
            <span className="capsize">{children}</span>
          </span>
          <span className="invisible block font-semibold capsize">
            {children}
          </span>
        </a>
      </Link>
    </li>
  );
};

/**
 * The shell for the app. It contains the header and global styling.
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
const Layout = ({ children, activeRoute }) => {
  return (
    <div className="px-6 pt-12 pb-28 antialiased font-sans text-base leading-normal lg:px-28 lg:pt-28 lg:pb-60">
      <div className="mx-auto grid max-w-7xl gap-12 lg:gap-28">
        <header className="flex items-center gap-8">
          <Link href="/">
            <a className="text-4xl">🐔</a>
          </Link>
          <nav>
            <ul className="wrap flex items-center gap-2 tracking-tight text-sm">
              <NavItem activeRoute={activeRoute} href="/">
                All
              </NavItem>
              <NavItem activeRoute={activeRoute} href="/saved">
                Saved
              </NavItem>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
