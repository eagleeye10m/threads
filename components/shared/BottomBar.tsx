"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`bottombar_link ${isActive && `bg-primary-500`} `}
            >
              <Image
                alt={link.label}
                src={link.imgURL}
                width={24}
                height={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {link.label.split(/\s_/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
