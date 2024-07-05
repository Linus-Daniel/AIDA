import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { OnboardingData } from "./constants"; // Ensure this is correctly imported
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation();
  const flatlistRef = useRef(null);

  const Slide = ({ item }) => {
    return (
      <View
        style={{
          width: width,
          height: height * 0.75,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <View className="items-center">
          <Text className="font-semibold text-2xl text-white">
            {item.title}
          </Text>
          <Text className="text-center my-10 text-lg text-slate-400">
            {item.description}
          </Text>
        </View>

        <Image
          style={{
            height: "75%",
            width: width,
            resizeMode: "contain",
          }}
          source={item.image}
          alt="image"
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
      navigation.navigate('Login');
    }
  };

  const Footer = () => {
    return (
      <View className="justify-between relative  w-screen px-5 h-[25%]">
        <View className="mb-5 items-center">
          <View className="flex-row justify-between w-[90%] ">
            <TouchableOpacity
              onPress={handleNext}
              className="bg-orange-500  rounded-md p-3 w-full  items-center"
            >
              <Text className=" text-white text-xl font-bold">
                {currentSlide === OnboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ height: height }} className="bg-white py-10">
      <StatusBar backgroundColor={"#F87413"} barStyle={"default"} />
      <TouchableOpacity className="absolute right-8 top-5" onPress={() => navigation.navigate('Register')}>
        <Text className="text-blue-500  text-xl font-bold">Skip</Text>
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
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <Slide key={item.id} item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footer />
    </SafeAreaView>
  );
}
