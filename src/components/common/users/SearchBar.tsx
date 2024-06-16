import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  pathname: string;
  searchQuery: string;
  handleSearch: (evt: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ pathname, searchQuery, handleSearch }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  return (
    <div className="relative flex items-center z-30">
      {pathname === "/courses" ? (
        <input
          type="text"
          ref={searchInputRef}
          defaultValue={searchQuery || ""}
          onChange={handleSearch}
          className={`transition-all duration-300 ease-in-out p-3 rounded-full focus:outline-none placeholder:text-violet-800 dark:placeholder:text-violet-200 ${
            searchExpanded ? "w-72" : "w-36"
          } bg-violet-100 dark:bg-gray-800`}
          placeholder="Search"
          onFocus={() => setSearchExpanded(true)}
        />
      ) : (
        <form action="" onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            ref={searchInputRef}
            className={`transition-all duration-300 ease-in-out p-3 rounded-full focus:outline-none placeholder:text-violet-800 dark:placeholder:text-violet-200 ${
              searchExpanded ? "w-72" : "w-36"
            } bg-violet-100 dark:bg-gray-800`}
            placeholder="Search"
            onFocus={() => setSearchExpanded(true)}
          />
        </form>
      )}
      <SearchIcon className="absolute right-3 text-violet-700 dark:text-white" />
    </div>
  );
};

export default SearchBar;
