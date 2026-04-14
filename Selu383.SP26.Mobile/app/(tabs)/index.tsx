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
      headerBackgroundColor={{ light: '#946c37', dark: '#471d1d' }}
      headerText='Caffeinated Lions'
      >
      <ThemedView>
        <Image
          source={require('@/assets/images/Dark fucked up coffee.jpg')}
          style={{width: 200, height:200}}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Caffeinated Lions</ThemedText>
        <ThemedText type="subtitle">Welcome to Caffeinated Lions, your go-to spot for the best coffee in town!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Try some of our most popular items!</ThemedText>
        <ThemedText>work in progress
        </ThemedText>
        <ThemedText>or...</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">View The Full Menu :D</ThemedText>
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

        <ThemedText>
          {`(Click here to view the menu page)`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
});
