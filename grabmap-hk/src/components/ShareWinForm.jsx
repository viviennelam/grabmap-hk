import { useState } from 'react'
import { Camera, Trophy, User, MessageCircle } from 'lucide-react'
import { winsService } from '../lib/supabase'

export default function ShareWinForm({ machineId, onWinSubmitted }) {
  const [formData, setFormData] = useState({
    prize: '',
    user_name: '',
    comment: '',
    photo: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setPhotoPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.prize.trim()) {
      alert('Please enter the prize you won!')
      return
    }

    setIsSubmitting(true)
    
    try {
      let photoUrl = null
      
      // Upload photo if provided
      if (formData.photo) {
        try {
          const fileName = `win-${Date.now()}-${formData.photo.name}`
          photoUrl = await winsService.uploadPhoto(formData.photo, fileName)
        } catch (photoError) {
          console.error('Photo upload failed:', photoError)
          // Continue without photo if upload fails
        }
      }
      
      // Prepare win data
      const winData = {
        machine_id: machineId,
        prize: formData.prize.trim(),
        user_name: formData.user_name.trim() || null,
        comment: formData.comment.trim() || null,
        photo_url: photoUrl,
        created_at: new Date().toISOString()
      }
      
      // Submit to Supabase
      const newWin = await winsService.addWin(winData)
      
      // Call parent callback
      onWinSubmitted(newWin)
      
      // Reset form
      setFormData({
        prize: '',
        user_name: '',
        comment: '',
        photo: null
      })
      setPhotoPreview(null)
      
      alert('Win shared successfully! 🎉')
      
    } catch (error) {
      console.error('Error submitting win:', error)
      alert('Failed to share win. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-arcade-yellow" />
        Share Your Win! 🎉
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prize Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prize Won *
          </label>
          <input
            type="text"
            name="prize"
            value={formData.prize}
            onChange={handleInputChange}
            placeholder="e.g., Kirby plushie, Hello Kitty keychain..."
            className="input-field"
            required
          />
        </div>
        
        {/* User Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <User className="w-4 h-4 mr-1" />
            Your Name (optional)
          </label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            placeholder="Leave blank to stay anonymous"
            className="input-field"
          />
        </div>
        
        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            Comment (optional)
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Share your experience, tips, or excitement!"
            rows={3}
            className="input-field resize-none"
          />
        </div>
        
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Camera className="w-4 h-4 mr-1" />
            Photo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200 block"
          >
            {photoPreview ? (
              <div className="space-y-2">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
                <p className="text-sm text-gray-600">Click to change photo</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Camera className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">Click to add photo</p>
              </div>
            )}
          </label>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sharing...' : 'Share My Win! 🎉'}
        </button>
      </form>
    </div>
  )
}