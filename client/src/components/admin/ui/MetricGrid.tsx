import type { ReactNode } from "react"
import MetricCard from "./MetricCard"

export type Metric = {
    title: string;
    metric: string | number | ReactNode;
    metricDescription: string | ReactNode;
    icon: ReactNode;
}

interface MetricGridProps {
    metrics: Metric[];
    className?: string;
}

const MetricGrid = ({ metrics, className }: MetricGridProps) => {
    const containerClass = className ?? 'flex w-full gap-6'
    return(
        <div className = {containerClass}>
            {metrics.map((m, idx) => (
                <MetricCard 
                    key = {idx}
                    title = {m.title}
                    metric = {m.metric}
                    metricDescription = {m.metricDescription}
                    Icon = {m.icon}
                    className = "flex-1"
                />
            ))}
        </div>
    )
}

export default MetricGrid;