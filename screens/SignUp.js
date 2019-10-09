import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet,Picker} from 'react-native';
import  firebase from 'firebase';
import '@firebase/firestore';
import firebaseDB from '../database/firebase'
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';


export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
    bussinesType:'hotel'
  }

  componentDidMount() {
    const { navigation } = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Browse')
      }
   });

  }


  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');

    this.setState({ errors, loading: false });

    if (!errors.length) {

    //   firebase.auth().createUserWithEmailAndPassword(email, password).then(data =>{
    //     Alert.alert(
    //       'Success!',
    //       'Your account has been created,Now add the hotel details please',
    //       [
    //         {
    //           text: 'Continue', onPress: () => {
    //             navigation.navigate('HotelDetails')
    //           }
    //         }
    //       ],
    //       { cancelable: false }
    //     )

    //     firebaseDB.collection("user").doc(email).set({
    //       userid:data.user.uid,
    //       email: data.user.email,
    //       username: username
    //     })

    //   }).catch((error) =>{

    //     Alert.alert(
    //       'Error!',
    //       'Email is already in use.Try another Email'
    //   )
    // })

    Alert.alert(
      'Success!',
      'Your account has been created,Now add the hotel details please',
      [
        {
          text: 'Continue', onPress: () => {
            if(this.state.bussinesType==='hotel'){
              navigation.navigate('Hoteldetails')
            }else if(this.state.bussinesType==='car'){
              navigation.navigate('CardDetail')
            }else if(this.state.bussinesType==='guide'){
              navigation.navigate('GuideDetails')
            }
            
          }
        }
      ],
      { cancelable: false }
    )
  }

  
}

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[2, theme.sizes.base * 2]}>
          <Text h1 bold>Sign Up</Text>
          <Block middle style={[styles.header]}>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Name"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />

            <Block flex={false}>
                <Text gray2>Bussines Type</Text>
            </Block>
            <Picker
              selectedValue={this.state.bussinesType}
              style={{fontSize: theme.sizes.font,
                fontWeight: '500',
                color: theme.colors.black }}
              onValueChange={(itemValue, itemIndex) => this.setState({ bussinesType: itemValue })}>
                <Picker.Item label="Select Bussiness Type" value=""/>
                <Picker.Item label="Hotel" value="hotel"/>
                <Picker.Item label="Car Rental" value="car" />
                <Picker.Item label="Tour Guid" value="guide" />
            </Picker>

            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Create Account</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
    }
}

const styles = StyleSheet.create({
  signup: {
    flex:2,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  header: {
    marginTop: 50,
  }
})

