import React, {useState, useEffect} from 'react';
import {getRealm} from '../../../databases/realm';
import uuid from 'react-native-uuid';
import {Keyboard} from 'react-native';
import {
  ListContainer,
  ListItem,
  ListItemText,
  TaskInputContainer,
  TaskInput,
  TaskInputText,
  CheckContainer,
  Badge,
  Container,
  Loader,
  ListItemDate,
  Column,
} from './styles';
import {
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Task = {
  id: string | number[];
  title: string;
  description: string;
  created_at: Date;
  due_at: Date;
  tasklist_id: string;
  // tasklist: {type: 'Tasklist'};
};

export default function ListTasks({route, navigation}) {
  const {taskListId} = route.params;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  // const [showDoneTasks, setShowDoneTasks] = useState(false);
  const backgroundImage = require('../../../assets/tasklist-city.jpg');
  // const now = new Date();

  const createTask = async () => {
    if (!taskInput) {
      return;
    }

    const realm = await getRealm();
    setLoading(true);
    try {
      let createdTask: Task;
      realm.write(() => {
        createdTask = realm.create<Task>('Task', {
          id: uuid.v4(),
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

  const fetchTasks = async () => {
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
  };

  //Todo: useFocusEffect for when it is navigating to other pages
  useEffect(() => {
    fetchTasks();
  }, []);

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

  // const addTask = async () => {
  //   try {
  //     if (!taskInput) {
  //       return;
  //     }
  //     const newTask = {
  //       tasklist_id: taskListId,
  //       text: taskInput,
  //       end: null,
  //     };

  //     setLoading(true);
  //     const response = await api
  //       .post('/task', newTask)
  //       .then(() => dispatch(requestTaskLists()))
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoading(false));

  //     setTaskInput('');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const completeTask = async (taskId: number) => {
  //   try {
  //     setTasks(
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           task.status = 'done';
  //         }
  //         return task;
  //       }),
  //     );

  //     await api.post('/toogle-task', {task_id: taskId});
  //   } catch (error) {
  //     setTasks(
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           task.status = 'new';
  //         }
  //         return task;
  //       }),
  //     );
  //     console.log(error);
  //   }
  // };

  // const uncompleteTask = async (taskId: number) => {
  //   try {
  //     await api.post('/toogle-task', {task_id: taskId});

  //     setTasks(
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           task.status = 'new';
  //         }
  //         return task;
  //       }),
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const toggleShowDoneTasks = () => {
  //   setShowDoneTasks(!showDoneTasks);
  // };

  // const handleShowDetails = (task) => {
  //   console.log('handleShowDetails');
  //   //console.log(task);
  //   navigation.navigate('TaskDetails', {task: task});
  // };

  // useEffect(() => {
  //   const updatedTasks = tasklists ? tasklists[taskListIndex].tasks : [];
  //   setTasks(updatedTasks);
  // }, [tasklists]);

  return (
    <Container>
      <ImageBackground
        source={backgroundImage}
        resizeMode={'cover'}
        style={{flex: 1, height: '100%'}}>
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

        {/* <Badge>
          <TouchableOpacity onPress={toggleShowDoneTasks}>
            <Text>Mostrar Tarefas Concluídas</Text>
          </TouchableOpacity>
        </Badge> */}

        {/* {loadingTasks ? (
          <Loader size="large" color="#c5adc7" />
        ) : (
          <ListContainer>
            <ScrollView>
              {tasks &&
                tasks.map((task) => {
                  const parsedTaskEnd = task.end ? task.end : null;
                  const taskEnd = task.end
                    ? moment(parsedTaskEnd).format('DD/MM/YY HH:MM')
                    : null;

                  const isBefore =
                    task.end && now > parsedTaskEnd ? true : false;

                  return (
                    task.status === 'new' &&
                    !showDoneTasks && (
                      <ListItem
                        activeOpacity={0.9}
                        key={task.id}
                        onPress={() => handleShowDetails(task)}>
                        <CheckContainer onPress={() => completeTask(task.id)}>
                          <Icon name="check-square" size={32} color="#c5adc7" />
                        </CheckContainer>

                        <Column>
                          <ListItemText>{task.text}</ListItemText>
                          <ListItemDate isBefore={isBefore}>
                            {taskEnd && taskEnd}
                          </ListItemDate>
                        </Column>
                      </ListItem>
                    )
                  );
                })}

              {tasks &&
                tasks.map(
                  (task) =>
                    task.status === 'done' &&
                    showDoneTasks && (
                      <ListItem done key={task.id} activeOpacity={0.7}>
                        <CheckContainer onPress={() => uncompleteTask(task.id)}>
                          <Icon name="check-square" size={32} color="#c5adc7" />
                        </CheckContainer>
                        <ListItemText>{task.text}</ListItemText>
                      </ListItem>
                    ),
                )}
            </ScrollView>
          </ListContainer>
        )} */}

        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <ListItem done key={item?.id} activeOpacity={0.7}>
              <CheckContainer onPress={() => {}}>
                {/* <Icon name="check-square" size={32} color="#c5adc7" /> */}
              </CheckContainer>
              <ListItemText>{item.title}</ListItemText>
              <TouchableOpacity
                style={{marginLeft: 'auto', marginRight: 20}}
                onPress={() => deleteTask(item.id)}>
                <ListItemText>Delete</ListItemText>
              </TouchableOpacity>
            </ListItem>
          )}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    </Container>
  );
}
