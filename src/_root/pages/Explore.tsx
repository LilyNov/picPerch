import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-off-white">
          <img src="/assets/icons/search.svg" alt="search" />
          <Input
            type="text"
            placeholder="Search..."
            className="explore-search"
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular today</h3>

          <div className="flex-center gap-3 bg-off-white rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-3">All</p>
            <img src="/assets/icons/filter.svg" alt="filter" />
          </div>
        </div>

        <div className="flex flex-wrap gap-9 max-w-5xl"></div>
      </div>
    </div>
  );
};
