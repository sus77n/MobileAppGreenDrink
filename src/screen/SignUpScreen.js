import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { colorTheme } from '../component/store';
import bcrypt from "bcryptjs";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [formOfAddress, setFormOfAddress] = useState('Mr');
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const signUpFunc = async () => {

    try {
      if (!username || !email || !password || !phone) {
        throw new Error("Please fill all the information.");
      }

      const db = firestore();

      const existedUsername = await db.collection("customers")
        .where("username", "==", username)
        .get();

      if (!existedUsername.empty) {
        throw new Error("Existed username");
      }

      const existedPhone = await db.collection("customers")
        .where("email", "==", email)
        .get();
      const existedEmail = await db.collection("customers")
        .where("phone", "==", phone)
        .get();
      if (!existedPhone.empty || !existedEmail.empty) {
        throw new Error("Existed user");
      }


      await db.collection("customers").add({
        username: username,
        password: password,
        email: email,
        phone: phone,
        formOfAddress: formOfAddress, //Mr or Ms
        balance: 0,
        stars: 0,
        totalStars: 0,
        createAt: date,
      })
      Alert.alert("Successful", "Sign up successfully")
      navigation.pop();

    } catch (error) {
      Alert.alert("Error", error.message);
    }

  }

  return (
    <SafeAreaView style={styles.layout}>
      <View>
        {/* Background Image Section */}
        <View style={styles.backgroundContainer}>
          <ImageBackground
            source={require('../img/signUpBackground.jpg')} // Adjust this path
            style={styles.background}>
            {/* <Text style={styles.title}>Welcome to Green Drink</Text> */}
            <View style={styles.main}>
              {/* <Text style={styles.textLogin}>Please log in</Text> */}
              <Picker
                selectedValue={formOfAddress}
                onValueChange={formOfAddress => setFormOfAddress(formOfAddress)}
                dropdownIconColor={colorTheme.greenText}
                style={styles.gender}>
                <Picker.Item color={colorTheme.greenText} label="Ms" value="Ms" />
                <Picker.Item color={colorTheme.greenText} label="Mr" value="Mr" />
              </Picker>
              {/* Inputs */}
              <Text style={styles.textLogin}>Username:</Text>
              <TextInput style={styles.textInput} value={username} onChangeText={setUsername}></TextInput>
              <Text style={styles.textLogin}>Password:</Text>
              <TextInput style={styles.textInput} value={password} onChangeText={setPassword} ></TextInput>
              <Text style={styles.textLogin}>Email:</Text>
              <TextInput style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
              <Text style={styles.textLogin}>Phone:</Text>
              <TextInput style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
              />
              {/* Login Button & Forgot Password */}
              <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => signUpFunc()}>
                  <Text style={styles.textButtonLogin}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.goBack()}>
                  <Text style={styles.textButtonLogin}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Main Login Form */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Background Image
  backgroundContainer: {
  },

  background: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 35,
    width: '70%',
    marginLeft: 30,
    marginTop: 10,
    fontWeight: '700',
    color: '#eeefab',
  },
  // Main Login Form
  main: {
    backgroundColor: 'white',
    height: '100%',
    width: '90%',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textLogin: {
    color: '#568f56',
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#568f56',
    marginBottom: 20,
    fontSize: 20,
    color: '#333',
  },
  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  forgotPassword: {
    color: '#568f56',
    fontSize: 14,
    marginBottom: 15,
    justifyContent: 'center',
  },
  buttonLogin: {
    backgroundColor: '#568f56',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: 100,
    height: 50,
  },
  textButtonLogin: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSignUp: {
    width: 100,
    height: 50,
    borderWidth: 1,
    borderColor: '#568f56',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonSignUp: {
    color: '#568f56',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonGoogle: {
    width: 240,
    height: 50,
    borderWidth: 1,
    borderColor: '#568f56',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonGg: {
    color: '#568f56',
    fontWeight: '600',
    fontSize: 16,
  },

  gender: {
    marginBottom: 4,
  },
});

export default SignUpScreen;
