/*
import React from 'react';
import logo from './logo.svg';




import './App.css';



function App() {
  return (
    <div className="App">
      
      123
    </div>
  );
}

export default App;

*/
import React, { Component } from 'react'
import axios from 'axios';

import { Header, Icon, List } from 'semantic-ui-react'

export class App extends Component {

  state = {
    values : []
 }
  
  componentDidMount(){

    axios.get('http://localhost:5000/api/values')
      .then((response) => {        
        this.setState({
          values : response.data    
        })
      } )
  }

  render() {
    return (
      <div>

        <Header as='h2'>
          <Icon name='plug' />
          <Header.Content>Reactivities</Header.Content>
        </Header>

        <List>
            { this.state.values.map((value:any ) => ( <List.Item key={value.id}>{value.name}</List.Item> ) )}
        </List>

        

      </div>
    )
  }
}

export default App
