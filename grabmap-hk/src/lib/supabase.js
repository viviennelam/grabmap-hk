import { createClient } from '@supabase/supabase-js'

// These are placeholder values - replace with your actual Supabase project details
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database queries
export const machinesService = {
  // Get all machines
  async getAllMachines() {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get machine by ID
  async getMachineById(id) {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}

export const winsService = {
  // Get wins for a specific machine
  async getWinsByMachine(machineId) {
    const { data, error } = await supabase
      .from('user_wins')
      .select('*')
      .eq('machine_id', machineId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add a new win
  async addWin(winData) {
    const { data, error } = await supabase
      .from('user_wins')
      .insert([winData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Convert photo to base64 and return data URL
  async uploadPhoto(file, fileName) {
    try {
      console.log('Converting photo to base64:', fileName, 'File size:', file.size)
      
      // Convert file to base64 data URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        
        reader.onload = () => {
          const base64DataUrl = reader.result
          console.log('Photo converted successfully, size:', base64DataUrl.length)
          resolve(base64DataUrl)
        }
        
        reader.onerror = () => {
          console.error('Failed to read file')
          reject(new Error('Failed to read photo file'))
        }
        
        reader.readAsDataURL(file)
      })
      
    } catch (error) {
      console.error('Photo conversion failed:', error)
      throw new Error(`Photo processing failed: ${error.message}`)
    }
  }
}