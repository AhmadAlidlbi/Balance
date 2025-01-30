import { deleteItemAsync, getItem, setItem } from "expo-secure-store";

const KEY = "token";

export const storeToken = async (value) => {
  try {
    await setItem(KEY, JSON.stringify(value));
  } catch (error) {
    console.log("Error storing the token", error);
  }
};

export const getToken = async () => {
  try {
    const token = await getItem(KEY);
    return token ? JSON.parse(token) : null; 
  } catch (error) {
    console.log("Error getting the token", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await deleteItemAsync(KEY); 
  } catch (error) {
    console.log("Error removing the token", error);
  }
};

export const clearAll = async () => {
  try {
    await deleteItemAsync(KEY); 
  } catch (error) {
    console.log("Error clearing all", error);
  }
}
