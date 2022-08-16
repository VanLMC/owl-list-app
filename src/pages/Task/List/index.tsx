import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  Modal,
  TouchableOpacity,
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
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

type TaskList = {
  id: string;
  name: string;
}

export default function AllLists({ navigation } : any) {

  let backgroundImage = require('../../../assets/tasklist-city.jpg');

  const [loading, setLoading] = useState(false);
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [newTaskListName, setNewTaskListName] = useState('');

  // const loadTaskLists = () => {
  //   console.log('loadTaskLists');
  //   setLoading(true);
  //   dispatch(requestTaskLists());
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   loadTaskLists();
  // }, []);

  // useEffect(() => {
  //   setComponentTaskLists(tasklists);
  // }, [tasklists]);

  const handleNavigateToList = (taskListIndex, taskListId) => {
    // navigation.navigate('MainList', {taskListIndex, taskListId});
  };

  const addTaskList = () => {
    setTaskLists((value) => [...value, {id: 'random', name: newTaskListName}])
    setNewTaskListName('')
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
              <TouchableOpacity onPress={addTaskList}>
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
          {taskLists &&
            taskLists.map((list, index) => (
              <ListItem
                key={list.id}
                onPress={() => handleNavigateToList(index, list.id)}>
                <Icon name="list" size={30} color="#c5adc7" />
                <ListItemText>{list.name}</ListItemText>
              </ListItem>
            ))}

          <CreateNewListButton onPress={() => setModalVisible(true)}>
            <Text>Criar nova lista</Text>
          </CreateNewListButton>
        </TaskListsContainer>
      </ImageBackground>
    </Container>
  );
}
