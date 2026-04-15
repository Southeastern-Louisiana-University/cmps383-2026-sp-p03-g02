import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Assets } from '@react-navigation/elements';

export default function HomeScreen() {
  return (
    //header layout prototype
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#9e844d', dark: '#9e844d' }}
      headerText='Caffeinated Lions'
      >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Orders Page!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.fullCat}>
        {[
          { name: 'Coffee', img: require('@/assets/images/coffer.png'), desc: 'Just a regular coffee', price: '$2.80'},
          { name: 'Evil Coffee', img: require('@/assets/images/Dark fucked up coffee.jpg'), desc: 'coffee but no coffee', price: '$280' },
          { name: 'Cattuccino', img: require('@/assets/images/cattuccino.png'), desc: 'cat but coffee', price: '$5.75' },
          ].map((item, index) => (
            <ThemedView key={index} style={styles.card}>
              <Image source={item.img} style={styles.cardImage} />
              <ThemedText style={styles.cardText}>{item.name} {item.price}</ThemedText>
              <ThemedText type="subtitle" style={{color: '#424242', fontSize: 12}}>{item.desc}</ThemedText>
            </ThemedView>
          ))}
      </ThemedView>
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
});
