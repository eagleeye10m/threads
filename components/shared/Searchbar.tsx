"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";

interface Props {
  routeType: string;
  setLoading: (loading: boolean) => void;
}

function Searchbar({ routeType, setLoading }: Props) {
  const router = useRouter();
  const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounce) {
      clearTimeout(debounce);
    }

    setDebounce(
      setTimeout(() => {
        setLoading(true);
        if (value) {
          router.push(`/${routeType}?q=` + value);
        } else {
          router.push(`/${routeType}`);
        }
      }, 500)
    );
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
