import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
   Container, Button, Text, View,
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
            {/*<Header>
               <Left>
                  <Icon name="menu" />
               </Left>
               <Body>
                  <Title>Weight Lifter</Title>
               </Body>
               <Right />
            </Header>*/}

            <Content>
               <View style={{ flex: 1, height: screenHeight, justifyContent: 'center', alignItems: 'center' }}>
                  <Button style={menuOptionButtons} onPress={() => Actions.startWorkout()} block>
                     <Text>Start Workout</Text>
                  </Button>
                  <Button style={menuOptionButtons} onPress={() => Actions.manageWorkouts()} block>
                     <Text>Manage Workouts</Text>
                  </Button>
                  <Button style={menuOptionButtons} onPress={() => Actions.manageExercises()} block>
                     <Text>Manage Exercises</Text>
                  </Button>
                  <Button style={menuOptionButtons} block>
                     <Text>Statistics</Text>
                  </Button>
               </View>
            </Content>

            {/*<Footer>
               <FooterTab>
                  <Button full>
                     <Text>Footer</Text>
                  </Button>
               </FooterTab>
            </Footer>*/}
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
