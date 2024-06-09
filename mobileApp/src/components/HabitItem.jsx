import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";
import { useState, useEffect } from "react";
import HabitEdit from "./HabitEdit";
import { editHabit } from "../../api/habitApi";
import { useLogin } from "../context/LoginProvider";
import { Audio } from "expo-av";

function HabitItem(props) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const { theme, language, soundEnabled } = useLogin();
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/complete.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const editHabitHandler = async (habitText) => {
    await editHabit(props.id, habitText);
    props.refetch();
    setEditModalIsVisible(false);
  };

  const endEditHabitHandler = () => {
    setEditModalIsVisible(false);
  };

  const handleCheckIconPress = async () => {
    if (!props.completed && soundEnabled) {
      await playSound();
    }
    props.onUpdate(props.id, props.completed);
  };

  return (
    <TouchableOpacity
      onLongPress={() => setEditModalIsVisible(true)}
      style={[
        styles.habitItem,
        { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
      ]}
    >
      <TouchableOpacity
        onPress={handleCheckIconPress}
        style={styles.checkIcon}
      >
        <Iconify
          icon="lets-icons:check-fill"
          size={25}
          color={props.completed ? "#2a9c2a" : "grey"}
        />
      </TouchableOpacity>
      <View android_ripple={{ color: "#210644" }}>
        <Text
          style={[
            styles.listText,
            props.completed && { textDecorationLine: "line-through" },
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {props.text}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setDeleteModalVisible(true)}
        style={styles.deleteIcon}
      >
        <Iconify icon="majesticons:delete-bin" size={25} color={"#FF3B30"} />
      </TouchableOpacity>

      {/* edit modal */}
      <HabitEdit
        text={props.text}
        visible={editModalIsVisible}
        onAddHabit={editHabitHandler}
        onCancel={endEditHabitHandler}
      />
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
              <Text style={styles.deleteButtonText}>
                {language === "English" ? "Delete" : "Sil"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cancelButton,
                { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
              ]}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  { color: theme === "dark" ? "#ff0000" : "#9B0000" },
                ]}
              >
                {language === "English" ? "Cancel" : "Vazgeç"}
              </Text>
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
  cancelButton: {
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
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#BE0000",
    fontSize: 18,
    textAlign: "center",
  },
});
