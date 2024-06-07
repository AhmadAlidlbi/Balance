import ClientApi from "./client";
// title, description, userId
export const createNote = async (title:string,description:string,userId:string) => {
    const response=await ClientApi.post("/notes",{title,userId,description});
    return response.data;
}

export const getNotesByUserId = async (userId:string) => {
    const response=await ClientApi.get(`/notes/user/${userId}`);
    return response.data;
}

export const getNoteById = async (noteId:string) => {
    const response=await ClientApi.get(`/notes/${noteId}`);
    return response.data;
}

export const updateNote = async (noteId:string, data:{title:string,description:string}) => {
    const response=await ClientApi.put(`/notes/${noteId}`,{...data});
    return response.data;
}


export const deleteNote = async (noteId:string) => {
    const response=await ClientApi.delete(`/notes/${noteId}`);
    return response.data;
}

