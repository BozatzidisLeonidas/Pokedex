import React, { Component , }  from 'react';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignInPage/SignIn';
import Register from './Components/RegisterPage/Register'
import Api from './Components/Api/Api';
import Info from './Components/Info/Info';
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
    selectedPokemon: null,
    }
  }

  handlePokemonSelect = (pokemon) => {
    this.setState({ selectedPokemon: pokemon });
  };
  
  render(){
    return (
      <div className="App">
        <Navigation />
        <Api onPokemonSelect={this.handlePokemonSelect} />
        {this.state.selectedPokemon && 
        <Info pokemon={this.state.selectedPokemon} />}
        {/* <Register />
        <SignIn /> */}

      </div>
    );
  } 
}

export default App;
