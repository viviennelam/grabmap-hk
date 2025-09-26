import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'

export default function MachineCard({ machine }) {
  return (
    <Link to={`/machine/${machine.id}`} className="block">
      <div className="card p-4">
        <div className="relative mb-3">
          <img 
            src={machine.photo_url} 
            alt={machine.name_en}
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-arcade-yellow fill-current" />
            <span className="text-sm font-semibold">{machine.fairness_rating}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-800">{machine.name_en}</h3>
          <p className="text-gray-600 text-sm">{machine.name_zh}</p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{machine.district}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {machine.prizes_array.slice(0, 3).map((prize, index) => (
              <span 
                key={index}
                className="bg-arcade-purple/20 text-arcade-purple px-2 py-1 rounded-full text-xs font-medium"
              >
                {prize}
              </span>
            ))}
            {machine.prizes_array.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                +{machine.prizes_array.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}