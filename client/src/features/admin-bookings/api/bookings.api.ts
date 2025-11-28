import { API_BASE_URL } from "@/config/apiURL";
import type { Bookings } from "../types/bookings.types";
import axios from "axios";

export async function getBookings(): Promise<Bookings[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/bookings`, {
      headers: { Accept: 'application/json' },
    });
    
    let bookings: Bookings[] = []
    
    if(Array.isArray(res.data)) {
      bookings = res.data;
    } else if(res.data && Array.isArray(res.data.data)) {
      bookings = res.data.data;
    }
    
    return bookings.map(booking => ({
      ...booking,
      id: booking.id || booking._id,
      
      ownerId: {
        ...booking.ownerId,
        id: booking.ownerId.id || booking.ownerId._id
      },
      
      customerId: {
        ...booking.customerId,
        id: booking.customerId.id || booking.customerId._id
      },
      carId: {
        ...booking.carId,
        id: booking.carId.id || booking.carId._id
      }
    }));
  } catch(error) {
    console.error("Error fetching bookings: ", error);
    throw new Error("Failed to fetch bookings");
  }
}