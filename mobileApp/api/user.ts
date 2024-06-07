import ClientApi, { ClientFormDataApi } from "./client";

export const uploadUserImage = async (formData: FormData) => {
  const response = await ClientFormDataApi.post(`/user/uploadImage`, formData);
  return response.data;
};

export const editProfile = async (data) => {
  const response = await ClientApi.put(`/editProfile`,data);
  return response.data;

}

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const response = await ClientApi.put(`/changePassword`, { oldPassword, newPassword });
  return response.data;
}

export const getProfile = async () => {
  const response = await ClientApi.get(`/me`);
  return response.data;
}

export const deleteProfileImage = async () => {
  try {
    const response = await ClientApi.delete(`/user/deleteImage`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting profile image: " + error.message);
  }
};