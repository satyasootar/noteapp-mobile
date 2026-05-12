import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';
import { Colors, Spacing, Typography } from '../themes';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.container}>
      {/* Checkbox */}
      <TouchableOpacity style={styles.checkbox} onPress={onToggle} activeOpacity={0.7}>
        <View style={[styles.checkboxInner, task.completed && styles.checkboxChecked]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* Task text */}
      <Text
        style={[styles.text, task.completed && styles.textCompleted]}
        onPress={onToggle}
      >
        {task.text}
      </Text>

      {/* Delete button */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn} activeOpacity={0.7}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',    // Children side by side (horizontal)
    alignItems: 'center',
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  checkbox: {
    marginRight: Spacing.md,
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
  },
  text: {
    ...Typography.cardTitle,
    flex: 1,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  deleteBtn: {
    padding: Spacing.sm,
  },
  deleteText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});