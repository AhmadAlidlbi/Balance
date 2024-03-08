import {React, useState, useEffect} from "react";
import {Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploadModal1() {
    
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [ image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const  galleryStatus  = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission( galleryStatus.status === "granted");
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    if (hasGalleryPermission === false) {
        return <View><Text>No access to Internal Storage</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ flex: 1/2 }} />}
        </View>
    );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff1616",
        position: "absolute",
    },
    button: {
        marginVertical: 10,
    },
    image: {
        flex: 1/2,
    },
});