import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import { NotesScreen } from '../screen/NotesScreen';
import { NoteEditorScreen } from '../screen/NoteEditorScreen';
import { TasksScreen } from '../screen/TaskScreen';
import { Colors } from '../themes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Notes tab has its own stack (list → editor)
function NotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotesList" component={NotesScreen} />
      <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
    </Stack.Navigator>
  );
}

// Root navigator — the bottom tab bar
export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: Colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: Colors.text,
          tabBarInactiveTintColor: Colors.textSecondary,
        }}
      >
        <Tab.Screen
          name="Notes"
          component={NotesStack}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📝</Text>,
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>✅</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}