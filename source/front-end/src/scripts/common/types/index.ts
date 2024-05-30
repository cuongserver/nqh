export interface CreateTaskRequestModel {
  desc: string;
}
export interface CreateTaskResponseModel {
  id: string;
  desc: string;
  status: string;
  createAt: number;
  markAsDeleted: boolean;
}

export interface Task {
  id: string;
  desc: string;
  status: string;
  createAt: number;
  markAsDeleted: boolean;
}

export interface GetTasksResponseModel {
  result: Task[];
}
