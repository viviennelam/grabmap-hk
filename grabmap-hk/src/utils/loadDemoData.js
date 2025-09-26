import { supabase } from '../lib/supabase'
import { demoMachines } from '../data/demoMachines'

// Function to load demo machines into Supabase
export async function loadDemoMachines() {
  try {
    console.log('Loading demo machines into Supabase...')
    
    // Check if machines already exist
    const { data: existingMachines } = await supabase
      .from('machines')
      .select('id')
      .limit(1)
    
    if (existingMachines && existingMachines.length > 0) {
      console.log('Demo machines already loaded!')
      return
    }
    
    // Insert demo machines
    const { data, error } = await supabase
      .from('machines')
      .insert(demoMachines)
    
    if (error) {
      throw error
    }
    
    console.log('Demo machines loaded successfully!', data)
    return data
    
  } catch (error) {
    console.error('Error loading demo machines:', error)
    throw error
  }
}

// Function to create storage bucket for win photos
export async function setupStorage() {
  try {
    console.log('Setting up storage bucket...')
    
    // Create bucket for win photos
    const { data, error } = await supabase.storage
      .createBucket('win-photos', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      })
    
    if (error && error.message !== 'Bucket already exists') {
      throw error
    }
    
    console.log('Storage bucket ready!')
    return data
    
  } catch (error) {
    console.error('Error setting up storage:', error)
    throw error
  }
}

// Run both setup functions
export async function initializeApp() {
  try {
    await setupStorage()
    await loadDemoMachines()
    console.log('App initialization complete!')
  } catch (error) {
    console.error('App initialization failed:', error)
  }
}