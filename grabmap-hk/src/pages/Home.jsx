import { useState, useMemo, useEffect } from 'react'
import MachineCard from '../components/MachineCard'
import CategoryFilter from '../components/CategoryFilter'
import { machinesService } from '../lib/supabase'
import { demoMachines } from '../data/demoMachines'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all')
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

  // Filter machines based on category
  const filteredMachines = useMemo(() => {
    if (selectedCategory === 'all') {
      return machines
    }

    return machines.filter(machine => {
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
                 prizes.includes('eevee') || prizes.includes('snorlax') ||
                 prizes.includes('charizard')
        case 'disney':
          return prizes.includes('disney') || prizes.includes('mickey') || 
                 prizes.includes('minnie') || prizes.includes('donald') ||
                 prizes.includes('goofy') || prizes.includes('woody') ||
                 prizes.includes('buzz')
        case 'other':
          return !prizes.includes('kirby') && !prizes.includes('labubu') &&
                 !prizes.includes('hello kitty') && !prizes.includes('sanrio') &&
                 !prizes.includes('pokemon') && !prizes.includes('pikachu') &&
                 !prizes.includes('disney') && !prizes.includes('mickey')
        default:
          return true
      }
    })
  }, [machines, selectedCategory])

  // Get featured machines (top rated)
  const featuredMachines = useMemo(() => {
    return [...machines]
      .sort((a, b) => b.fairness_rating - a.fairness_rating)
      .slice(0, 4)
  }, [machines])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-retro-text-secondary text-lg font-sans">Loading machines...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-retro-pink to-retro-blue py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-retro font-bold mb-4 text-retro-text">
            GrabMap HK
          </h1>
          <p className="text-lg md:text-xl text-retro-text/90 mb-2 font-sans">
            Find the best claw machines in Hong Kong!
          </p>
          <p className="text-sm md:text-base text-retro-text/75 font-sans">
            發現香港最好的夾公仔機！
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Featured Locations */}
        <section>
          <h2 className="text-2xl md:text-3xl font-retro font-bold text-retro-text mb-6">
            Featured Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} featured={true} />
            ))}
          </div>
        </section>

        {/* Browse Categories */}
        <section>
          <h2 className="text-2xl md:text-3xl font-retro font-bold text-retro-text mb-6">
            Browse Categories
          </h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          {selectedCategory !== 'all' && (
            <div className="mt-6">
              <p className="text-retro-text-secondary text-center mb-4 font-sans">
                Found {filteredMachines.length} machine{filteredMachines.length !== 1 ? 's' : ''} with {selectedCategory} prizes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMachines.map((machine) => (
                  <MachineCard key={machine.id} machine={machine} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* All Machines */}
        <section>
          <h2 className="text-2xl md:text-3xl font-retro font-bold text-retro-text mb-6">
            All Machines ({machines.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </section>

        {error && (
          <div className="text-center py-8">
            <h3 className="text-xl font-retro font-semibold text-retro-text mb-2">Connection Issue</h3>
            <p className="text-retro-text-secondary font-sans">{error}</p>
            <p className="text-sm text-retro-text-secondary mt-2 font-sans">Showing demo data instead</p>
          </div>
        )}
      </div>
    </div>
  )
}