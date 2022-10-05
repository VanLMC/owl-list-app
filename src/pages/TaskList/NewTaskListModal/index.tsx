import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  submit: (value: string) => void;
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

export default function NewTaskListModal({
  modalVisible,
  setModalVisible,
  submit,
  loading,
}: ModalProps) {
  const [newTaskListName, setNewTaskListName] = useState('');
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
                submit(newTaskListName);
              }}>
              <TaskListInputText>+</TaskListInputText>
            </TouchableOpacity>
          )}
        </TaskInputContainer>

        <CancelButton onPress={() => setModalVisible(!modalVisible)}>
          <CancelButtonText>Cancelar</CancelButtonText>
        </CancelButton>
      </ModalContainer>
    </Modal>
  );
}
