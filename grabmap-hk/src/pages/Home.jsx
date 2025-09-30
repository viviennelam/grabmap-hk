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
      <div className="relative overflow-hidden py-16 md:py-20">
        {/* Vibrant background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-retro-pink/30 via-retro-blue/20 to-retro-purple/25"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-retro-bg/60 via-retro-bg/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-retro-green/10 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-8 left-10 w-24 h-24 bg-retro-pink/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-8 right-10 w-32 h-32 bg-retro-blue/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-retro-purple/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-retro font-bold mb-4 text-retro-text drop-shadow-lg">
            GrabMap HK
          </h1>
          <p className="text-lg md:text-xl text-retro-text/95 mb-2 font-sans drop-shadow-md">
            Find the best claw machines in Hong Kong!
          </p>
          <p className="text-sm md:text-base text-retro-text/85 font-sans drop-shadow-md">
            夾公仔攻略大全
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-10">
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