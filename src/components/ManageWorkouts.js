import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, ListItem, Text, Right, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getWorkouts } from '../actions';

class ManageWorkouts extends Component {
   constructor() {
      super();

      this.state = {
         showSpinner: false
      };

      this.onListItemPress = this.onListItemPress.bind(this);
      this.hideSpinner = this.hideSpinner.bind(this);
   }

   componentWillMount() {
      this.props.getWorkouts();
   }

   showWorkouts() {
      const { workouts } = this.props;

      return workouts.map((workout) => {
         return (
            <ListItem key={workout.uuid} button onPress={() => this.onListItemPress(workout)}>
               <Text>{workout.name}</Text>
               <Right>
                  <Icon name="arrow-forward" />
               </Right>
            </ListItem>
         );
      });
   }

   onListItemPress(workout) {
      Actions.editWorkout({ workout, afterComponentUnmounts: this.hideSpinner });

      this.setState({ showSpinner: true });
   }

   hideSpinner() {
      this.setState({ showSpinner: false });
   }

   showSpinner() {
      this.setState({ showSpinner: true });
   }

   render() {
      return (
         <Container>
            <Header />

            <Content>
               {
                  this.state.showSpinner
                  ? <Spinner color="blue" />
                  : this.showWorkouts()
               }
            </Content>
         </Container>
      );
   }

}

const mapStateToProps = (state) => {
   const { workouts } = state;

   return { workouts };
};

export default connect(mapStateToProps, { getWorkouts })(ManageWorkouts);
