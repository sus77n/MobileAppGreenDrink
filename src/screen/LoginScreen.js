import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { adminId, setUserStorage } from "../component/store";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    // Ensure that your webClientId is correctly set.
    GoogleSignin.configure({
      webClientId: "1046745299175-5b64vsicc0k21kck5c2ctpr607v39270.apps.googleusercontent.com",
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Check for Google Play services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Sign in with Google
      const signInResult = await GoogleSignin.signIn();
      console.log("Google Sign-In Result:", signInResult);

      // Check if idToken is available
      let idToken = signInResult.idToken;
      if (!idToken) {
        idToken = signInResult.data?.idToken; // For versions that return a different structure
      }

      if (!idToken) {
        throw new Error("Google Sign-In failed: No ID token returned.");
      }

      // Create a Google credential with the ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log("Firebase User:", userCredential.user);

      // Show success message and navigate
      Alert.alert("Success", "Signed in with Google successfully!");

      const { uid } = res.user;
      if (uid === adminId) {
        navigation.navigate("ManagerTab");
      } else {
        navigation.navigate("UserTab");
      }

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Error", error.message || "An error occurred during Google Sign-In.");
    }
  }

  const loginFunc = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user);
        setUserStorage(res.user)


        Alert.alert("", "Login successfully", [
          {
            text: "Ok",
          },
        ]);

        const { uid } = res.user;
        if (uid === adminId) {
          console.log("Manager");
          navigation.navigate("ManagerTab");
        } else {
          console.log("User");
          navigation.navigate("UserTab");
        }

      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Wrong username or password, try again");
        setEmail("");
        setPassword("");
      });
  };




  return (
    <SafeAreaView style={styles.layout}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.backgroundContainer}>
            <ImageBackground
              source={require("../img/loginBackground.jpg")}
              style={styles.background}
            >
              <Text style={styles.title}>Welcome to Green Drink</Text>
            </ImageBackground>
          </View>

          <View style={styles.main}>
            <Text style={styles.textLogin}>Please log in</Text>
            <TextInput
              placeholder="Number phone"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.loginButtonContainer}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
              <TouchableOpacity style={styles.buttonLogin} onPress={loginFunc}>
                <Text style={styles.textButtonLogin}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <TouchableOpacity
                style={styles.buttonSignUp}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.textButtonSignUp}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGoogle} onPress={onGoogleButtonPress}>
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

  main: {
    backgroundColor: "white",
    height: "100%",
    borderRadius: 50,
    marginTop: -100,
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
