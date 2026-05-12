import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"
import { Colors } from "../../themes"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.background,
          height: 60,
          paddingBottom: 13,
        },
        tabBarActiveTintColor: Colors.primary || Colors.text,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="document-text"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="checkmark-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
