import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, Clock, Gift } from 'lucide-react'
import { machinesService, winsService } from '../lib/supabase'
import { demoMachines } from '../data/demoMachines'
import WinsList from '../components/WinsList'
import ShareWinForm from '../components/ShareWinForm'

// Helper function to get emoji for prizes
function getPrizeEmoji(prize) {
  const lowerPrize = prize.toLowerCase()
  if (lowerPrize.includes('kirby')) return '⭐'
  if (lowerPrize.includes('labubu')) return '👹'
  if (lowerPrize.includes('hello kitty') || lowerPrize.includes('sanrio') || lowerPrize.includes('my melody') || lowerPrize.includes('kuromi')) return '🎀'
  if (lowerPrize.includes('pokemon') || lowerPrize.includes('pikachu')) return '⚡'
  if (lowerPrize.includes('disney') || lowerPrize.includes('mickey') || lowerPrize.includes('minnie')) return '🏰'
  if (lowerPrize.includes('totoro') || lowerPrize.includes('ghibli')) return '🌿'
  if (lowerPrize.includes('anime') || lowerPrize.includes('demon slayer') || lowerPrize.includes('naruto')) return '⚔️'
  if (lowerPrize.includes('bear') || lowerPrize.includes('teddy')) return '🧸'
  if (lowerPrize.includes('cat') || lowerPrize.includes('kitty')) return '🐱'
  if (lowerPrize.includes('unicorn')) return '🦄'
  return '🎁'
}

export default function MachineDetailPage() {
  const { id } = useParams()
  const [machine, setMachine] = useState(null)
  const [wins, setWins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch machine details
        let machineData
        try {
          machineData = await machinesService.getMachineById(id)
        } catch (err) {
          // Fallback to demo data if machine not found in Supabase
          machineData = demoMachines.find(m => m.id === id)
        }
        setMachine(machineData)

        // Fetch wins for this machine
        try {
          const winsData = await winsService.getWinsByMachine(id)
          setWins(winsData || [])
        } catch (err) {
          console.error('Error fetching wins:', err)
          setWins([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleWinSubmitted = (newWin) => {
    setWins(prev => [newWin, ...prev])
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-retro-text-secondary text-lg">Loading machine details...</p>
        </div>
      </div>
    )
  }

  if (!machine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-xl font-semibold text-retro-text mb-4">Machine not found</h2>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-retro-card border-b border-retro-hover sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-retro-pink hover:text-retro-blue transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Machines
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Machine Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Info Card */}
            <div className="retro-card p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎮</div>
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-retro-text mb-2">{machine.name_en}</h1>
                  <p className="text-xl text-retro-text-secondary mb-4">{machine.name_zh}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center bg-retro-green/20 text-retro-green px-3 py-1 rounded-lg border border-retro-green/30">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-semibold">{machine.fairness_rating}</span>
                    </div>
                    <span className="text-sm text-retro-text-secondary">Fairness Rating</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center text-retro-text">
                    <MapPin className="w-5 h-5 mr-2 text-retro-blue" />
                    <div className="text-center">
                      <p className="font-medium">{machine.district}</p>
                      <p className="text-sm text-retro-text-secondary">{machine.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center text-retro-text">
                    <Clock className="w-5 h-5 mr-2 text-retro-purple" />
                    <span className="text-sm text-retro-text-secondary">
                      Added {new Date(machine.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Prizes */}
            <div className="retro-card p-6">
              <h2 className="font-bold text-xl text-retro-text mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-retro-pink" />
                Available Prizes
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {machine.prizes_array.map((prize, index) => {
                  const prizeEmoji = getPrizeEmoji(prize)
                  const colors = ['prize-badge-pink', 'prize-badge-blue', 'prize-badge-purple', 'prize-badge-green']
                  const badgeClass = colors[index % colors.length]
                  return (
                    <span 
                      key={index}
                      className={`prize-badge ${badgeClass}`}
                    >
                      <span>{prizeEmoji}</span>
                      <span>{prize}</span>
                    </span>
                  )
                })}
              </div>
            </div>
            
            {/* Wins List */}
            <WinsList wins={wins} />
          </div>
          
          {/* Share Win Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ShareWinForm 
                machineId={machine.id} 
                onWinSubmitted={handleWinSubmitted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}