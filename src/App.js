import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import MainMenu from './components/MainMenu';

class App extends Component {
   render() {
      return (
         <Provider>
            <MainMenu />
         </Provider>
      );
   }
}

export default App;
