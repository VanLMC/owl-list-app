import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  submit: (tasklistName: string, isRecurrent: boolean) => void;
  loading: boolean;
}

import {
  ModalContainer,
  TaskInputContainer,
  TaskListInput,
  TaskListInputText,
  CancelButton,
  CancelButtonText,
  Loader,
} from '../styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const checkFillColor = '#c5adc7';

export default function NewTaskListModal({
  modalVisible,
  setModalVisible,
  submit,
  loading,
}: ModalProps) {
  const [newTaskListName, setNewTaskListName] = useState('');
  const [recurrentList, setRecurrentList] = useState(false);
  return (
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
            <TouchableOpacity
              onPress={() => {
                setNewTaskListName('');
                setModalVisible(false);
                submit(newTaskListName, recurrentList);
              }}>
              <TaskListInputText>+</TaskListInputText>
            </TouchableOpacity>
          )}
        </TaskInputContainer>
        <BouncyCheckbox
          size={25}
          fillColor={checkFillColor}
          unfillColor={'#fff'}
          text={'Lista recorrente'}
          iconStyle={{borderColor: checkFillColor}}
          innerIconStyle={{borderWidth: 2}}
          // eslint-disable-next-line react-native/no-inline-styles
          textStyle={{
            fontFamily: 'JosefinSans-Regular',
            textDecorationLine: 'none',
          }}
          isChecked={recurrentList}
          onPress={() => {
            setRecurrentList(value => !value);
          }}
        />
        <CancelButton onPress={() => setModalVisible(!modalVisible)}>
          <CancelButtonText>Cancelar</CancelButtonText>
        </CancelButton>
      </ModalContainer>
    </Modal>
  );
}
