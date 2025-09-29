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

  // Upload photo to storage
  async uploadPhoto(file, fileName) {
    try {
      // First, try to upload the file
      const { data, error } = await supabase.storage
        .from('win-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (error) {
        console.error('Storage upload error:', error)
        throw error
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('win-photos')
        .getPublicUrl(fileName)
      
      console.log('Photo uploaded successfully:', publicUrl)
      return publicUrl
      
    } catch (error) {
      console.error('Photo upload failed:', error)
      throw new Error(`Photo upload failed: ${error.message}`)
    }
  }
}