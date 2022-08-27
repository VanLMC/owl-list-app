export const TaskSchema = {
  name: 'Task',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    created_at: 'date',
    due_at: 'date',
    tasklist_id: 'string',
  },
  primaryKey: 'id',
};
