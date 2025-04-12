import { Stack } from "expo-router";
import { PaperProvider, useTheme } from 'react-native-paper';

import defaultTheme from "@/themes/default-theme";

export default function RootLayout() {
  return (
    <PaperProvider theme={defaultTheme}>
      <MainNavigation />
    </PaperProvider>
  );
}

const MainNavigation = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Todo List",
        headerShown: true,
        contentStyle: { backgroundColor: theme.colors.primaryContainer },
      }} />
    </Stack>
  );
}