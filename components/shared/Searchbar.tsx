"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
interface Props {
  routeType: string;
}
function Searchbar({ routeType }: Props) {
  const router = useRouter();

  console.log("re-render");
  let debounce: NodeJS.Timeout;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounce) {
      clearTimeout(debounce);
    }

    debounce = setTimeout(() => {
      if (value) {
        router.push(`/${routeType}?q=` + value);
      } else {
        router.push(`/${routeType}`);
      }
    }, 500); // Adjust the delay as needed (0.3 seconds in this case)
  };

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        onChange={handleChange}
        placeholder={`${
          routeType !== "search" ? "Search communities" : "Search creators"
        }`}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
