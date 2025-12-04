import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { UserProfile } from "../types/profile.types";

export const ProfileAPI = {
  getUserById: async (userId: string): Promise<UserProfile> => {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return res.data;
  },
  
  updateUser: async (userId: string, userData: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return res.data;
  },
};