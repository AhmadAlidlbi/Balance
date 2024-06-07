import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLogin } from "../../../../context/LoginProvider";

const About = () => {
  const { theme } = useLogin();
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}>
      <Text style={[styles.heading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>About Balance Application</Text>
      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Our Mission</Text>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          At Balance, we believe in the power of habits and routines to
          transform lives. Our mission is to empower individuals like you to
          cultivate positive habits, manage tasks efficiently, and achieve your
          goals with ease. Whether you're striving for work-life balance,
          personal growth, or simply want to be more productive, Balance is here
          to support you every step of the way.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Features</Text>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          Habit Tracking: Easily add, view, edit, and delete habits from your
          dashboard. Monitor your progress with intuitive visualizations and
          stay on track towards your goals.
          {"\n\n"}Task Management: Create, organize tasks effortlessly. From
          creating task lists to managing individual tasks, Balance streamlines
          your workflow and boosts productivity.
          {"\n\n"}Calendar Integration: Stay on top of your schedule with the
          calendar view. See upcoming tasks at a glance and manage your time
          effectively.
          {"\n\n"}Note Taking: Capture ideas, thoughts, and reminders with
          ease. Create, edit, and organize notes seamlessly, and use the search
          bar to find what you need instantly.
          {"\n\n"}Profile Customization: Personalize your experience with
          customizable profile settings. Upload a profile picture, update your
          name and profession, and manage account preferences hassle-free.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Our Commitment</Text>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          At Balance, we are committed to delivering an exceptional user
          experience. We strive to continuously improve our app, incorporating
          feedback from our users and leveraging the latest technologies to
          enhance performance, reliability, and security.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default About;
