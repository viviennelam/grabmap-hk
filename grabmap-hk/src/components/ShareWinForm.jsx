import { useState } from 'react'
import { Camera, Trophy, User, MessageCircle, Star, RefreshCw } from 'lucide-react'
import { winsService } from '../lib/supabase'

const prizeCategories = [
  'Kirby',
  'Labubu',
  'Sanrio',
  'Pokemon',
  'Disney',
  'Anime',
  'Plushies',
  'Keychains',
  'Other'
]

export default function ShareWinForm({ machineId, onWinSubmitted }) {
  const [formData, setFormData] = useState({
    prize: '',
    prize_category: '',
    user_name: '',
    comment: '',
    rating: 3,
    photo: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')

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
          setUploadStatus('Uploading photo...')
          const fileName = `win-${Date.now()}-${Math.random().toString(36).substring(7)}.${formData.photo.name.split('.').pop()}`
          console.log('Uploading photo:', fileName)
          photoUrl = await winsService.uploadPhoto(formData.photo, fileName)
          console.log('Photo uploaded successfully:', photoUrl)
          setUploadStatus('Photo uploaded!')
        } catch (photoError) {
          console.error('Photo upload failed:', photoError)
          setUploadStatus(`Photo upload failed: ${photoError.message}`)
          // For now, let's use the preview URL as fallback for demo purposes
          photoUrl = photoPreview
        }
      }

      // Prepare win data with new fields
      const winData = {
        machine_id: machineId,
        prize: formData.prize.trim(),
        prize_category: formData.prize_category,
        user_name: formData.user_name.trim() || null,
        comment: formData.comment.trim() || null,
        rating: formData.rating,
        photo_url: photoUrl,
        created_at: new Date().toISOString()
      }

      console.log('Submitting win data:', winData)

      // Submit to Supabase
      const newWin = await winsService.addWin(winData)

      console.log('Win submitted successfully:', newWin)

      // Call parent callback
      onWinSubmitted(newWin)

      // Reset form
      setFormData({
        prize: '',
        prize_category: '',
        user_name: '',
        comment: '',
        rating: 3,
        photo: null
      })
      setPhotoPreview(null)
      setUploadStatus('')
      setShowError(false)

      // Show success message
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

    } catch (error) {
      console.error('Error submitting win:', error)
      setErrorMessage(error.message || 'Failed to share win. Please check your connection and try again.')
      setShowError(true)
      setShowSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="retro-card p-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-retro-green/20 border border-retro-green/30 rounded-lg text-retro-green text-sm flex items-center">
          <Trophy className="w-4 h-4 mr-2" />
          <span>Success! Your win has been shared!</span>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="mb-4 p-4 bg-retro-pink/20 border border-retro-pink/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-retro-pink">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-retro-pink font-retro font-semibold text-sm mb-1">
                Submission Failed
              </h4>
              <p className="text-retro-pink text-sm font-sans mb-3">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={() => setShowError(false)}
                className="text-xs bg-retro-pink/20 hover:bg-retro-pink/30 text-retro-pink px-3 py-1 rounded-lg transition-colors duration-200 font-sans"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="font-bold text-lg text-retro-text mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-retro-pink" />
        Share Your Win! 🎉
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prize Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-retro-text mb-1">
            Prize Category *
          </label>
          <select
            name="prize_category"
            value={formData.prize_category}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select category...</option>
            {prizeCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Prize Input */}
        <div>
          <label className="block text-sm font-medium text-retro-text mb-1">
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

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-retro-text mb-1 flex items-center">
            <Star className="w-4 h-4 mr-1 text-retro-green" />
            Machine Fairness Rating *
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating }))}
                className={`p-2 rounded-lg transition-all duration-200 ${formData.rating >= rating
                  ? 'text-retro-green'
                  : 'text-retro-text-secondary hover:text-retro-green'
                  }`}
              >
                <Star className={`w-6 h-6 ${formData.rating >= rating ? 'fill-current' : ''}`} />
              </button>
            ))}
            <span className="text-sm text-retro-text-secondary font-sans ml-2">
              ({formData.rating}/5)
            </span>
          </div>
        </div>

        {/* User Name Input */}
        <div>
          <label className="block text-sm font-medium text-retro-text mb-1 flex items-center">
            <User className="w-4 h-4 mr-1 text-retro-blue" />
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
          <label className="block text-sm font-medium text-retro-text mb-1 flex items-center">
            <MessageCircle className="w-4 h-4 mr-1 text-retro-purple" />
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
          <label className="block text-sm font-medium text-retro-text mb-1 flex items-center">
            <Camera className="w-4 h-4 mr-1 text-retro-green" />
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
            className="cursor-pointer bg-retro-hover border-2 border-dashed border-retro-text-secondary/30 rounded-lg p-4 text-center hover:bg-retro-hover/70 transition-colors duration-200 block"
          >
            {photoPreview ? (
              <div className="space-y-2">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg mx-auto border border-retro-hover"
                />
                <p className="text-sm text-retro-text-secondary">Click to change photo</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Camera className="w-8 h-8 text-retro-text-secondary mx-auto" />
                <p className="text-sm text-retro-text-secondary">Click to add photo</p>
              </div>
            )}
          </label>
        </div>

        {/* Upload Status */}
        {uploadStatus && (
          <div className="text-sm text-retro-text-secondary text-center">
            {uploadStatus}
          </div>
        )}

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