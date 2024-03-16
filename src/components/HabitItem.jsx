import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";
import { useState } from "react";

function HabitItem(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleCheckPress = () => {
    // Toggle the state when the icon is pressed
    setIsPressed(!isPressed);
  };

  return (
    <TouchableOpacity style={styles.habitItem}>
      <TouchableOpacity onPress={handleCheckPress} style={styles.checkIcon}>
        <Iconify
          icon="lets-icons:check-fill"
          size={25}
          color={isPressed ? "#2a9c2a" : "grey"} // Change color based on state
        />
      </TouchableOpacity>
      <View
        android_ripple={{ color: "#210644" }}
      >
      <Text style={[styles.listText, isPressed && { textDecorationLine: 'line-through' }]}>{props.text}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setDeleteModalVisible(true)}
        style={styles.deleteIcon}
      >
        <Iconify icon="majesticons:delete-bin" size={25} color={"#FF3B30"} />
      </TouchableOpacity>

      {/* Delete Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.deleteModalInnerContainer}>
          <View style={styles.deleteModalContent}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={props.onDeleteItem.bind(this, props.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

export default HabitItem;

const styles = StyleSheet.create({
  habitItem: {
    margin: 7,
    borderRadius: 7,
    width: 350,
    backgroundColor: "#E9E9E9",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  habitText: {
    color: "#000000",
  },
  checkIcon: {
    padding: 5,
    marginLeft: 10,
  },
  deleteIcon: {
    padding: 5,
    marginRight: 10,
  },
  deleteModalInnerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  deleteModalContent: {
    backgroundColor: "#ffffff00",
    padding: 20,
    borderRadius: 10,
    height: "20.5%",
  },
  deleteButton: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: "#BE0000",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#BE0000",
    fontSize: 18,
    textAlign: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
