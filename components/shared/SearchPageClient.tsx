"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import LoadingState from "@/app/(root)/search/LoadingState";

interface User {
  id: string;
  name: string;
  username: string;
  image: string;
}

interface SearchPageClientProps {
  initialResult: { users: User[]; isNext: boolean };
  routeType: string;
  userId: string;
}

function SearchPageClient({ initialResult, routeType }: SearchPageClientProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [initialResult]);
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string, 10)
    : 1;
  console.log("allaho akbar");

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType={routeType} setLoading={setLoading} />

      {loading ? (
        <LoadingState />
      ) : (
        <div className="mt-14 flex flex-col gap-9">
          {initialResult.users.length === 0 ? (
            <p className="no-result">No Result</p>
          ) : (
            initialResult.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))
          )}
        </div>
      )}

      {!loading && (
        <Pagination
          path={routeType}
          pageNumber={pageNumber}
          isNext={initialResult.isNext}
        />
      )}
    </section>
  );
}

export default SearchPageClient;
