import Link from "next/link";
import PillNav from "./PillNav.server";

const Layout = ({ children, activeRoute }) => {
  return (
    <div className="px-6 pt-12 pb-28 antialiased font-sans text-base leading-normal lg:px-28 lg:pt-28 lg:pb-60">
      <div className="mx-auto grid max-w-7xl gap-12 lg:gap-28">
        <header className="flex items-center gap-8">
          <span className="text-4xl">
            <Link href="/">
              <a>🐔</a>
            </Link>
          </span>
          <PillNav>
            <PillNav.Item activeRoute={activeRoute} href="/">
              All
            </PillNav.Item>
            <PillNav.Item activeRoute={activeRoute} href="/saved">
              Saved
            </PillNav.Item>
          </PillNav>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
