// import { deleteItemAsync, getItem, setItem } from "expo-secure-store";

// const KEY = "token";

// export const storeToken =  (value) => {
//     try {
//          setItem(KEY, JSON.stringify(value));
//     }
//     catch (error) {
//         console.log("Error storing the token", error);
//     }

// }

// export const getToken =  () => {
//     try {
//         const token=  getItem(KEY);
//         return token? JSON.parse(token): null;
//     }
//     catch (error) {
//         console.log("Error getting the token", error);
//     }
// }

// export const removeToken =  () => {
//     try {
//          deleteItemAsync(KEY);
//     }
//     catch (error) {
//         console.log("Error removing the token", error);
//     }
// }

// export const clearAll =  () => {
//     try {
//          deleteItemAsync(KEY);
//     }
//     catch (error) {
//         console.log("Error clearing all", error);
//     }
// }

import { deleteItemAsync, getItem, setItem } from "expo-secure-store";

const KEY = "token";

// Store the token in secure storage
export const storeToken = async (value) => {
  try {
    await setItem(KEY, JSON.stringify(value)); // Ensure async operation is handled
  } catch (error) {
    console.log("Error storing the token", error);
  }
};

// Get the token from secure storage
export const getToken = async () => {
  try {
    const token = await getItem(KEY); // Ensure async operation is handled
    return token ? JSON.parse(token) : null;  // Return parsed token or null if not found
  } catch (error) {
    console.log("Error getting the token", error);
    return null; // Return null if there's an error
  }
};

// Remove the token from secure storage
export const removeToken = async () => {
  try {
    await deleteItemAsync(KEY); // Ensure async operation is handled
  } catch (error) {
    console.log("Error removing the token", error);
  }
};

// Clear all items from secure storage
export const clearAll = async () => {
  try {
    await deleteItemAsync(KEY); // Clear the token
  } catch (error) {
    console.log("Error clearing all", error);
  }
}
