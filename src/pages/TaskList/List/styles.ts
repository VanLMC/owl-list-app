import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ListItemText = styled.Text`
  margin-left: 20px;
`;

export const TaskListsContainer = styled.ScrollView`
  padding: 20px;
`;

export const ListItem = styled(RectButton)`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  width: 100%;
  height: 50px;
  margin-top: 2px;

  ${(props) =>
    props.done &&
    css`
      background-color: #bcf3de;
    `}
`;

export const CreateNewListButton = styled(RectButton)`
  display: flex;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;

  width: 100%;
  height: 50px;
  padding: 10px;
`;

export const ModalContainer = styled.View`
  background-color: #fff;
  position: absolute;
  bottom: -10%;
  height: 30%;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

export const TaskInputContainer = styled.View`
  width: 100%;
  height: 80px;
  display: flex;

  align-items: center;
  flex-direction: row;
`;

export const TaskListInput = styled.TextInput`
  margin-left: 15px;
  height: 50px;
  width: 82%;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 10px;
`;
export const TaskListInputText = styled.Text`
  text-align: center;
  font-size: 30px;
  background-color: #fff;
  margin-left: 5%;
  border-radius: 20px;
  height: 50px;
  width: 50px;
  color: #c5adc7;
  border: 1px solid #c5adc7;
`;

export const Loader = styled.ActivityIndicator``;

export const CancelButton = styled.TouchableOpacity`
  background-color: #c5adc7;
  border-radius: 10px;
  padding: 15px;
`;

export const CancelButtonText = styled.Text`
  color: #fff;
`;
