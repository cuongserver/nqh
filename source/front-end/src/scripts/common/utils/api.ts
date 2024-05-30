import {
  CreateTaskRequestModel,
  CreateTaskResponseModel,
  GetTasksResponseModel,
} from "@scripts/common/types";

export const createTask = async (model: CreateTaskRequestModel) => {
  const response = await fetch("/api/task/create", {
    method: "post",
    body: JSON.stringify(model),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) return (await response.json()) as CreateTaskResponseModel;
};

export const getTasks = async (taskStatuses: string[]) => {
  const response = await fetch("/api/tasks", {
    method: "post",
    body: JSON.stringify({ statuses: taskStatuses }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) return (await response.json()) as GetTasksResponseModel;
};
