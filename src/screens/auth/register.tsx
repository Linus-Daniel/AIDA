import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
SafeAreaView

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();

  const averageKeyboardHeight = Platform.select({
    ios: 216,
    android: 200,
    default: 0,
  });

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleRegister = () => {
    const url = "http://192.168.43.167:8000/register";
    const user = {
      name: name,
      email: email,
      password: password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        Alert.alert("Registration successful");
        setName("");
        setEmail("");
        setPassword("");
        navigation.replace("Login");
      })
      .catch((error) => {
        console.error("An error occurred");
        console.error(error);
        Alert.alert("Failed to register");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 200}
      >
        <Pressable onPress={dismissKeyboard} style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Create an account</Text>
            <Text>Start a Healthy journey with us</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons color={"gray"} name="person" size={24} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(name) => setName(name)}
                placeholder="Name"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons color={"gray"} name="mail" size={24} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputWrapper}>
              <AntIcon size={24} color={"gray"} name="lock1" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <View style={styles.bottomRow}>
              <Text>Keep me logged in</Text>
              <Text style={styles.forgotPassword}>Forgot password</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logoContainer: {
    height: 300,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    color: "#041e42",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 70,
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    marginBottom: 20,
    borderColor: "#ccc",
    width: 300,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: 300,
  },
  forgotPassword: {
    color: "blue",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F87413",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginLink: {
    marginTop: 10,
    color: "blue",
  },
});

export default Register;
