// import React from 'react'

// import {
//     ImageBackground,
//     Text,
//     Modal,
//     TouchableOpacity,
//   } from 'react-native';

// export default function Modal({}: ModalProps) {
//   return (
//     <Modal
//     animationType="slide"
//     transparent={true}
//     visible={modalVisible}
//     onRequestClose={() => {
//       setModalVisible(!modalVisible);
//     }}>
//     <ModalContainer>
//       <TaskInputContainer>
//         <TaskListInput
//           defaultValue={newTaskListName}
//           onChangeText={(value: any) => {
//             setNewTaskListName(value);
//           }}
//         />
//         {loading ? (
//           <Loader size="large" color="#c5adc7" />
//         ) : (
//           <TouchableOpacity onPress={addTaskList}>
//             <TaskListInputText>+</TaskListInputText>
//           </TouchableOpacity>
//         )}
//       </TaskInputContainer>

//       <CancelButton onPress={() => setModalVisible(!modalVisible)}>
//         <CancelButtonText>Cancelar</CancelButtonText>
//       </CancelButton>
//     </ModalContainer>
//   </Modal>
//   )
// }
