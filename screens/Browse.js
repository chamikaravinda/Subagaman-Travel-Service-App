import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import firebase from 'firebase';
import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';
import OrderIcon from '../assets/icons/order.png'
import serivceIcon from '../assets/icons/service.png'
import earnIcon from '../assets/icons/earn.png'
import addOrderIcon from '../assets/icons/add_order.png'


const { width } = Dimensions.get('window');

class Browse extends Component {
  static navigationOptions = {
    header: null,
  }
  
  state = {
    active: 'Products',
    categories: [],
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories });

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate('Browse')
      }
   });
    
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(
      category => category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ['Orders', 'Inspirations', 'Shop'];

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>WOW Trips</Text>
          <Button onPress={() => navigation.navigate('Settings')}>
            <Image
              source={profile.avatar}
              style={styles.avatar}
            />
          </Button>
        </Block>

        {/* <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(  ))}
        </Block> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >


          {/* <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Explore', { category })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image source={category.image} />
                  </Badge>
                  <Text medium height={20}>{category.name}</Text>
                  <Text gray caption>{category.count} products</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block> */}
              <Block flex={false} row space="between" style={styles.categories}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Orders')}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="#FFFFFF">
                    <Image source={OrderIcon} />
                  </Badge>
                  <Text medium height={20}>Orders</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Service')}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="#FFFFFF">
                    <Image source={serivceIcon} />
                  </Badge>
                  <Text medium height={20}>Service</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Earnings')}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="#FFFFFF">
                    <Image source={earnIcon} />
                  </Badge>
                  <Text medium height={20}>Earnings</Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate('Explore', { category })}
              ><Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="#FFFFFF">
                    <Image source={addOrderIcon} />
                  </Badge>
                  <Text medium height={20}>New Order</Text>
                </Card>
                </TouchableOpacity>
              </Block>
        </ScrollView>
      </Block>
    )
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    marginTop:80
  },
  subHeader: {
    paddingHorizontal: theme.sizes.base * 2,
    marginTop:10
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,  
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  }
})
