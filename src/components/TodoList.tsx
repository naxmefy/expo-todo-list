import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { Button, Checkbox, List, TextInput } from "react-native-paper";

interface Task {
    text: string;
    resolved: boolean;
}

const TASKS_STORAGE_KEY = "tasks";

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<string>("");
    const inputRef = useRef<RNTextInput>(null);

    // Load tasks from AsyncStorage when the component mounts
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                }
            } catch (error) {
                console.error("Failed to load tasks:", error);
            }
        };
        loadTasks();
    }, []);

    // Save tasks to AsyncStorage whenever they change
    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            } catch (error) {
                console.error("Failed to save tasks:", error);
            }
        };
        saveTasks();
    }, [tasks]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task.trim(), resolved: false }]);
            setTask("");
            inputRef.current?.focus();
        }
    };

    const toggleResolved = (index: number) => {
        setTasks(
            tasks.map((t, i) =>
                i === index ? { ...t, resolved: !t.resolved } : t
            )
        );
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Enter your task here..."
                    value={task}
                    onChangeText={setTask}
                    onSubmitEditing={() => {
                        addTask();
                        setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                />
                <Button mode="contained" onPress={addTask}>
                    Add
                </Button>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <List.Item
                        title={item.text}
                        titleStyle={item.resolved ? styles.resolvedText : undefined}
                        onPress={() => toggleResolved(index)}
                        left={() => (
                            <Checkbox
                                status={item.resolved ? "checked" : "unchecked"}
                                onPress={() => toggleResolved(index)}
                                uncheckedColor="#FF0000"
                            />
                        )}
                        right={() => (
                            <Button onPress={() => removeTask(index)}>Remove</Button>
                        )}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginRight: 8,
    },
    resolvedText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
});