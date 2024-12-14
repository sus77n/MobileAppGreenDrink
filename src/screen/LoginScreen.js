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
import { adminId, colorTheme, getTimeNow, getUser, LoadingScreen, resetUserAfterChange, setUserStorage, webClientId } from "../component/store";
import { getFirestore, firestore, doc } from "@react-native-firebase/firestore";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("peter@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
    hasUser();
  }, []);

  const hasUser = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      if (user !== null) {
        if (user.key === adminId) {
          navigation.navigate("ManagerTab");
        } else {
          navigation.navigate("UserTab");
        }
      } 
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  const onGoogleButtonPress = async () => {
    setLoading(true)
    try {
      await GoogleSignin.hasPlayServices();
      const googleData = await GoogleSignin.signIn();
      const user = googleData.data.user;

      const { email, name, photo } = user;

      const existed = await getFirestore().collection("customers")
        .where("email", "==", email)
        .get();

      if (existed.empty) {
        console.log(user);
        await getFirestore().collection("customers").add({
          username: name,
          password: null,
          email: email,
          phone: null,
          formOfAddress: "Mr",
          balance: 0,
          stars: 0,
          totalStars: 0,
          createAt: getTimeNow(),
          vouchers: [],
        });
      }

      const querySnapshot = await getFirestore()
        .collection("customers")
        .where("email", "==", email)
        .get();

      let userData = null;
      let userKey = null;

      querySnapshot.forEach(doc => {
        userData = doc.data();
        userKey = doc.id;
      });

      await setUserStorage({ ...userData, key: doc.id });

      if (userKey === adminId) {
        navigation.navigate("ManagerTab");
      } else {
        navigation.navigate("UserTab");
      }
    } catch (error) {
      console.error("Google Authentication Error:", error.message);
      Alert.alert("Error", error.message);
    }
    setLoading(false)
  };



  const loginFunc = async () => {
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("All fields must be filled.");
      }

      const querySnapshot = await getFirestore()
        .collection("customers")
        .where("email", "==", email)
        .get();

      if (querySnapshot.empty) {
        setEmail("");
        setPassword("");
        throw new Error("Email does not exist.");
      }

      let userData = null;
      let userKey = null;

      querySnapshot.forEach(doc => {
        userData = doc.data();
        userKey = doc.id;
        console.log("user: ", userData);
      });

      if (!userData || password !== userData.password) {
        setPassword("");
        throw new Error("Incorrect password.");
      }

      await setUserStorage({ ...userData, key: userKey });

      if (userKey === adminId) {
        navigation.navigate("ManagerTab");
      } else {
        navigation.navigate("UserTab");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.layout}>
      <LoadingScreen visible={loading} />
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
              <TouchableOpacity style={styles.buttonLogin} onPress={() => loginFunc()}>
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
    color: colorTheme.greenText,
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
