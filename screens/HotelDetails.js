import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import  firebase from 'firebase';
import '@firebase/firestore';
import firebaseDB from '../database/firebase'
import { Button, Block, Input, Text,SelectDistric} from '../components';
import { theme } from '../constants';


export default class Hoteldetails extends Component {
  state = {
    address: null,
    distric:null,
    hotelname: null,
    password: null,
    errors: [],
    loading: false,
  }

  componentWillMount() {
  //   const { navigation } = this.props;

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (!user) {
  //       navigation.navigate('Login')
  //     }
  //  });

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

      firebase.auth().createUserWithEmailAndPassword(email, password).then(data =>{
        Alert.alert(
          'Success!',
          'Your account has been created',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        )

        firebaseDB.collection("user").doc(email).set({
          userid:data.user.uid,
          email: data.user.email,
          username: username
        })

      }).catch((error) =>{

        Alert.alert(
          'Error!',
          'Email is already in use.Try another Email'
      )
    })
  }
}

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 1]}>
          <Text h1 bold>Hotel Details</Text>
          <Block middle>
          <Input
              label="Hotel Name"
              error={hasErrors('hotelname')}
              style={[styles.input, hasErrors('hotelname')]}
              defaultValue={this.state.hotelname}
              onChangeText={text => this.setState({ hotelname: text })}
            />

            <SelectDistric
              label="Distric"
              error={hasErrors('distric')}
              style={[styles.input, hasErrors('distric')]}
              defaultValue={this.state.hotelname}
              onChangeText={text => this.setState({ hotelname: text })}
            />

            <Input
              label="Address"
              error={hasErrors('address')}
              style={[styles.input, hasErrors('address')]}
              defaultValue={this.state.address}
              onChangeText={text => this.setState({ address: text })}
            />

            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Save</Text>
              }
            </Button>

          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },Picker: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  } 
})
