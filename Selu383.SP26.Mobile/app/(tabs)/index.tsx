import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, StyleSheet, Modal, View, Button, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Assets } from '@react-navigation/elements';
import { ScrollView } from 'react-native';
import { useCart } from '@/hooks/user-cart';
import { menuItems, MenuItem } from '../../constants/menu-items';


export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();

  return (
    //header layout prototype
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#9e844d', dark: '#9e844d' }}
      headerText='Caffeinated Lions'
      >
      <ThemedView>
        <Image
          source="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.HUVnLSmPwNKr4YM64h5V0QHaE8%3Fpid%3DApi&f=1&ipt=2a07171075bd07c0db76357baf68480ecfbf4729615354dc886101e87783ed04&ipo=images"
          style={{width: 200, height:200, alignSelf:'center', borderRadius: 15}}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome to Caffeinated Lions, your go-to spot for the best coffee in town!</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">{"  "}</ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Try some of our most popular items!</ThemedText>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 10, gap: 15 }}>
          {(menuItems || []).map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedItem(item)}>
              <ThemedView style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <ThemedText style={styles.cardText}>{item.name}</ThemedText>
                <ThemedText style={{fontSize: 12}}>${item.price.toFixed(2)}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
      <ThemedText type="subtitle">{" "}</ThemedText>
      <ThemedView style={styles.stepContainer}>
        <Link href="/Menu">
          <Link.Trigger>
            <ThemedText type="subtitle" style = {{ color: '#274f7a', backgroundColor: '#fff5e8'}}>Or View the Full Menu</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>
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
                        <Image source={selectedItem.image} style={styles.modalImage} />
                        <ThemedText style={{fontWeight: 'bold', fontSize: 20}}>{selectedItem.name}</ThemedText>
                        <ThemedText>{selectedItem.description}</ThemedText>
                        <ThemedText type="subtitle">${selectedItem.price.toFixed(2)}</ThemedText>
                      
                        <View style={styles.buttonRow}>
                          <Button title="Cancel" color="red" onPress={() => setSelectedItem(null)} />
                          <Button title="Add to order" onPress={() => {
                            addToCart(selectedItem);
                            alert(`${selectedItem.name} has been added to your order!`);
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
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
