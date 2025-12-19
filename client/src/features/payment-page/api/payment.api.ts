import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
// Ensure you have a Booking type exported from your types file
import type { Booking } from "../types/payment.types"; 

export const BookingAPI = {
  // Create a new booking
  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    try {
      // Changed endpoint from '/cars' to '/bookings'
      const res = await axios.post(`${API_BASE_URL}/bookings`, bookingData, {
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json' 
        },
      });
      
      // Normalizing the response ID
      return {
        ...res.data,
        id: res.data.id || res.data._id
      };
    } catch (error) {
      console.error("Error creating booking: ", error);
      // You might want to throw the specific error message from the backend if available
      if (axios.isAxiosError(error) && error.response) {
         throw new Error(error.response.data.message || "Failed to create booking");
      }
      throw new Error("Failed to create booking");
    }
  },
};