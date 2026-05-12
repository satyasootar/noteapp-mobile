import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Text } from "react-native"

import { useTheme } from "../hooks/useTheme"
import { NoteEditorScreen } from "../screen/NoteEditorScreen"
import { NotesScreen } from "../screen/NotesScreen"
import { TasksScreen } from "../screen/TaskScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Notes tab has its own stack (list → editor)
function NotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="NotesList"
        component={NotesScreen}
      />
      <Stack.Screen
        name="NoteEditor"
        component={NoteEditorScreen}
      />
    </Stack.Navigator>
  )
}

// Root navigator — the bottom tab bar
export function AppNavigator() {
  const { colors } = useTheme()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen
          name="Notes"
          component={NotesStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>📝</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>✅</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
