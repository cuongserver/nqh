import {
  CommandResponse,
  CreateOrUpdateTaskRequestModel,
  CreateOrUpdateTaskResponseModel,
  GetTasksResponseModel,
} from "@scripts/common/types";

export const createOrUpdateTask = async (
  model: CreateOrUpdateTaskRequestModel
) => {
  const response = await fetch("/api/task/create-or-update", {
    method: "post",
    body: JSON.stringify(model),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok)
    return (await response.json()) as CreateOrUpdateTaskResponseModel;
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

export const deleteTask = async (taskId: string) => {
  const response = await fetch("/api/task/delete", {
    method: "post",
    body: JSON.stringify({ id: taskId }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) return (await response.json()) as CommandResponse;
};
