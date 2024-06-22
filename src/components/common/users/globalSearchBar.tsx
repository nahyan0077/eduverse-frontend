import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

const GlobalSearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch(searchQuery);
    setSearchQuery("")
  };

  return (
    <form
      className="relative flex items-center z-30"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        ref={searchInputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`transition-all duration-300 ease-in-out p-3 rounded-full focus:outline-none placeholder:text-violet-800 dark:placeholder:text-violet-200 ${
          searchExpanded ? "w-72" : "w-36"
        } bg-violet-100 dark:bg-gray-800`}
        placeholder="Search"
        onFocus={() => setSearchExpanded(true)}
      />
      <SearchIcon className="absolute right-3 text-violet-700 dark:text-white" />
    </form>
  );
};

export default GlobalSearchBar;
