import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  import { Iconify } from "react-native-iconify";
  import { useLogin } from "../context/LoginProvider";
  import { useNavigation } from "@react-navigation/native";
  
  function UpcomingTask(props) {
    const navigation = useNavigation();
    const { theme } = useLogin();
    const task = props.task;  
    return (
      <View
        style={[
          styles.taskItem,
          { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
        ]}
        onPress={() => navigation.navigate("TaskDetails", { task })}
        onLongPress={() => setEditModalVisible(true)}
      >
        <View style={styles.taskItemText} android_ripple={{ color: "#210644" }}>
          <Text
            style={[
              styles.taskText,
              task.completed && { textDecorationLine: "line-through" },
              { color: theme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {task?.title}
          </Text>
          <Text
            style={[
              styles.taskDescription,
              { color: theme === "dark" ? "#ffffff" : "#777" },
            ]}
          >
            {task?.description}
          </Text>
        </View>
      </View>
    );
  }
  
  export default UpcomingTask;
  
  const styles = StyleSheet.create({
    taskItem: {
      margin: 7,
      borderRadius: 7,
      width: 350,
      backgroundColor: "#E9E9E9",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    taskItemText: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: 10,
      alignItems: "center",
    },
    taskText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    taskDescription: {
      fontSize: 14,
    },
  });
  