import Realm from "realm";

import { TaskListSchema } from './schemas/TaskListSchema'


export const getRealm = async () => await Realm.open({
    path: "owl-list",
    schema: [TaskListSchema],
});