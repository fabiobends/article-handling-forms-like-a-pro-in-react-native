import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Form" }} />
      </Stack>
      <StatusBar style="auto" />
    </KeyboardProvider>
  );
}
