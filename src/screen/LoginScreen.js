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
  Dimensions, PixelRatio,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { adminId, colorTheme, getUser, resetUserAfterChange, setUserStorage, webClientId } from "../component/store";
import { getFirestore } from "@react-native-firebase/firestore";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const { isLogout } = route.params ? route.params : false;
  if (isLogout) {
    console.log("check:", isLogout);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Login",
        }
      ]
    })
  }

  useEffect(() => {
    // Ensure that your webClientId is correctly set.
    GoogleSignin.configure({
      webClientId: webClientId,
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

      // if (!idToken) {
      //   throw new Error("Google Sign-In failed: No ID token returned.");
      // }

      // Create a Google credential with the ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log("Firebase User:", userCredential.user);
      setUserStorage(userCredential.user);

      // Show success message and navigate
      Alert.alert("Success", "Signed in with Google successfully!");

      const { uid } = userCredential.user;
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

    if (!email || !password) {
      Alert.alert("Invalid", "Should fill all the blanks")
      return;
    }

    getFirestore().collection("customers").where("email", "==", email).get()
      .then((querySnapshot) => {

        if (querySnapshot.empty) {
          throw new Error("Email does not exist");
        }
  
        querySnapshot.forEach(async (doc) => {
          const userData = doc.data();
          const userKey = doc.id;
  
          if (password !== userData.password) {
            throw new Error("Wrong password");
          }
  
           await setUserStorage({ ...userData, key: userKey });
  
          if (userKey === adminId) {
            navigation.navigate("ManagerTab");
          } else {
            console.log("User");
            navigation.navigate("UserTab");
          }
  
          Alert.alert("", "Login successfully", [
            {
              text: "Ok",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ]);
        });
      })
      .catch((e) => {
        console.log(e.message);
        Alert.alert("Error", e.message);
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
              placeholder="Email"
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
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size; 

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
    fontSize: scale(35),
    width: "70%",
    marginLeft: scale(30),
    marginTop: scale(100),
    fontWeight: "700",
    color: "#eeefab",
  },

  main: {
    backgroundColor: "white",
    height: "100%",
    borderRadius: scale(50),
    marginTop: scale(-100),
    paddingHorizontal: scale(30),
    paddingVertical: scale(40),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 5,
  },

  textLogin: {
    color: colorTheme.greenText,
    fontWeight: "500",
    fontSize: scale(27),
    marginBottom: scale(20),
  },

  textInput: {
    height: scale(50),
    borderBottomWidth: 1,
    borderBottomColor: colorTheme.greenText,
    marginBottom: scale(20),
    fontSize: scale(16),
    color: "#333",
  },

  loginButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(80),
  },

  forgotPassword: {
    color: "#568f56",
    fontSize: scale(14),
    marginBottom: scale(15),
    justifyContent: "center",
  },

  buttonLogin: {
    backgroundColor: colorTheme.greenText,
    paddingVertical: scale(15),
    borderRadius: scale(25),
    alignItems: "center",
    width: scale(100),
  },

  textButtonLogin: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: scale(15),
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonSignUp: {
    width: scale(100),
    height: scale(50),
    borderWidth: 1,
    borderColor: colorTheme.greenText,
    borderRadius: scale(25),
    justifyContent: "center",
    alignItems: "center",
  },

  textButtonSignUp: {
    color:colorTheme.greenText,
    fontWeight: "600",
    fontSize: scale(16),
  },

  buttonGoogle: {
    width: scale(200),
    height: scale(50),
    borderWidth: 1,
    borderColor: colorTheme.greenText,
    borderRadius: scale(25),
    justifyContent: "center",
    alignItems: "center",
  },

  textButtonGg: {
    color: colorTheme.greenText,
    fontWeight: "600",
    fontSize: scale(16),
  },
});


export default LoginScreen;
