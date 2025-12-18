import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Bookings } from "../types/product.types";

export const getBookings = async(): Promise<Bookings[]> => {
  const res = await axios.get(`${API_BASE_URL}/bookings`);
  return res.data;
}