import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
function TopBar() {
  return (
    <div>
      <nav className="topbar">
        <Link href="/" className="flex items-center gap-4">
          <Image alt="my logo" src="/assets/logo.svg" width={28} height={28} />
          <p className="text-heading3-bold text-light-1 max-xs:hidden">
            Threads
          </p>
        </Link>

        <div className="flex items-center gap-1">
          <div className="block md:hidden">
            <SignedIn>
              {" "}
              {/*checks if the user is signed in or not */}
              <SignOutButton>
                {/*if signed in, then it shows the signOutButton */}
                <div className="flex cursor-pointer">
                  <Image
                    alt="logout"
                    src="/assets/logout.svg"
                    width={24}
                    height={24}
                  />
                </div>
              </SignOutButton>
            </SignedIn>
          </div>
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: { organizationSwitcherTrigger: "py-2 px-4" },
            }}
          />
        </div>
      </nav>
    </div>
  );
}

export default TopBar;
