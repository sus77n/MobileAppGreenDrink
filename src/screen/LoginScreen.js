import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.layout}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Background Image Section */}
          <View style={styles.backgroundContainer}>
            <ImageBackground
              source={require("../img/loginBackground.jpg")} // Adjust this path
              style={styles.background}
            >
              <Text style={styles.title}>Welcome to Green Drink</Text>
            </ImageBackground>
          </View>

          {/* Main Login Form */}
          <View style={styles.main}>
            <Text style={styles.textLogin}>Please log in</Text>

            {/* Inputs */}
            <TextInput placeholder="Number phone" style={styles.textInput} />
            <TextInput placeholder="Password" style={styles.textInput} secureTextEntry />

            {/* Login Button & Forgot Password */}
            <View style={styles.loginButtonContainer}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
              <TouchableOpacity style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up & Google Login */}
            <View style={styles.signUpContainer}>
              <TouchableOpacity style={styles.buttonSignUp}>
                <Text style={styles.textButtonSignUp}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGoogle}>
                <Text style={styles.textButtonGg}>Connect with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Background Image
  backgroundContainer: {
    height: "60%",
  },

  background: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 35,
    width: "70%",
    marginLeft: 30,
    marginTop: 100,
    fontWeight: "700",
    color: "#eeefab",
  },

  // Main Login Form
  main: {
    backgroundColor: "white",
    height: "100%",
    borderRadius: 50,
    marginTop: -100, // Overlap with the background
    paddingHorizontal: 30,
    paddingVertical: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  textLogin: {
    color: "#568f56",
    fontWeight: "500",
    fontSize: 27,
    marginBottom: 20,
  },

  textInput: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#568f56",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },

  loginButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },

  forgotPassword: {
    color: "#568f56",
    fontSize: 14,
    marginBottom: 15,
    justifyContent: "center",
  },

  buttonLogin: {
    backgroundColor: "#568f56",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: 100,
    height: 50,
  },

  textButtonLogin: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonSignUp: {
    width: 100,
    height: 50,
    borderWidth: 1,
    borderColor: "#568f56",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  textButtonSignUp: {
    color: "#568f56",
    fontWeight: "600",
    fontSize: 16,
  },

  buttonGoogle: {

    width: 240,
    height: 50,
    borderWidth: 1,
    borderColor: "#568f56",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  textButtonGg: {
    color: "#568f56",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default LoginScreen;
