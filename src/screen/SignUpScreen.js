import React, {useState} from 'react';
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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const [currency, setCurrency] = useState('Miss');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpFunc = () =>{
    auth().createUserWithEmailAndPassword(email, password).then(()=>{
      Alert.alert("User created")
    })
    .catch((e)=>{
      console.log("Sign up error: " + e)
    })
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
                selectedValue={currency}
                onValueChange={currentCurrency => setCurrency(currentCurrency)}
                dropdownIconColor={'#568f56'}
                style={styles.gender}>
                <Picker.Item color="#568f56" label="Ms" value="Ms" />
                <Picker.Item color="#568f56" label="Miss" value="Miss" />
                <Picker.Item color="#568f56" label="Mr" value="Mr" />
              </Picker>
              {/* Inputs */}
              <Text style={styles.textLogin}>First name:</Text>
              <TextInput style={styles.textInput} />
              <Text style={styles.textLogin}>Last name:</Text>
              <TextInput style={styles.textInput}/>
              <Text style={styles.textLogin}>Email:</Text>
              <TextInput style={styles.textInput} 
                value={email}
                onChangeText={setEmail}
              />
              <Text style={styles.textLogin}>Password:</Text>
              <TextInput style={styles.textInput} 
                value={password}
                onChangeText={setPassword}
              />
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              {/* Login Button & Forgot Password */}
              <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.buttonLogin} onPress={()=>signUpFunc()}>
                  <Text style={styles.textButtonLogin}>Sign Up</Text>
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
    shadowOffset: {width: 0, height: 2},
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
