import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

const TaskTimerModal = ({ visible, task, onClose }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(interval);
    } else if (!isRunning && timer !== 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (!visible) {
      setTimer(0);
      setIsRunning(false);
    }
  }, [visible]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {task && <Text style={styles.taskName}>Task: {task.name}</Text>}
        <Text style={styles.timerText}>
          Time: {Math.floor(timer / 3600)}:{Math.floor((timer % 3600) / 60)}:{timer % 60}
        </Text>
        <Button onPress={isRunning ? stopTimer : startTimer} title={isRunning ? "Stop" : "Start"} />
        <Button onPress={onClose} title="Close" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskName: {
    fontSize: 20,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default TaskTimerModal;
