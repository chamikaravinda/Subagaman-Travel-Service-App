import React, { Component } from 'react'
import { Image, StyleSheet, ScrollView, TextInput,ActivityIndicator,KeyboardAvoidingView,Picker } from 'react-native'
import Slider from 'react-native-slider';
import  firebase from 'firebase';
import '@firebase/firestore';
import firebaseDB from '../database/firebase'
import { Divider, Button, Block, Text, Switch,Input } from '../components';
import { theme, mocks } from '../constants';

class HotelRoomDetails extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
    errors: [],

    //new state
    distric:'',
    sex:''

  }

  componentDidMount() {
    const { navigation } = this.props;

    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }

  handleAddRoomDetails() {
    const { navigation } = this.props;
    const errors = [];

    firebase.auth().signOut();
    navigation.navigate('Login');

  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      )
    }

    return <Text bold>{profile[name]}</Text>
  }

  render() {
    const { profile, editing } = this.state;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    const { navigation } = this.props;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>Add Room</Text>
        </Block>

        <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                  <Input
                  label="Room Name"
                  error={hasErrors('hotelname')}
                  style={[styles.input, hasErrors('hotelname')]}
                  defaultValue={this.state.hotelname}
                  onChangeText={text => this.setState({ hotelname: text })}
                />
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Input
                    label="No of Beds"
                    error={hasErrors('vehicalOwnerAddress')}
                    style={[styles.input, hasErrors('vehicalOwnerAddress')]}
                    defaultValue={this.state.vehicalNumber}
                    onChangeText={text => this.setState({ vehicalOwnerAddress: text })}
                    />
              </Block>
            </Block> 
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Input
                    label="Half Board Price "
                    error={hasErrors('vehicalOwnerAddress')}
                    style={[styles.input, hasErrors('vehicalOwnerAddress')]}
                    defaultValue={this.state.vehicalNumber}
                    onChangeText={text => this.setState({ vehicalOwnerAddress: text })}
                    />
              </Block>
            </Block> 
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Input
                    label="Full Board Price"
                    error={hasErrors('vehicalOwnerAddress')}
                    style={[styles.input, hasErrors('vehicalOwnerAddress')]}
                    defaultValue={this.state.vehicalNumber}
                    onChangeText={text => this.setState({ vehicalOwnerAddress: text })}
                    />
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Block flex={false}>
                    <Text gray2>Type</Text>
                </Block>
                <Picker
                  selectedValue={this.state.distric}
                  style={{fontSize: theme.sizes.font,
                    fontWeight: '500',
                    color: theme.colors.black }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ bussinesType: distric })}>
                    <Picker.Item label="A/C" value="colombo"/>
                    <Picker.Item label="Non A/C" value="anuradhapura"/>
                </Picker>
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Block flex={false}>
                    <Text gray2>A/C or Non A/C</Text>
                </Block>
                <Picker
                  selectedValue={this.state.distric}
                  style={{fontSize: theme.sizes.font,
                    fontWeight: '500',
                    color: theme.colors.black }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ bussinesType: distric })}>
                    <Picker.Item label="A/C" value="colombo"/>
                    <Picker.Item label="Non A/C" value="anuradhapura"/>
                </Picker>
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Block flex={false}>
                    <Text gray2>Description</Text>
                </Block>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Add your room description"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                />
              </Block>
            </Block>
            <Block middle style={styles.toggles}>
              <Button gradient onPress={() => this.handleAddRoomDetails()}>
                  <Text bold white center>Add Room</Text>
              </Button>
            </Block>         
          </Block>         
        </ScrollView>
        </KeyboardAvoidingView>
      </Block>
    )
  }
}

HotelRoomDetails.defaultProps = {
  profile: mocks.profile,
}

export default HotelRoomDetails;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end'
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3,
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
  textAreaContainer: {
    borderColor:  theme.colors.gray2,
    borderWidth: 3,
    padding: 5
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start"
  }
})
