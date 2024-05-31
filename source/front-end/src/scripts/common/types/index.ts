export interface CreateOrUpdateTaskRequestModel {
  id?: string;
  desc: string;
  status?: string;
}
export type CreateOrUpdateTaskResponseModel = Task | CommandResponse;
export type CommandResponse = {
  success: boolean;
};
export interface Task {
  id: string;
  desc: string;
  status: string;
  createdAt: number;
  markAsDeleted: boolean;
}

export interface GetTasksResponseModel {
  result: Task[];
}
