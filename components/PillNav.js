import Link from "next/link";
import { cn } from "../lib/cn";

const PillNavItem = ({ href, isActive, children }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={cn(
            "relative inline-block rounded-full px-6 py-3 text-center",
            isActive
              ? "bg-gray-100 font-semibold"
              : "bg-transparent text-gray-400"
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

export const PillNav = ({ children }) => {
  return (
    <nav>
      <ul className="wrap flex items-center gap-2 tracking-tight text-sm">
        {children}
      </ul>
    </nav>
  );
};

PillNav.Item = PillNavItem;
