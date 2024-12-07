import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  Dimensions, PixelRatio, 
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.backgroundContainer}>
            <ImageBackground
              source={require('../img/signUpBackground.jpg')} // Adjust this path
              style={styles.background}>
              <View style={styles.main}>
                <Picker
                  selectedValue={formOfAddress}
                  onValueChange={formOfAddress => setFormOfAddress(formOfAddress)}
                  dropdownIconColor={colorTheme.greenText}
                  style={styles.gender}>
                  <Picker.Item color={colorTheme.greenText} label="Ms" value="Ms" />
                  <Picker.Item color={colorTheme.greenText} label="Mr" value="Mr" />
                </Picker>
  
                <Text style={styles.textLogin}>Username:</Text>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                />
                <Text style={styles.textLogin}>Password:</Text>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Text style={styles.textLogin}>Email:</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                />
                <Text style={styles.textLogin}>Phone:</Text>
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => signUpFunc()}>
                    <Text style={styles.textButtonLogin}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.textButtonLogin}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
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
    backgroundColor: '#fff',
  },
  main: {
    backgroundColor: 'white',
    height: '100%',
    width: '90%',
    borderBottomRightRadius: scale(50),
    borderTopRightRadius: scale(50),
    paddingHorizontal: '10%',
    paddingVertical: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 5,
  },
  textLogin: {
    color: '#568f56',
    fontWeight: '500',
    fontSize: scale(13),
    marginBottom: scale(5),
  },
  textInput: {
    height: scale(40),
    borderBottomWidth: 1,
    borderBottomColor: '#568f56',
    marginBottom: scale(10),
    fontSize: scale(15),
    color: '#333',
  },
  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(50),
  },
  buttonLogin: {
    backgroundColor: '#568f56',
    paddingVertical: scale(10),
    borderRadius: scale(25),
    alignItems: 'center',
    width: '40%',
  },
  textButtonLogin: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: scale(13),
  },
  gender: {
    marginBottom: scale(10),
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure background adapts to screen size
  },
  backgroundContainer: {
    flex: 1,
  },
});

export default SignUpScreen;
