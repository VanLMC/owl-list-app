import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import {
  ImageBackground,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import {
  Container,
  ListItem,
  ListItemText,
  TaskListsContainer,
  CreateNewListButton,
  ModalContainer,
  TaskInputContainer,
  TaskListInput,
  TaskListInputText,
  CancelButton,
  CancelButtonText,
  Loader,
} from './styles';
import {Task, TaskList} from '../../types';
import {getRealm} from '../../databases/realm';
// import Icon from 'react-native-vector-icons/Feather';
//Todo: get icons to work
//Todo: refactor to componetize and remove unnecessary stuff

export default function AllLists({navigation}: any) {
  let backgroundImage = require('../../assets/tasklist-city.jpg');

  const [loading, setLoading] = useState(false);
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [newTaskListName, setNewTaskListName] = useState('');

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

  const handleUpdate = async (id: string) => {
    //Todo add funcionality to modal
    const realm = await getRealm();

    try {
      const selectedTaskList = realm
        .objects<TaskList>('TaskList')
        .filtered(`id = '${id}'`)[0];
      const newTaskList = {
        ...selectedTaskList,
        //put the stuff you wanna updte here
      };
      realm.write(() => {
        newTaskList;
      });

      fetchTaskLists();
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
    }
  };

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

  const handleNavigateToList = (taskListId: string) => {
    navigation.navigate('Tasks', {taskListId});
  };

  const createTaskList = async () => {
    const realm = await getRealm();
    try {
      setLoading(true);

      let createdTasklist: TaskList;
      realm.write(() => {
        createdTasklist = realm.create<TaskList>('TaskList', {
          id: uuid.v4(),
          name: newTaskListName,
        });
      });

      setTaskLists(value => [
        ...value,
        {id: createdTasklist.id, name: createdTasklist.name},
      ]);
      setNewTaskListName('');
      setModalVisible(false);
    } catch (err) {
      console.log(err);
    } finally {
      realm.close();
      setLoading(false);
    }
  };

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalContainer>
          <TaskInputContainer>
            <TaskListInput
              defaultValue={newTaskListName}
              onChangeText={(value: any) => {
                setNewTaskListName(value);
              }}
            />
            {loading ? (
              <Loader size="large" color="#c5adc7" />
            ) : (
              <TouchableOpacity onPress={createTaskList}>
                <TaskListInputText>+</TaskListInputText>
              </TouchableOpacity>
            )}
          </TaskInputContainer>

          <CancelButton onPress={() => setModalVisible(!modalVisible)}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CancelButton>
        </ModalContainer>
      </Modal>

      <ImageBackground
        source={backgroundImage}
        resizeMode={'cover'}
        style={{flex: 1, height: '100%'}}>
        <TaskListsContainer>
          <CreateNewListButton onPress={() => setModalVisible(true)}>
            <Text>Criar nova lista</Text>
          </CreateNewListButton>

          <FlatList
            data={taskLists}
            renderItem={({item}) => (
              <ListItem
                onPress={() => handleNavigateToList(item.id)}
                delayLongPress={500}
                onLongPress={() => handleDelete(item.id)}>
                <ListItemText>{item.name}</ListItemText>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </TaskListsContainer>
      </ImageBackground>
    </Container>
  );
}
