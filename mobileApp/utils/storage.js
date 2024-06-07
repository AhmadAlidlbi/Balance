import { deleteItemAsync, getItem, setItem } from "expo-secure-store";

const KEY = "token";

export const storeToken =  (value) => {
    try {
         setItem(KEY, JSON.stringify(value));
    }
    catch (error) {
        console.log("Error storing the token", error);
    }

}

export const getToken =  () => {
    try {
        const token=  getItem(KEY);
        return token? JSON.parse(token): null;
    }
    catch (error) {
        console.log("Error getting the token", error);
    }
}

export const removeToken =  () => {
    try {
         deleteItemAsync(KEY);
    }
    catch (error) {
        console.log("Error removing the token", error);
    }
}

export const clearAll =  () => {
    try {
         deleteItemAsync(KEY);
    }
    catch (error) {
        console.log("Error clearing all", error);
    }
}

