import { Image } from 'expo-image';
import { Platform, StyleSheet, Modal, View, Button, TouchableOpacity } from 'react-native';
import { useState} from 'react';
import { useCart } from '@/hooks/user-cart';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Assets } from '@react-navigation/elements';

interface MenuItem {
  name: string;
  img: any;
  desc: string;
  price: number;
  type: 'drink' | 'food';
}

export default function HomeScreen() {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const { addToCart } = useCart();

    const menuItems: MenuItem[] = [
      { name: 'Coffee', img: require('@/assets/images/coffer.png'), desc: 'Just a regular coffee', price: 2.70, type: 'drink'},
      { name: 'Evil Coffee', img: require('@/assets/images/Dark fucked up coffee.jpg'), desc: 'coffee but no coffee', price: 280.00, type: 'drink' },
      { name: 'Cattuccino', img: require('@/assets/images/cattuccino.png'), desc: 'cat but coffee', price: 5.75, type: 'drink' },
    ];

    const drinks = menuItems.filter(item => item.type === 'drink');
    const food = menuItems.filter(item => item.type === 'food');
    return (
    //header layout prototype
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#9e844d', dark: '#9e844d' }}
        headerText='Caffeinated Lions'
      >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Yummy soder</ThemedText>
      </ThemedView>

      <ThemedView style={styles.fullCat}>
        {drinks.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedItem(item)}>

            <ThemedView style={styles.card}>
              <Image source={item.img} style={styles.cardImage} />
              <ThemedText style={styles.cardText}>{item.name} ${item.price.toFixed(2)}</ThemedText>
              <ThemedText type="subtitle" style={{color: '#424242', fontSize: 12}}>{item.desc}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          ))}
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Evil Fries</ThemedText>
      </ThemedView>

      
      <ThemedView style={styles.fullCat}>
        {food.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedItem(item)}>

            <ThemedView style={styles.card}>
              <Image source={item.img} style={styles.cardImage} />
              <ThemedText style={styles.cardText}>{item.name} {item.price}</ThemedText>
              <ThemedText type="subtitle" style={{color: '#424242', fontSize: 12}}>{item.desc}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          ))}
      </ThemedView>

      <Modal
        visible={selectedItem !== null}
        transparent = {true}
        animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedItem && (
                <>
                  <ThemedText type="title">PlaceOrder</ThemedText>
                  <Image source={selectedItem.img} style={styles.modalImage} />
                  <ThemedText style={{fontWeight: 'bold', fontSize: 20}}>{selectedItem.name}</ThemedText>
                  <ThemedText>{selectedItem.desc}</ThemedText>
                  <ThemedText type="subtitle">${selectedItem.price.toFixed(2)}</ThemedText>
                
                  <View style={styles.buttonRow}>
                    <Button title="Cancel" color="red" onPress={() => setSelectedItem(null)} />
                    <Button title="Add to order :D" onPress={() => {
                      addToCart(selectedItem);
                      alert(`${selectedItem.name} added to your order :3`);
                      setSelectedItem(null);
                    }} />
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#f7ead3',
    borderRadius: 15,
    padding: 10,
    width: 150,
  },
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 5,
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  fullCat: {
    flexDirection: 'row',
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#0000001e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffeabc',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  }
});
