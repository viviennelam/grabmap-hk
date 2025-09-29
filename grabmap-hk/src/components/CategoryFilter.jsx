import { prizeCategories } from '../data/demoMachines'

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-max px-4 md:px-0 md:justify-center">
        {prizeCategories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`category-chip font-sans ${
              selectedCategory === category.key ? 'category-chip-active' : ''
            }`}
          >
            <span>{category.label_en}</span>
          </button>
        ))}
      </div>
    </div>
  )
}