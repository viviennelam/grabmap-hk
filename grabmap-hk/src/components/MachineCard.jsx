import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'

// Helper function to get emoji for prizes
function getPrizeEmoji(prize) {
  const lowerPrize = prize.toLowerCase()
  if (lowerPrize.includes('kirby')) return '⭐'
  if (lowerPrize.includes('labubu')) return '👹'
  if (lowerPrize.includes('hello kitty') || lowerPrize.includes('sanrio') || lowerPrize.includes('my melody') || lowerPrize.includes('kuromi')) return '🎀'
  if (lowerPrize.includes('pokemon') || lowerPrize.includes('pikachu')) return '⚡'
  if (lowerPrize.includes('disney') || lowerPrize.includes('mickey') || lowerPrize.includes('minnie')) return '🏰'
  if (lowerPrize.includes('totoro') || lowerPrize.includes('ghibli')) return '🌿'
  if (lowerPrize.includes('anime') || lowerPrize.includes('demon slayer') || lowerPrize.includes('naruto')) return '⚔️'
  if (lowerPrize.includes('bear') || lowerPrize.includes('teddy')) return '🧸'
  if (lowerPrize.includes('cat') || lowerPrize.includes('kitty')) return '🐱'
  if (lowerPrize.includes('unicorn')) return '🦄'
  return '🎁'
}

// Helper function to get badge color based on prize
function getPrizeBadgeClass(prize, index) {
  const colors = ['prize-badge-pink', 'prize-badge-blue', 'prize-badge-purple', 'prize-badge-green']
  return colors[index % colors.length]
}

export default function MachineCard({ machine, featured = false }) {
  const cardClass = featured ? 'retro-card-fixed' : 'retro-card'
  
  return (
    <Link to={`/machine/${machine.id}`} className="block">
      <div className={`${cardClass} p-4`}>
        <div className="flex justify-end items-start mb-3">
          <div className="bg-retro-green/20 text-retro-green rounded-lg px-2 py-1 flex items-center space-x-1 border border-retro-green/30">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold font-sans">{machine.fairness_rating}</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col space-y-2">
          <div>
            <h3 className="font-retro font-bold text-lg text-retro-text line-clamp-1">{machine.name_en}</h3>
            <p className="text-retro-text-secondary text-sm line-clamp-1 font-sans">{machine.name_zh}</p>
          </div>
          
          <div className="flex items-start text-retro-text-secondary text-sm font-sans">
            <MapPin className="w-4 h-4 mr-1 text-retro-blue flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="line-clamp-1">{machine.district}</div>
              {machine.address && (
                <div className="text-xs line-clamp-1 mt-0.5">{machine.address}</div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {machine.prizes_array.slice(0, featured ? 2 : 3).map((prize, index) => {
              const badgeClass = getPrizeBadgeClass(prize, index)
              return (
                <span 
                  key={index}
                  className={`prize-badge ${badgeClass} font-sans`}
                >
                  <span className="truncate max-w-[80px]">{prize}</span>
                </span>
              )
            })}
            {machine.prizes_array.length > (featured ? 2 : 3) && (
              <span className="prize-badge bg-retro-hover/50 text-retro-text-secondary border border-retro-hover font-sans">
                +{machine.prizes_array.length - (featured ? 2 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}