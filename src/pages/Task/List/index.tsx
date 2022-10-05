/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {getRealm} from '../../../databases/realm';
import uuid from 'react-native-uuid';
import {Keyboard, Alert} from 'react-native';
import {
  ListItem,
  TaskInputContainer,
  TaskInput,
  TaskInputText,
  CheckContainer,
  Container,
  Loader,
} from './styles';
import {TouchableOpacity, FlatList} from 'react-native';
import Background from '../../../components/Background';
import {Task} from '../../../types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface RouteParams {
  taskListId: string;
}

interface ListTasksProps {
  route: {
    params: RouteParams;
  };
}

const checkFillColor = '#fed7b8';

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
          done: false,
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

  const toggleCheck = async (id: string) => {
    const realm = await getRealm();

    try {
      const selectedTask = realm
        .objects<Task>('Task')
        .filtered(`id = '${id}'`)[0];
      const newTask = {
        ...selectedTask,
        done: !selectedTask.done,
      };
      realm.write(() => {
        newTask;
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete this Task?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteTask(id)},
    ]);
  };

  console.log(tasks);
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
            <ListItem
              key={item?.id}
              activeOpacity={0.7}
              delayLongPress={500}
              onLongPress={() => handleDelete(item.id)}>
              <CheckContainer onPress={() => {}} />
              <BouncyCheckbox
                size={25}
                fillColor={checkFillColor}
                unfillColor={'#fff'}
                text={item.title}
                iconStyle={{borderColor: checkFillColor}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                isChecked={item.done}
                onPress={() => {
                  toggleCheck(item.id);
                }}
              />
            </ListItem>
          )}
          keyExtractor={item => item.id}
        />
      </Background>
    </Container>
  );
}
