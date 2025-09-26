import { Search } from 'lucide-react'
import { prizeCategories } from '../data/demoMachines'

export default function SearchBar({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="search-bar">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search machines..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {prizeCategories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.key
                ? 'bg-arcade-pink text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-arcade-pink/10 hover:text-arcade-pink'
            }`}
          >
            <span>{category.emoji}</span>
            <span>{category.label_en}</span>
          </button>
        ))}
      </div>
    </div>
  )
}