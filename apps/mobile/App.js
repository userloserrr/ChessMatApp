import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createGameState } from '@chessmat/shared';

const game = createGameState('mobile-demo');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ChessMat</Text>
      <Text style={styles.subtitle}>iOS + Android + Web</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Room</Text>
        <Text style={styles.cardValue}>{game.id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Turn</Text>
        <Text style={styles.cardValue}>{game.turn}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status</Text>
        <Text style={styles.cardValue}>{game.status}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8
  },
  subtitle: {
    color: '#9cc2ff',
    fontSize: 16,
    marginBottom: 24
  },
  card: {
    backgroundColor: '#161d2a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d3748'
  },
  cardTitle: {
    color: '#8aa2d5',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.12,
    marginBottom: 8
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  }
});
