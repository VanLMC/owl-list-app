export type TaskList = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  due_at: Date;
  tasklist_id: string;
};
