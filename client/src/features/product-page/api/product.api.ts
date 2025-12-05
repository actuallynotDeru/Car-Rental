import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Car } from "../types/product.types";

export const getCarById = async(carId: string): Promise<Car> => {
  const res = await axios.get(`${API_BASE_URL}/cars/${carId}`);
  return res.data;
}