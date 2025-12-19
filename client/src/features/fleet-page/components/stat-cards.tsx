
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { FleetAnimations } from "../animations/fleet.animations"

interface StatCardProps {
    title: string
    value: number | string
    icon: LucideIcon
    iconColor: string
}

const MotionCard = motion.create(Card);

const StatCards = ({title, value, icon: Icon, iconColor}:StatCardProps) => {
    return(
      <MotionCard variants={FleetAnimations.statCard} initial = "hidden" animate = "visible" className = "shadow-sm bg-transparent border border-gray-300">
        <CardContent className = "p-6">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-slate-900">{title}</p>
              <p className = "text-2xl font-bold text-slate-900">{value}</p>
            </div>
            
            <div className = "size-12 rounded-full flex items-center justify-center">
              <Icon className = {`size-6 ${iconColor}`} />
            </div>
          </div>
        </CardContent>
      </MotionCard>
    )
}

export default StatCards