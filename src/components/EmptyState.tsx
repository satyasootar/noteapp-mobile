import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../themes';

interface Props {
  icon: string;
  message: string;
}

export function EmptyState({ icon, message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  icon: {
    fontSize: 52,
    marginBottom: Spacing.md,
    opacity: 0.3,
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});