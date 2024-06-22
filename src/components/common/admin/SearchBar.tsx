import React from 'react';

interface SearchBarProps {
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
    return (

        <div className='p-2' >
                <div className="relative w-full">
                    <input
                        type="text"
                        id="search-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        required
                        onChange={onSearchChange}
                    />
                </div>
        </div>


    );
};
