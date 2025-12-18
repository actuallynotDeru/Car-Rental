import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Loading = () => {
  return (
    <div className = "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className = "text-center">
        <Loader2 className = "size-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className ="text-slate-600">Loading your fleet...</p>
      </div>
    </div>
  )
}

interface ErrorProps {
  err: string
}

export const Error = ({ err }:ErrorProps) => {
  const navigate = useNavigate();
  return(
    <div className = "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className = "max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className = "mb-4 gap-2 hover:cursor-pointer"
        >
          <ArrowLeft className = "size-4" />
          Back
        </Button>
        
        <Card className = "p-12 text-center">
          <p className="text-destructive mb-4">{ err }</p>
          <Button onClick = {() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    </div>
  )
}