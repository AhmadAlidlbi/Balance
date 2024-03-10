import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UploadImageModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleCameraPress = () => {
        // Handle camera button press
    };

    const handleGalleryPress = () => {
        // Handle gallery button press
    };

    const handleRemovePress = () => {
        // Handle remove button press
    };

    const handleCancelPress = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Open Modal</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
                transparent={true} // Set modal to transparent
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={handleCameraPress}>
                        <Ionicons name="camera" size={24} />
                        <Text>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGalleryPress}>
                        <Ionicons name="image" size={24} />
                        <Text>Gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRemovePress}>
                        <Ionicons name="trash" size={24} />
                        <Text>Remove</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancelPress}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Set background color with transparency
        justifyContent: "center",
        alignItems: "center",
    },
});

export default UploadImageModal;
