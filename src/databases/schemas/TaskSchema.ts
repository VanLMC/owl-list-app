
  export const TaskListSchema = {
    name: "Task",
    properties: {
      _id: "int",
      title: "string",
      description: "string",
      created_at: "date",
      due_at: "date",
    },
    primaryKey: "_id",
  };
  