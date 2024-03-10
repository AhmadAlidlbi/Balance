import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Iconify } from "react-native-iconify";

const Avatar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri }} style={styles.profileImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress} style={styles.imageIcon}>
        <Iconify icon="majesticons:camera" color="#555555" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 180,
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
    borderColor: "#a1a1a1",
    borderWidth: 5,
  },
  imageIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 20,
  },
});

export default Avatar;
{
  /* <View style={[styles.container, { width: size, height: size }]}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
</View> */
}
