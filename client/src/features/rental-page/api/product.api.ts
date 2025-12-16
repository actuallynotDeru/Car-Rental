import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Car } from "../types/product.types";

export const getCarAllCars = async(): Promise<Car[]> => {
  const res = await axios.get(`${API_BASE_URL}/cars/`);
  return res.data;
}