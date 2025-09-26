import { Calendar, User, Trophy } from 'lucide-react'

export default function WinsList({ wins }) {
  if (!wins || wins.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No wins shared yet!</p>
        <p className="text-sm text-gray-400">Be the first to share your win!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-gray-800 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-arcade-yellow" />
        Recent Wins ({wins.length})
      </h3>
      
      <div className="space-y-3">
        {wins.map((win) => (
          <div key={win.id} className="card p-4">
            <div className="flex items-start space-x-3">
              {win.photo_url && (
                <img 
                  src={win.photo_url} 
                  alt={win.prize}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-arcade-yellow/20 text-arcade-yellow px-2 py-1 rounded-full text-sm font-medium">
                    🏆 {win.prize}
                  </span>
                </div>
                
                {win.user_name && (
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <User className="w-4 h-4 mr-1" />
                    <span>{win.user_name}</span>
                  </div>
                )}
                
                {win.comment && (
                  <p className="text-gray-700 text-sm mb-2">{win.comment}</p>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
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