import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export const PatientDetailsScreen = ({ route, navigation }) => {
  const { patientId } = route?.params;
  const [patient, setPatient] = useState(null);

  // Fetch patient data, including clinical data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patients/${patientId}`);
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  // Render clinical data if available
  return (
    <View style={styles.container}>
      {patient ? (
        <>
          <Text style={styles.title}>{patient.name}'s Details</Text>
          <Text>Age: {patient.age}</Text>
          <Text>Condition is critical: {patient.criticalCondition}</Text>
          <FlatList
            data={patient.clinicalData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.clinicalDataItem}>
                <Text>Type: {item.type}</Text>
                <Text>Value: {item.value}</Text>
                <Text>Date: {new Date(item.date).toLocaleString()}</Text>
              </View>
            )}
          />
          <Button title="Add New Data" onPress={() => navigation.navigate('AddDataScreen', { patientId })} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  clinicalDataItem: { marginTop: 10, padding: 10, backgroundColor: '#eee', borderRadius: 5 },
});
