import { useState, useMemo, useEffect } from 'react'
import MachineCard from '../components/MachineCard'
import SearchBar from '../components/SearchBar'
import { machinesService } from '../lib/supabase'
import { demoMachines } from '../data/demoMachines'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [machines, setMachines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch machines from Supabase
  useEffect(() => {
    async function fetchMachines() {
      try {
        const data = await machinesService.getAllMachines()
        setMachines(data || [])
      } catch (err) {
        console.error('Error fetching machines:', err)
        setError('Failed to load machines')
        // Fallback to demo data if Supabase fails
        setMachines(demoMachines)
      } finally {
        setLoading(false)
      }
    }

    fetchMachines()
  }, [])

  // Filter machines based on category and search term
  const filteredMachines = useMemo(() => {
    let filtered = machines

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(machine => {
        const prizes = machine.prizes_array.join(' ').toLowerCase()
        switch (selectedCategory) {
          case 'kirby':
            return prizes.includes('kirby')
          case 'labubu':
            return prizes.includes('labubu')
          case 'sanrio':
            return prizes.includes('hello kitty') || prizes.includes('my melody') || 
                   prizes.includes('kuromi') || prizes.includes('cinnamoroll') ||
                   prizes.includes('sanrio')
          case 'pokemon':
            return prizes.includes('pokemon') || prizes.includes('pikachu') || 
                   prizes.includes('eevee') || prizes.includes('snorlax')
          case 'disney':
            return prizes.includes('disney') || prizes.includes('mickey') || 
                   prizes.includes('minnie') || prizes.includes('donald')
          default:
            return true
        }
      })
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(machine => 
        machine.name_en.toLowerCase().includes(term) ||
        machine.name_zh.includes(term) ||
        machine.district.toLowerCase().includes(term) ||
        machine.prizes_array.some(prize => prize.toLowerCase().includes(term))
      )
    }

    return filtered
  }, [selectedCategory, searchTerm])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-arcade-pink to-arcade-blue text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">🎮 GrabMap HK</h1>
          <p className="text-lg opacity-90">Find the best claw machines in Hong Kong!</p>
          <p className="text-sm opacity-75">發現香港最好的夾公仔機！</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-6">
        <SearchBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 mb-4">
        <p className="text-gray-600 text-sm">
          Found {filteredMachines.length} machine{filteredMachines.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Machine Grid */}
      <div className="container mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎮</div>
            <p className="text-gray-600">Loading machines...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">😵</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Something went wrong</h3>
            <p className="text-gray-500">{error}</p>
            <p className="text-sm text-gray-400 mt-2">Showing demo data instead</p>
          </div>
        ) : filteredMachines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No machines found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}