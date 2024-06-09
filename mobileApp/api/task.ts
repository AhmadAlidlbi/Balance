import ClientApi from "./client";

export const createTask = async ({
  taskListId,
  userId,
  title,
  description,
  startDate,
  endDate,
}: {
  taskListId: string;
  userId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}) => {
  console.log("taskListId", taskListId);
  const response = await ClientApi.post("/tasks", {
    title,
    description,
    startDate,
    endDate,
    userId,
    taskListId,
  });
  return response.data;
};

export const getTaskListsByUserId = async (userId: string) => {
  const response = await ClientApi.get(`/tasksList/user/${userId}`);
  return response.data;
};

export const getTaskListById = async (taskListId: string) => {
  const response = await ClientApi.get(`/tasksList/${taskListId}`);
  return response.data;
};

export const updateTaskList = async (taskListId: string, title: boolean) => {
  const response = await ClientApi.put(`/tasksList/${taskListId}`, { title });
  return response.data;
};

export const editTask = async (
  taskId: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string
) => {
  const response = await ClientApi.put(`/tasks/edit/${taskId}`, {
    title,
    description,
    startDate,
    endDate,
  });
  return response.data;
};

// changeStatus

export const changeTaskStatus = async (taskId: boolean, completed) => {
  const response = await ClientApi.patch(`/tasks/changeStatus/${taskId}`, {
    completed,
  });
  return response.data;
};

export const getTaskListByDate = async (userId: string, date: string) => {
  const response = await ClientApi.patch(`/tasks/byDate`, { date, userId });
  return response.data;
};

export const  deleteTask = async (taskId: string) => {
  const response = await ClientApi.delete(`/tasks/${taskId}`);
  return response.data;
}

export const getCompletedTasks = async (userId: string) => {
  const response = await ClientApi.get(`/tasks/completed/${userId}`);
  return response.data;
};