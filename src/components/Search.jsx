import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <SearchIcon className="text-[var(--color-text-3)]" size={15} strokeWidth={1.5} />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Suchen..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-border-hover)] focus:outline-none transition-colors"
            />
        </div>
    );
};

export default Search;
