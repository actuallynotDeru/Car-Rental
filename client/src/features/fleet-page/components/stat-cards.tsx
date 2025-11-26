
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: number | string
    icon: LucideIcon
    iconColor: string
}

const StatCards = ({title, value, icon: Icon, iconColor}:StatCardProps) => {
    return(
        <Card className = "shadow-sm bg-transparent border border-gray-300">
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
        </Card>
    )
}

export default StatCards