import React, {useState, useEffect, useCallback} from 'react';
import {getRealm} from '../../../databases/realm';
import uuid from 'react-native-uuid';
import {Keyboard} from 'react-native';
import {
  ListItem,
  ListItemText,
  TaskInputContainer,
  TaskInput,
  TaskInputText,
  CheckContainer,
  Container,
  Loader,
  DeleteButton,
} from './styles';
import {TouchableOpacity, FlatList} from 'react-native';
import Background from '../../../components/Background';
import {Task} from '../../../types';

interface RouteParams {
  taskListId: string;
}

interface ListTasksProps {
  route: {
    params: RouteParams;
  };
}

export default function ListTasks({route}: ListTasksProps) {
  const {taskListId} = route.params;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  const createTask = async () => {
    if (!taskInput) {
      return;
    }

    const realm = await getRealm();
    setLoading(true);
    try {
      realm.write(() => {
        realm.create<Task>('Task', {
          id: uuid.v4().toString(),
          title: taskInput,
          description: 'description',
          due_at: new Date(),
          created_at: new Date(),
          tasklist_id: taskListId,
        });
      });

      fetchTasks();
      setTaskInput('');
      Keyboard.dismiss();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = useCallback(async () => {
    const realm = await getRealm();

    try {
      setLoading(true);
      const response = realm
        .objects<Task[]>('Task')
        .filtered(`tasklist_id = '${taskListId}'`)
        .toJSON();
      setTasks(response);
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
      setLoading(false);
    }
  }, [taskListId]);

  //Todo: useFocusEffect for when it is navigating to other pages
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const deleteTask = async (id: string | number[]) => {
    const realm = await getRealm();
    try {
      const selectedTaskList = realm
        .objects<Task>('Task')
        .filtered(`id = '${id}'`)[0];
      realm.write(() => {
        realm.delete(selectedTaskList);
      });
      const updatedTasks = tasks.filter((task: Task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
    }
  };

  return (
    <Container>
      <Background>
        <TaskInputContainer>
          <TaskInput
            defaultValue={taskInput}
            onChangeText={(value: any) => {
              setTaskInput(value);
            }}
          />
          {loading ? (
            <Loader size="large" color="#c5adc7" />
          ) : (
            <TouchableOpacity onPress={createTask}>
              <TaskInputText>+</TaskInputText>
            </TouchableOpacity>
          )}
        </TaskInputContainer>

        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <ListItem done key={item?.id} activeOpacity={0.7}>
              <CheckContainer onPress={() => {}} />
              <ListItemText>{item.title}</ListItemText>
              <DeleteButton onPress={() => deleteTask(item.id)}>
                <ListItemText>Delete</ListItemText>
              </DeleteButton>
            </ListItem>
          )}
          keyExtractor={item => item.id}
        />
      </Background>
    </Container>
  );
}
