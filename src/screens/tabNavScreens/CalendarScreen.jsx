import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = () => {

    const [startDate, setStartDate] = useState("");

    function handleStartDateChange(startDate) {
        setStartDate(startDate);
      }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Calendar</Text>
            <DatePicker
                  onSelectedChange={handleStartDateChange}
                  options={{
                    backgroundColor: "#3a3fd3",
                    textHeaderColor: "#ffffff",
                    textDefaultColor: "#ffffff",
                    selectedTextColor: "#000000",
                    mainColor: "#ffffff",
                    textSecondaryColor: "#ffffff",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                    textFontSize: 20,
                    textHeaderFontSize: 20,
                  }}
                  current="2024-06-9"
                  selected={startDate}
                  mode="calendar"
                  minuteInterval={30}
                  style={{ borderRadius: 20, marginTop: 100, height: 450, width: 380}}
                />
                <Text style={styles.taskItem}>Saved Task</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    taskItem: {
        fontSize: 20,
        color: '#000000',
        marginTop: 40,
    },
    heading: {
        fontSize: 25,
        color: '#000000',
        marginTop: 20,
    },
});

export default CalendarScreen;