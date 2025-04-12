import React, { useRef, useState } from "react";
import { FlatList, TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { Button, Checkbox, List, TextInput } from "react-native-paper";

interface Task {
    text: string;
    resolved: boolean;
}

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<string>("");
    const inputRef = useRef<RNTextInput>(null); // Create a ref for the TextInput

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task.trim(), resolved: false }]);
            setTask("");
            inputRef.current?.focus(); // Keep focus on the TextInput
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
                    ref={inputRef} // Attach the ref to the TextInput
                    style={styles.input}
                    placeholder="Enter your task here..."
                    value={task}
                    onChangeText={setTask}
                    onSubmitEditing={() => {
                        addTask();
                        setTimeout(() => inputRef.current?.focus(), 0); // Ensure focus is retained after submission
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
                        onPress={() => toggleResolved(index)} // Toggle resolved when the text is pressed
                        left={() => (
                            <Checkbox
                                status={item.resolved ? "checked" : "unchecked"}
                                onPress={() => toggleResolved(index)} // Toggle resolved when the checkbox is pressed
                                uncheckedColor="#FF0000" // Red color for unchecked state
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
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