import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Booking } from "../types/booking-review.types";

export const getOwnerBookings = async(ownerId: string): Promise<Booking[]> => {
  const res = await axios.get(`${API_BASE_URL}/bookings/owner/${ownerId}`);
  return res.data;
}

export const getBookingById = async(bookingId: string): Promise<Booking> => {
  const res = await axios.get(`${API_BASE_URL}/bookings/${bookingId}`);
  return res.data;
}

export const updateBookingStatus = async(bookingId: string, status: "Confirmed" | "Cancelled" | "Completed"): Promise<Booking> => {
  const res = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, {
    status,
  });
  return res.data;
}

