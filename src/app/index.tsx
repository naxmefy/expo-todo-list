import { useTheme } from "react-native-paper";

import TodoList from "@/components/TodoList";

export default function Index() {
  const theme = useTheme();

  return (
    <TodoList />
  );
}