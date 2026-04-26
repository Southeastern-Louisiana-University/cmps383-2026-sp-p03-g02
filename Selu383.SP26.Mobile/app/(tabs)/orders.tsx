import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useCart } from '@/hooks/user-cart';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Assets } from '@react-navigation/elements';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface MenuItem {
  name: string;
  img: any;
  desc: string;
  price: number;
  type: 'drink' | 'food';
  quantity?: number;
}

export default function OrdersScreen() {
  const { cart, removeFromCart } = useCart();

  const totalCost = cart.reduce((sum: number, item: MenuItem) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);
  
  return (
    //header layout prototype
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#9e844d', dark: '#9e844d' }}
      headerText='Caffeinated Lions'
      >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">ur current order</ThemedText>
      </ThemedView>

      <ThemedView style={styles.fullCat}>
        {cart.length === 0 ? (
          <ThemedText style={{ textAlign: 'center', marginTop: 20}}>
            ur cart empty type splish ong
          </ThemedText>
        ) : (
          cart.map((item: MenuItem, index: number) => (
            <ThemedView key={index} style={styles.card}>
              <Image source={item.img} style={styles.cardImage} />

              <View style={styles.textContainer}>
                <ThemedText style={styles.cardText}>
                  {item.name} (x{item.quantity})
                </ThemedText>
                <ThemedText type="subtitle" style={{color: '#424242', fontSize: 14}}>
                  ${item.price.toFixed(2)}
                </ThemedText>
              </View>

              <TouchableOpacity
                onPress={() => removeFromCart(item.name)}
                style={styles.removeButton}
                >
                  <FontAwesome name="trash" size={20} color="#ff444" />
                </TouchableOpacity>
            </ThemedView>
          ))
        )}
      </ThemedView>
      {cart.length > 0 && (
        <ThemedView style={styles.totalContainer}>
          <ThemedText style={styles.totalText}>
            Total: ${totalCost.toFixed(2)}
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#f7ead3',
    borderRadius: 15,
    padding: 10,
    width: 'auto',
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textContainer: {
    flex: 1,
  },
  removeButton: {
    padding: 10,
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
