import styled, {css} from 'styled-components/native';

export const TaskInputContainer = styled.View`
  width: 100%;
  height: 80px;
  display: flex;

  align-items: center;
  flex-direction: row;
`;

export const TaskInput = styled.TextInput`
  margin-left: 15px;
  height: 50px;
  width: 82%;
  background-color: #fff;
`;
export const TaskInputText = styled.Text`
  text-align: center;
  font-size: 30px;
  background-color: #fff;
  margin-left: 5%;
  border-radius: 20px;
  height: 50px;
  width: 50px;
  color: #c5adc7;
`;

export const ListContainer = styled.View`
  flex: 1;
  padding: 20% 3%;
`;

export const ListItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 65px;
  background-color: #fff;
  width: 93%;
  margin: 0 auto;
  margin-top: 2px;

  ${props =>
    props.done &&
    css`
      background-color: #bcf3de;
    `}
`;
export const Column = styled.View`
  flex-direction: column;
  align-items: flex-start;
  height: 65px;
`;

export const Container = styled.KeyboardAvoidingView`
  background-color: #fed7b8;
  flex: 1;
`;

export const Badge = styled.View`
  margin-top: 10%;
  margin-bottom: 10%;
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #dddbb5;
`;

export const ListItemText = styled.Text`
  margin-left: 10px;
`;

export const CheckContainer = styled.TouchableOpacity`
  padding-left: 10px;
  height: 100%;
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator`
  margin: 50% auto 0 auto;
`;

export const ListItemDate = styled.Text`
  color: green;
  margin-left: 10px;

  ${props =>
    props.isBefore &&
    css`
      color: red;
    `}
`;
