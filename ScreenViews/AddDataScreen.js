// ScreenViews/AddDataScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const AddDataScreen = ({ route, navigation }) => {
  const { patientId } = route?.params;
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  const handleAddData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/patients/${patientId}/clinical-data`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        console.error('Error adding clinical data:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding clinical data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Clinical Data</Text>
      <TextInput
        placeholder="Type (e.g., Blood Pressure)"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <TextInput
        placeholder="Value (e.g., 120/80)"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleAddData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10 },
});
