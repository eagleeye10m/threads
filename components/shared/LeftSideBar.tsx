"use client";
import React from "react";
import { sidebarLinks } from "../../constants/index";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

function LeftSideBar() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `/profile/${userId}`;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link ${isActive && `bg-primary-500`} `}
            >
              <Image
                alt={link.label}
                src={link.imgURL}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          {" "}
          {/*checks if the user is signed in or not */}
          <SignOutButton redirectUrl="/sign-in">
            {/*if signed in, then it shows the signOutButton */}
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                alt="logout"
                src="/assets/logout.svg"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSideBar;
