export type TaskList = {
  id: string | number[];
  name: string;
};

export type Task = {
  id: string | number[];
  title: string;
  description: string;
  created_at: Date;
  due_at: Date;
  tasklist_id: string;
};
