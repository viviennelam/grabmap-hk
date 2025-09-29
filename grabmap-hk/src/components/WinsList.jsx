import { Calendar, User, Trophy, Star } from 'lucide-react'

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
                <div className="flex items-center space-x-2 mb-1">
                  <span className="prize-badge prize-badge-green font-sans">
                    {win.prize}
                  </span>
                  {win.rating && (
                    <div className="flex items-center text-retro-green text-xs">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span>{win.rating}/5</span>
                    </div>
                  )}
                </div>
                
                {win.user_name && (
                  <div className="flex items-center text-sm text-retro-text-secondary mb-1 font-sans">
                    <User className="w-4 h-4 mr-1" />
                    <span>{win.user_name}</span>
                  </div>
                )}
                
                {win.comment && (
                  <p className="text-retro-text text-sm mb-2 font-sans">{win.comment}</p>
                )}
                
                {win.photo_url && (
                  <div className="mb-2">
                    <img 
                      src={win.photo_url} 
                      alt={win.prize}
                      className="w-full max-w-xs h-32 object-cover rounded-lg border border-retro-hover"
                    />
                  </div>
                )}
                
                <div className="flex items-center text-xs text-retro-text-secondary font-sans">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{new Date(win.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}