import { Star, Users, Settings, Fuel, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RentalCardProps {
  imgSrc: string
  imgAlt?: string
  carName: string
  rating: number
  price: number
  seats: number
  transmission: string
  type: string
}

const RentalCard = ({ imgSrc, imgAlt, carName, rating, price, seats, transmission, type }: RentalCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={imgAlt || carName}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-blue-400 text-background text-xs font-medium px-3 py-1 rounded-full">
          {type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground leading-tight">{carName}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Star size={14} className="text-foreground fill-foreground" />
              <span className="text-sm font-medium text-foreground">{rating}</span>
              <span className="text-sm text-muted-foreground">• 120+ reviews</span>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>{seats}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings size={16} />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel size={16} />
            <span>{type}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">₱{price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <Button className="rounded-full gap-2 group/btn bg-blue-400">
            Rent Now
            <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RentalCard