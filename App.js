import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AddList from './components/AddList';
import ItemsList from './components/ItemsList/Item';
import Error from './components/ErrorComponent/Error';

export default function App() {
  const [listInput, setListInput] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);

  const handleInput = (text) => {
    setListInput(text);
  };

  const handleSetList = () => {
    if (!listInput) {
      setError(true);
      return;
    }

    const newInput = {
      id: Math.random() * 1000,
      value: listInput,
    };
    setList([...list, newInput]);
    setListInput('');
    setError(false);
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do-Lists</Text>
      </View>
      <View style={styles.listArea}>
        <ItemsList data={list} onDelete={handleDelete} />
        <Error visible={error}>Please insert a valid text</Error>
      </View>
      <View style={styles.inputArea}>
        <View style={styles.inputHeaderView}>
          <Text style={styles.inputHeader}>Add Task</Text>
        </View>
        <AddList
          onPressAdd={handleSetList}
          value={listInput}
          onChange={handleInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  inputArea: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  listArea: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
  header: {
    marginTop: 40,
  },
  headerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'darkblue',
  },
  inputHeaderView: {
    alignItems: 'flex-start',
  },
});
