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
import { getItemAsync, setItemAsync } from "expo-secure-store";

const OnboardingTutorial = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    getItemAsync("onboarding").then((res) => {
      console.log("Onboarding:", res);
    });
    if (currentIndex < Slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else if (currentIndex === Slides.length - 1) {
      setItemAsync("onboarding", "false");
      navigation.navigate("Login");
    }
  };

  const handleTitle = () => {
    if (currentIndex === Slides.length - 1) {
      return "Get Started";
    } else {
      return "Next";
    }
  };

  const handleSkip = () => {
    setItemAsync("onboarding", "false");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
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
        <NextButton
          buttonColor={true}
          scrollTo={scrollTo}
          title={handleTitle()}
        />
      </View>

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


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
