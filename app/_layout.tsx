import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
// Import your global CSS file
import "../global.css";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1e293b", // slate-800
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#94a3b8", // slate-400
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dice",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dice-multiple"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
