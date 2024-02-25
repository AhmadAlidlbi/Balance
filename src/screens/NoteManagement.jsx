import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const NoteManagement = () => {
    const [note, setNote] = useState('');

    const handleNoteChange = (text) => {
        setNote(text);
    };

    const handleSaveNote = () => {
        // Implement your save note logic here
        console.log('Note saved:', note);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Note</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your note"
                value={note}
                onChangeText={handleNoteChange}
            />
            <Button title="Save Note" onPress={handleSaveNote} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default NoteManagement;
