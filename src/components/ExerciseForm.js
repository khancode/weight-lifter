import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Text, ListItem, Radio, View } from 'native-base';
import { updateExerciseForm } from '../actions';

class ExerciseForm extends Component {

   constructor() {
      super();

      this.onNameChange = this.onNameChange.bind(this);
      this.handleOnPress = this.handleOnPress.bind(this);
   }

   createWeightTypeRadioGroup() {
      const weightTypeRadioGroupArr = [];
      for (let weightTypeName in this.props.radioGroup) {
         const isWeightTypeSelected = this.props.radioGroup[weightTypeName];

         weightTypeRadioGroupArr.push(
            <ListItem
               key={weightTypeName}
               selected={isWeightTypeSelected}
               onPress={() => this.handleOnPress(weightTypeName)}
            >
               <Text>{weightTypeName}</Text>
               <Radio
                  style={styles.radioButton}
                  selected={isWeightTypeSelected}
                  onPress={() => this.handleOnPress(weightTypeName)}
               />
            </ListItem>
         );
      }

      return weightTypeRadioGroupArr;
   }

   onNameChange(text) {
      this.props.updateExerciseForm({ prop: 'name', value: text });
   }

   handleOnPress(weightType) {
      const radioGroup = Object.assign({}, this.props.radioGroup);

      for (const weightTypeName in radioGroup) {
         radioGroup[weightTypeName] = false;
      }

      radioGroup[weightType] = true;

      this.props.updateExerciseForm({ prop: 'radioGroup', value: radioGroup });
   }

   render() {
      return (
         <View>
            <Form>
               <Item stackedLabel>
                  <Label>Exercise Name</Label>
                  <Input onChangeText={this.onNameChange} value={this.props.name} />
               </Item>
               <Item stackedLabel>
                  <Label>Weight Type</Label>
                  {this.createWeightTypeRadioGroup()}
               </Item>
            </Form>
         </View>
      );
   }
}

const styles = {
   radioButton: {
      marginLeft: 7
   }
};

const mapStateToProps = (state) => {
   const { name, radioGroup } = state.exerciseForm;

   return { name, radioGroup };
};

export default connect(mapStateToProps, { updateExerciseForm })(ExerciseForm);
