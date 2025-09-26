import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, Clock, Gift } from 'lucide-react'
import { machinesService, winsService } from '../lib/supabase'
import { demoMachines } from '../data/demoMachines'
import WinsList from '../components/WinsList'
import ShareWinForm from '../components/ShareWinForm'

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
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-gray-600">Loading machine details...</p>
        </div>
      </div>
    )
  }

  if (!machine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😵</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Machine not found</h2>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-arcade-pink hover:text-arcade-pink/80 transition-colors duration-200"
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
            <div className="card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={machine.photo_url} 
                    alt={machine.name_en}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{machine.name_en}</h1>
                    <p className="text-xl text-gray-600">{machine.name_zh}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-arcade-yellow/20 text-arcade-yellow px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-semibold">{machine.fairness_rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">Fairness Rating</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-2 text-arcade-blue" />
                      <div>
                        <p className="font-medium">{machine.district}</p>
                        <p className="text-sm text-gray-500">{machine.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-arcade-purple" />
                      <span className="text-sm">
                        Added {new Date(machine.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Prizes */}
            <div className="card p-6">
              <h2 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-arcade-orange" />
                Available Prizes
              </h2>
              <div className="flex flex-wrap gap-2">
                {machine.prizes_array.map((prize, index) => (
                  <span 
                    key={index}
                    className="bg-arcade-purple/20 text-arcade-purple px-3 py-2 rounded-full font-medium"
                  >
                    🎁 {prize}
                  </span>
                ))}
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