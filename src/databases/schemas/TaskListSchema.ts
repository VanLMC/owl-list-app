export const TaskListSchema = {
  name: 'TaskList',
  properties: {
    id: 'string',
    name: 'string',
    isRecurrent: 'bool',
    lastMonth: 'int',
  },
  primaryKey: 'id',
};
