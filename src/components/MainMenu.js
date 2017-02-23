import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
   Container, Button,
   Header, Left, Icon, Body, Title, Right,
   Content,
   Footer, FooterTab
} from 'native-base';

const Dimensions = require('Dimensions');

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

class MainMenu extends Component {

   render() {
      const { menuOptionButtons } = styles;

      return (
         <Container>
            <Header>
               <Left>
                  <Icon name="menu" />
               </Left>
               <Body>
                  <Title>Weight Lifter</Title>
               </Body>
               <Right />
            </Header>

            <Content>
               <View style={{ flex: 1, height: screenHeight-110, justifyContent: 'center', alignItems: 'center' }}>
                  <Button style={menuOptionButtons} block>
                     <Text>Start Workout</Text>
                  </Button>
                  <Button style={menuOptionButtons} block>
                     <Text>Manage Workouts</Text>
                  </Button>
                  <Button style={menuOptionButtons} block>
                     <Text>Statistics</Text>
                  </Button>
               </View>
            </Content>

            <Footer>
               <FooterTab>
                  <Button full>
                     <Text>Footer</Text>
                  </Button>
               </FooterTab>
            </Footer>
         </Container>
      );
   }
}

const styles = {
   menuOptionButtons: {
      margin: 15
   }
};

export default MainMenu;
