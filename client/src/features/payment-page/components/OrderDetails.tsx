import CardInfo from "./CardInfo";
import ContactInfo from "./contactInfo";
import { Button } from "@/components/ui/button"
import { CreditCard, Lock, ShieldCheck } from "lucide-react"
import React from "react";
import { useState } from "react";


interface OrderDetailsProps{
    itemPrice: number
}

const OrderDetails = ({ itemPrice}: OrderDetailsProps) => {
      const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsProcessing(false)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <ContactInfo />
            <CardInfo />
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 bg-foreground text-background font-semibold hover:bg-foreground/90 mt-5"
          disabled={isProcessing}
        >
          {isProcessing ? (
            "Processing..."
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pay ₱{itemPrice}
            </>
          )}
        </Button>

        </form>

        </>
    )
}

export default OrderDetails