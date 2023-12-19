import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Select({itens}){
  const [selected, setSelected] = React.useState(itens[0]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleItemPress = (item) => {
    setSelected(item);
    toggleModal();
  };
  
  return(
    <View>
      <TouchableOpacity  style={styles.container} onPress={toggleModal}>
        <Text style={styles.text}>{selected.label}</Text>
        <AntDesign name='caretdown' size={15} color='#f1f1f1' />
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal}>
        <View style={styles.contant}>
          <View style={styles.modal}>
          <FlatList
              data={itens}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.label} onPress={() => handleItemPress(item)}>
                  <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    height: 35,
    borderColor: '#000000',
    borderWidth: 0.4,
    width: 307,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    width: 300,
    minHeight: 200,
    borderRadius: 3,
    elevation: 5,
    marginTop: 200,
    padding: 15,
  },
  contant:{
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  text:{
    fontSize: 17,
    fontWeight: 'bold',
    color: '#696B6E',
    textAlign: 'center',
  },
})
