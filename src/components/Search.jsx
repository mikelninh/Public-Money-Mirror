import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative max-w-md mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" size={20} />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for health, roads, schools..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 focus:border-[var(--color-accent-blue)] focus:ring-2 focus:ring-[var(--color-accent-blue)]/20 outline-none transition-all shadow-sm"
            />
        </div>
    );
};

export default Search;
