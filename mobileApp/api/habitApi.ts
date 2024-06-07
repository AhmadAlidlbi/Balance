

import ClientApi from "./client";


export const createHabit = async (title:string,userId:string) => {
    
    const response=await ClientApi.post("/habits",{title,userId});
    return response.data;
}

export const getHabitsByUserId = async (userId:string) => {
    const response=await ClientApi.get(`/habits/user/${userId}`);
    return response.data;
}

export const getHabitById = async (habitId:string) => {
    const response=await ClientApi.get(`/habits/${habitId}`);
    return response.data;
}

export const updateHabit = async (habitId:string, completed:boolean) => {
    const response=await ClientApi.put(`/habits/${habitId}`,{completed});
    return response.data;
}

export const editHabit = async (habitId:string, title:string) => {
    const response=await ClientApi.patch(`/habits/${habitId}`,{title});
    return response.data;
}

export const deleteHabit = async (habitId:string) => {
    const response=await ClientApi.delete(`/habits/${habitId}`);
    return response.data;
}