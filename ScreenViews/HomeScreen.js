// ScreenViews/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3000/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleAddPatient = async () => {
    if (!name || !age) {
      alert('Please enter both name and age');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: parseInt(age, 10) }),
      });

      if (response.ok) {
        const newPatient = await response.json();
        setPatients((prevPatients) => [...prevPatients, newPatient]);
        setName('');
        setAge('');
      } else {
        console.error('Error adding patient:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Patient Details', { patientId: item._id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.status}>{`Age: ${item.age}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient List</Text>
      <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={(item) => item._id}
      />

      {/* Add New Patient Section */}
      <Text style={styles.addTitle}>Add New Patient</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input} 
      />
      <Button title="Add Patient" onPress={handleAddPatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 18 },
  status: { fontSize: 14, color: 'gray' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10 },
});
