import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

const Indicator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.indicator}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7077D2",
    marginHorizontal: 8,
  },
});
