import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Owner } from "../types/product.types";

export const getOwnerById = async(ownerId: string): Promise<Owner> => {
  const res = await axios.get(`${API_BASE_URL}/users/${ownerId}`);
  return res.data;
}