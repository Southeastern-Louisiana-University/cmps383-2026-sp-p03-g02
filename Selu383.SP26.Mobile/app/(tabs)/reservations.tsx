import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '@/hooks/user-cart';
import { useState } from 'react';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Assets } from '@react-navigation/elements';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Location {
  name: string;
  address: string;
  tableCount: number;
  managerId: number | null;
}

const locations = [
  {name: "Main St", address: "123 Main St", tableCount: 10, managerId: null},
  {name: "Oak Ave", address: "456 Oak Ave", tableCount: 20, managerId: null},
  {name: "Pine Ln", address: "789 Pine Ln", tableCount: 15, managerId: null}
];

export default function ReservationsScreen() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const [reservedTables, setReservedTables] = useState<string[]>([]);
  const handleConfirm = () => {
    if (selectedTable && selectedLocation) {
      const reservationKey = `${selectedLocation.name}-${selectedTable}`;
      setReservedTables([...reservedTables, reservationKey]);
      alert(`Table ${selectedTable} at ${selectedLocation?.name} is now reserved`);
      setSelectedTable(null);
    }
  };
  const renderTables = (count: number) => {
    return Array.from ({length: count }, (_, i) => ({
      id: i + 1,
      name: `Table ${i + 1}`
    }));
  };

  return (
    //header layout prototype
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#9e844d', dark: '#9e844d' }}
      headerText='Reservations'
      >
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Please select the location you wish to reserve from</ThemedText>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {locations.map((loc, index) => (
                  <TouchableOpacity
                  key={index}
                  onPress={() => { setSelectedLocation(loc); setSelectedTable(null);}}
                  style={[styles.card, selectedLocation?.name === loc.name && styles.activeCard]}
                  >
                    <ThemedText style={styles.cardText}>{loc.name}</ThemedText>
                    <ThemedText style={{fontSize: 10}}>{loc.address}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>

            {selectedLocation && (
              <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Available Tables at {selectedLocation.name}</ThemedText>
                <View style={styles.tableGrid}>
                  {renderTables(selectedLocation.tableCount).map((table) => {
                    const reservationKey = `${selectedLocation.name}-${table.id}`;
                    const isReserved = reservedTables.includes(reservationKey);
                    const isSelected = selectedTable === table.id;
                    return (
                    <TouchableOpacity
                      key={table.id}
                      disabled={isReserved}
                      style={[styles.tableItem, selectedTable === table.id && styles.activeTable, isReserved && styles.disabledTable]}
                      onPress={() => setSelectedTable(table.id)}
                      >
                        <FontAwesome name={isReserved ? "lock" : "square"}size={24} color={isReserved ? "#999" : (isSelected ? "#fff" : "#9e844d")} 
                        />
                        <ThemedText style={[isSelected && {color: '#fff'}, isReserved && { color: '#999'}
                        ]}>
                          {table.id}
                        </ThemedText>
                    </TouchableOpacity>
                    );
                    })}
                </View>

                {selectedTable && (
                  <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={handleConfirm}
                    >
                      <ThemedText style={{color: 'white', fontWeight: 'bold'}}>Confirm Reservation</ThemedText>
                    </TouchableOpacity>
                )}
              </ThemedView>
            )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7ead3',
    borderRadius: 10,
    marginRight: 10,
    minWidth: 120,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 15,
    width: 'auto',
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  fullCat: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  activeTable: {
    backgroundColor: '#288b00'
  },
  reserveButton: {
    backgroundColor: '#9e844d',
    padding:15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:10,
    marginTop: 10,
  },
  tableItem: {
    width: 60,
    height: 60,
    backgroundColor: '#f7ead3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '9e844d',
  },
  activeCard: {
    borderColor: '#9e844d',
    backgroundColor: '#fff7e6',
  },
  disabledTable: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    opacity: 0.6,
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#352000',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5f3e00'
  },
});
