import { API_BASE_URL } from "@/config/apiURL";
import type { User } from "@/types";
import axios from 'axios'

export async function getUsers(): Promise<User[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/users`, {
      headers: { Accept: 'application/json' },
    });
    
    let users: User[] = [];
    
    if(Array.isArray(res.data)) {
      users = res.data;
    } else if(res.data && Array.isArray(res.data.data)) {
      users = res.data.data;
    }
    
    return users.map(user => ({
      ...user,
      id: user.id
    }));
  } catch(error) {
    console.error("Error fetching users: ", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: { Accept: 'application/json' },
    });
    
    const user = res.data;
    return {
      ...user,
      id: user.id || user._id
    };
  } catch(error) {
    console.error("Error fetching user: ", error);
    throw new Error("Failed to fetch user");
  }
}