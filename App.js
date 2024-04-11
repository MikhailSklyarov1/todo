import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles.js';
import ActionButton from './components/ActionButton';
import useStore from './store.js';

export default function App() {

  const [text, setText] = useState('');
  const { dataStore, getTodos, deleteTodo, createTodo } = useStore()

  useEffect(() => {
    getTodos()
    console.log(dataStore)
  }, [dataStore]);


  const showInfoAlert = () => {

    createTodo({ name: 'default', task: text, isComplete: false })
    // Alert.alert(
    //   'Информация',
    //   data.toString(),
    //   [{ text: 'OK' }],
    //   { cancelable: false }
    // );
  };

  const handleDelete = (index) => {


    deleteTodo(index)

  };


  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, styles.universeContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Введите текст"
          value={text}
          onChangeText={text => setText(text)}
        >
        </TextInput>

        <ActionButton onPress={showInfoAlert} action={'+'} />
      </View>

      <Text style={styles.title}>Дела на день:</Text>
      {
        dataStore.map((item, index) => {
          return <View style={[styles.universeContainer, styles.itemContainer]}>
            <View style={styles.items}>
              <Text style={styles.text} key={index}>
                {item.text}
              </Text>
            </View>
            <ActionButton onPress={() => handleDelete(item.id)} action={'x'} />
          </View>
        })
      }
      <StatusBar style="auto" />
    </View>
  );
}

