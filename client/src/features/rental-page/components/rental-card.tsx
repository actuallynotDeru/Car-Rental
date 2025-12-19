import { Star, Users, Settings, Fuel, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import type { Car } from "../types/product.types" // Adjust path to where your types are defined
import { motion } from "framer-motion"
import { RentalAnimations } from "../animations/rental.animations"
import { SERVER_BASE_URL } from "@/config/serverURL"

interface RentalCardProps {
  car: Car
}

const RentalCard = ({ car }: RentalCardProps) => {
  const navigate = useNavigate()

  // Destructure the car object for easier access
  const { 
    _id, 
    name, 
    image, 
    rating, 
    price, 
    carDetails 
  } = car

  return (
    <motion.div variants={RentalAnimations.carCard} initial = "hidden" animate = "visible" whileHover = {RentalAnimations.carCardHover.hover} className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <motion.img
          variants={RentalAnimations.carImage} initial = "rest" whileHover = {RentalAnimations.carImage.hover}
          src={`${SERVER_BASE_URL}${image}`}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge - Using Fuel Type as the badge */}
        <motion.div variants={RentalAnimations.badge} initial = "hidden" animate = "visible" className="absolute top-4 left-4 bg-blue-400 text-background text-xs font-medium px-3 py-1 rounded-full">
          {carDetails.fuelType}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground leading-tight">{name}</h3>
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
            <span>{carDetails.seats}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings size={16} />
            <span>{carDetails.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel size={16} />
            <span>{carDetails.fuelType}</span>
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
          <Button 
            className="rounded-full gap-2 group/btn bg-blue-400" 
            onClick={() => navigate(`/products/${_id}`)}
          >
            Rent Now
            <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default RentalCard