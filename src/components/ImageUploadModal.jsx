import React, { useState } from 'react';
import { View, Modal, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploadModal = ({ isVisible, onClose, onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync();
        if (!imageResult.cancelled) {
            setSelectedImage(imageResult.uri);
            onImageUpload(imageResult.uri);
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View>
                <Button title="Close" onPress={onClose} />
                <Button title="Upload Image" onPress={handleImageUpload} />
                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            </View>
        </Modal>
    );
};

export default ImageUploadModal;