// components/OrderDetails.tsx
import CardInfo from "./CardInfo";
import ContactInfo from "./contactInfo";
import { Button } from "@/components/ui/button"
import { CreditCard, Lock } from "lucide-react"
import React, { useState, useEffect } from "react";
import { BookingAPI } from "../api/payment.api"; // Adjust path to your api file
import { useNavigate } from "react-router-dom";

interface OrderDetailsProps {
    totalPrice: number;
    orderData: any; // We pass the full booking context here
}

interface UserData {
  _id: string
  role: string
}    



const OrderDetails = ({ totalPrice, orderData }: OrderDetailsProps) => {
    const [user, setUser] = useState<UserData | null>(null)

    useEffect(() => {
        const userStr = localStorage.getItem('user')
        if(userStr) {
          try {
            const userData = JSON.parse(userStr)
            setUser(userData)
          } catch(err) {
            console.error("Error parsing user data: ", err);
          }
        }
      }, [])
  
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        // 1. Capture Form Data (Contact Info)
        const formData = new FormData(e.currentTarget);
        const contactDetails = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
        };

        // 2. Prepare Payload for API
        // Note: In a real app, customerId usually comes from a logged-in User Context.
        // For this example, we assume orderData might contain it, or we leave it undefined.
        const bookingPayload = {
            ownerId: orderData.ownerId, 
            carId: orderData.carId,     
            customerId: user?._id, // Ensure this exists in your location.state or auth context
            pickupDate: orderData.startDate,
            returnDate: orderData.endDate,
            totalPrice: totalPrice,
            status: "Pending",
            // You can optionally save contactDetails if your backend supports it, 
            // or rely on customerId to look up the user.
        };

        try {
            console.log("Submitting Booking:", bookingPayload);
            
            // 3. Call API
            await BookingAPI.createBooking(bookingPayload);
            
            // 4. Success Handling
            alert("Booking Confirmed!"); 
            navigate("/"); // Redirect to a bookings list or success page

        } catch (error: any) {
            console.error("Booking failed", error);
            alert(error.message || "Payment processing failed");
        } finally {
            setIsProcessing(false);
        }
    }

    return (
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
                            Pay ₱{totalPrice.toLocaleString()}
                        </>
                    )}
                </Button>
            </form>
        </>
    )
}

export default OrderDetails