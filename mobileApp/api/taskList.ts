import ClientApi from "./client";

export const createTaskList = async (title:string,userId:string) => {
    const response=await ClientApi.post("/tasksList",{title,userId});
    return response.data;
}

export const getTaskListsByUserId = async (userId:string) => {
    const response=await ClientApi.get(`/tasksList/user/${userId}`);
    return response.data;
}

export const getTaskListById = async (taskListId:string) => {
    const response=await ClientApi.get(`/tasksList/${taskListId}`);
    return response.data;
}

export const updateTaskList = async (taskListId:string, title:boolean) => {
    const response=await ClientApi.put(`/tasksList/${taskListId}`,{title});
    return response.data;
}


export const deleteTaskList = async (taskListId:string) => {
    const response=await ClientApi.delete(`/tasksList/${taskListId}`);
    return response.data;
}

export const deleteTaskItem = async (taskListId: string,taskId:string) => {
    const response = await ClientApi.delete(`/tasksList/${taskListId}/${taskId}`);
    return response.data;
  };
  