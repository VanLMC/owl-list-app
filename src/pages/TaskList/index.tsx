import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import {Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import {getRealm} from '../../databases/realm';
import {NavigationProp} from '@react-navigation/native';
import Background from '../../components/Background';
import {
  Container,
  ListItem,
  ListItemText,
  TaskListsContainer,
  CreateNewListButton,
} from './styles';
import {Task, TaskList} from '../../types';
import NewTaskListModal from './NewTaskListModal';
import getCurrentMonthNumber from '../../utils/getCurrentMonthNumber';

// import Icon from 'react-native-vector-icons/Feather';
//Todo: get icons to work

export interface AllListsProps {
  navigation: NavigationProp<any, any>;
}

export default function AllLists({navigation}: AllListsProps) {
  const [loading, setLoading] = useState(false);
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTaskLists = async () => {
    const realm = await getRealm();

    try {
      setLoading(true);
      const response = realm.objects<TaskList[]>('TaskList').toJSON();
      setTaskLists(response);
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const deleteTaskList = async (id: string) => {
    const realm = await getRealm();
    try {
      const selectedTaskList = realm
        .objects<TaskList>('TaskList')
        .filtered(`id = '${id}'`)[0];

      const taskListTasks = realm
        .objects<Task[]>('Task')
        .filtered(`tasklist_id = '${id}'`);

      realm.write(() => {
        realm.delete(taskListTasks);
      });
      realm.write(() => {
        realm.delete(selectedTaskList);
      });

      const updatedTasklists = taskLists.filter(
        (taskList: TaskList) => taskList.id !== id,
      );
      setTaskLists(updatedTasklists);
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete this Tasklist?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteTaskList(id)},
    ]);
  };

  const handleNavigateToList = (tasklist: TaskList) => {
    navigation.navigate('Tasks', {tasklist});
  };

  const createTaskList = async (
    newTaskListName: string,
    isRecurrent: boolean,
  ) => {
    const realm = await getRealm();
    try {
      setLoading(true);

      let createdTasklist: TaskList;
      realm.write(() => {
        createdTasklist = realm.create<TaskList>('TaskList', {
          id: uuid.v4().toString(),
          name: newTaskListName,
          isRecurrent,
          lastMonth: getCurrentMonthNumber(),
        });
      });

      setTaskLists(value => [
        ...value,
        {
          id: createdTasklist.id,
          name: createdTasklist.name,
          isRecurrent: createdTasklist.isRecurrent,
          lastMonth: createdTasklist.lastMonth,
        },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
      setLoading(false);
    }
  };

  return (
    <Container>
      <NewTaskListModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        submit={createTaskList}
        loading={loading}
      />

      <Background>
        <TaskListsContainer>
          <CreateNewListButton onPress={() => setModalVisible(true)}>
            <Text>Criar nova lista</Text>
          </CreateNewListButton>

          <FlatList
            data={taskLists}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                delayLongPress={500}
                onLongPress={() => handleDelete(item.id)}>
                <ListItem onPress={() => handleNavigateToList(item)}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </TaskListsContainer>
      </Background>
    </Container>
  );
}
