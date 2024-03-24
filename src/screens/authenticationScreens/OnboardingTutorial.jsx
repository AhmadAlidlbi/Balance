import { React, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import Slides from "../../data/Slides";
import OnboardingItem from "../../components/OnboardingItem";
import Indicator from "../../components/Indicator";
import NextButton from "../../components/NextButton";

const OnboardingTutorial = ({ navigation }) => {
  // State variable to store the current index
  // The setCurrentIndex function is used to update the currentIndex state variable
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  // The scrollX variable is used to track the scroll position of the FlatList
  // The useRef hook is used to create a mutable ref object
  const slidesRef = useRef(null);
  // The slidesRef variable is used to store a reference to the FlatList component

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  // The viewableItemsChanged variable is used to store a function that updates the currentIndex state variable when the viewable items change

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  // The viewConfig variable is used to store the viewability configuration for the FlatList

  const scrollTo = () => {
    if (currentIndex < Slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else if (currentIndex === Slides.length - 1) {
      navigation.navigate("InAppStack");
    }
  };
  // The scrollTo function is used to scroll to the next slide
  // If the currentIndex is less than the length of the Slides array, the FlatList is scrolled to the next slide
  // If the currentIndex is equal to the length of the Slides array minus 1, the user is navigated to the InAppStack screen

  const handleTitle = () => {
    if (currentIndex === Slides.length - 1) {
      return "Get Started";
    } else {
      return "Next";
    }
  };
  // The handleTitle function returns the title for the NextButton component based on the currentIndex
  // If the currentIndex is equal to the length of the Slides array minus 1, the title is "Get Started"

  const handleSkip = () => {
    navigation.navigate("InAppStack");
    //skips to dashboard
  };

  return (
    <View style={styles.container}>
      {/* The FlatList component renders the OnboardingItem component for each slide */}
      <FlatList
        data={Slides}
        // The data prop is set to the Slides array in Slides.js in data folder
        renderItem={({ item }) => <OnboardingItem item={item} />}
        // The renderItem prop is set to a function that returns the OnboardingItem component
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <View style={styles.secondContainer}>
        <Indicator data={Slides} scrollX={scrollX} />
        {/* NextButton component */}
        <NextButton
          buttonColor={true}
          scrollTo={scrollTo}
          title={handleTitle()}
        />
      </View>

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
          {/* skips to dashboard */}
        </TouchableOpacity>
      </View>

    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  secondContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  skipContainer: {
    marginBottom: 50,
    flexDirection: "row",
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
  skip: {
    color: "#625F60",
    fontSize: 14,
    fontFamily: "poppins-medium",
  },
});

export default OnboardingTutorial;
