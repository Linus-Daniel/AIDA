import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { OnboardingData } from "./constants"; // Ensure this is correctly imported
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation();
  const flatlistRef = useRef(null);

  const Slide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.centeredItems}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Image
          style={styles.image}
          source={item.image}
          resizeMode="contain"
        />
      </View>
    );
  };

  const handleNext = () => {
    if (currentSlide < OnboardingData.length - 1) {
      const nextScreen = currentSlide + 1;
      const offset = nextScreen * width;
      flatlistRef.current.scrollToOffset({ offset });
      setCurrentSlide(nextScreen);
    } else {
      navigation.navigate("Login");
    }
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <TouchableOpacity
            onPress={handleNext}
            style={currentSlide === OnboardingData.length - 1 ? styles.getStartedButton : styles.nextButton}
          >
            <Text style={styles.buttonText}>
              {currentSlide === OnboardingData.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F87413" barStyle="default" />
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <FlatList
        pagingEnabled
        ref={flatlistRef}
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const currentIndex = Math.round(contentOffsetX / width);
          setCurrentSlide(currentIndex);
        }}
        data={OnboardingData}
        contentContainerStyle={styles.flatListContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    height: height,
    backgroundColor: "#ffffff",
    paddingTop: 10,
  },
  skipButton: {
    position: "absolute",
    right: 8,
    top: 5,
  },
  skipText: {
    color: "#3182CE",
    fontSize: 20,
    fontWeight: "bold",
  },
  slide: {
    width: width,
    height: height * 0.75,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  centeredItems: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#718096",
    textAlign: "center",
    marginBottom:100
  },
  image: {
    height: "75%",
    width: width,
  },
  footer: {
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    paddingHorizontal: 5,
    bottom: 0,
    height: "25%",
  },
  footerContent: {
    marginBottom: 5,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContainer: {
    height: height * 0.75,
  },
});

export default Onboarding;
