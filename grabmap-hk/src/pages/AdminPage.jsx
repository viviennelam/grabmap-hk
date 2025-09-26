import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Database, Upload } from 'lucide-react'
import { initializeApp, loadDemoMachines, setupStorage } from '../utils/loadDemoData'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInitialize = async () => {
    setLoading(true)
    setMessage('Initializing app...')
    
    try {
      await initializeApp()
      setMessage('✅ App initialized successfully! Demo machines loaded and storage bucket created.')
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMachines = async () => {
    setLoading(true)
    setMessage('Loading demo machines...')
    
    try {
      await loadDemoMachines()
      setMessage('✅ Demo machines loaded successfully!')
    } catch (error) {
      setMessage(`❌ Error loading machines: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSetupStorage = async () => {
    setLoading(true)
    setMessage('Setting up storage bucket...')
    
    try {
      await setupStorage()
      setMessage('✅ Storage bucket created successfully!')
    } catch (error) {
      setMessage(`❌ Error setting up storage: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-arcade-pink hover:text-arcade-pink/80 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              🔧 Admin Panel
            </h1>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Use these tools to set up your Supabase database with demo data.
                </p>
              </div>

              {/* Initialize Everything */}
              <div className="space-y-3">
                <button
                  onClick={handleInitialize}
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Database className="w-5 h-5" />
                  <span>{loading ? 'Initializing...' : 'Initialize Everything'}</span>
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Sets up storage bucket and loads all 18 demo machines
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-4">Individual Actions:</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={handleLoadMachines}
                    disabled={loading}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Load Demo Machines Only</span>
                  </button>

                  <button
                    onClick={handleSetupStorage}
                    disabled={loading}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Database className="w-5 h-5" />
                    <span>Setup Storage Bucket Only</span>
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {message && (
                <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{message}</p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Setup Instructions:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Make sure your Supabase tables are created (machines, user_wins)</li>
                  <li>Click "Initialize Everything" to set up storage and load demo data</li>
                  <li>Go back to home page to see your machines!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}