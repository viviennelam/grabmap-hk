import { Trophy } from 'lucide-react'

export default function WinsList({ wins }) {
  if (!wins || wins.length === 0) {
    return (
      <div className="retro-card p-8 text-center">
        <Trophy className="w-12 h-12 text-retro-text-secondary mx-auto mb-3" />
        <p className="text-retro-text-secondary">No wins shared yet!</p>
        <p className="text-sm text-retro-text-secondary/70">Be the first to share your win!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-retro-text flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-retro-green" />
        Recent Wins ({wins.length})
      </h3>
      
      <div className="space-y-3">
        {wins.map((win) => (
          <div key={win.id} className="retro-card p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-1 min-w-0">
                {/* Primary Info Line - Username and Date */}
                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-retro-text">
                    👤 {win.user_name || 'Anonymous'}
                  </span>
                  <span className="text-xs text-retro-text-secondary ml-2">
                    • {new Date(win.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Photo - optimized for portrait photos */}
                {win.photo_url && (
                  <div className="mb-3 win-photo-container">
                    <img 
                      src={win.photo_url} 
                      alt={win.prize}
                      className="win-photo"
                      onLoad={(e) => {
                        // Dynamically adjust styling based on aspect ratio
                        const img = e.target;
                        const aspectRatio = img.naturalWidth / img.naturalHeight;
                        
                        // Remove any existing aspect ratio classes
                        img.classList.remove('win-photo-portrait', 'win-photo-landscape', 'win-photo-square');
                        
                        if (aspectRatio < 0.8) {
                          // Portrait photo - show more of the image without cropping
                          img.classList.add('win-photo-portrait');
                        } else if (aspectRatio > 1.5) {
                          // Landscape photo - use cover but with controlled height
                          img.classList.add('win-photo-landscape');
                        } else {
                          // Square-ish photo - balanced approach
                          img.classList.add('win-photo-square');
                        }
                      }}
                      onError={(e) => {
                        // Handle broken images gracefully
                        e.target.style.display = 'none';
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* Prize Name - converted from badge to heading */}
                <h4 className="text-sm font-semibold text-retro-blue mt-3 mb-2">
                  {win.prize}
                </h4>
                
                {/* Prize Description - repurposed comment field */}
                {win.comment && (
                  <p className="text-retro-text mb-3 font-sans" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                    {win.comment}
                  </p>
                )}
                
                {win.rating && (
                  <div className="mb-2">
                    <span className="text-sm text-retro-text mr-2">Fairness:</span>
                    <div className="flex text-base" style={{ color: '#ffd700' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < win.rating ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}