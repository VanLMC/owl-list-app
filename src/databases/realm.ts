import Realm from 'realm';

import {TaskListSchema} from './schemas/TaskListSchema';
import {TaskSchema} from './schemas/TaskSchema';

export const getRealm = async () =>
  await Realm.open({
    path: 'owl-list',
    schema: [TaskListSchema, TaskSchema],
  });
