import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-200">
        Edait app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}