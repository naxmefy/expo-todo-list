import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';

import defaultTheme from "@/themes/default-theme";

export default function RootLayout() {
  return (
    <PaperProvider theme={defaultTheme}>
      <Stack />
    </PaperProvider>
  );
}
