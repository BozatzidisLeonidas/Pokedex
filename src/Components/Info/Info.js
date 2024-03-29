import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Info.css';
import White from '../../Images/White.png';
import { catchPokemon } from '../../Services/services';

class Info extends Component {
  constructor(props) {
    super(props);
    // Bind toggleModal and updatePokemonList functions
    this.toggleModal = this.props.toggleModal;
    this.updatePokemonList = this.props.updatePokemonList;
  }

  // toggleModal=this.props.toggleModal //this also works instead of constructor

  //epishs this.props.toggleModal === props.toggleModal

  // Toast options
  toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  }

  // Catch Pokemon function
  onCatch = async (pokemonName) => {
    const sessionToken = localStorage.getItem('token');
    try {
      // Call catchPokemon service
      const data = await catchPokemon(pokemonName, sessionToken);
      if (data.success) {
        // Display success toast
        toast.success(data.message, this.toastOptions);
        console.log(pokemonName);
      } else {
        // Display error toast and update pokemon list
        toast.error(data.message, this.toastOptions);
        this.updatePokemonList(data.pokemonList);
        this.toggleModal();
      }
    } catch (error) {
      console.error('Error at Info.js onCatch function:', error);
    }
  }

  render() {
    const { id, image, name, type, stats, height, weight } = this.props.pokemon;
    const formattedTypes = type.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');

    return (
      <div id="allInfo">
        {/* Pokemon information */}
        <div id="topBar">
          <img src={image} alt="topBar" />
          <div id="Id">
            <p>Νο. {id}</p>
          </div>
          <div id="Name">
            <p>{name}</p>
          </div>
          <img src={White} alt="pokeball" />
        </div>
        <div id="imageBig">
          <img src={image} alt="bigImage" />
        </div>
        <div className="typeFull">
          <div className="type">
            <div className="typeText">
              <p>Type(s)</p>
            </div>
            <div className="typeVar">
              <p>{formattedTypes}</p>
            </div>
          </div>
        </div>
        <div className="typeFull">
          <div className="type">
            <div className="typeText">
              <p>Height</p>
            </div>
            <div className="typeVar">
              <p>{height} m</p>
            </div>
          </div>
        </div>
        <div className="typeFull">
          <div className="type">
            <div className="typeText">
              <p>Weight</p>
            </div>
            <div className="typeVar">
              <p>{weight} Kg</p>
            </div>
          </div>
        </div>
        <div id="statsTable">
          <table>
            <tbody>
              {stats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}</td>
                  <td>{stat.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Catch button */}
        <div className="black b pv2 bb bw3 b--mid-gray br2" id="CatchButton" onClick={() => { this.onCatch(name); }}>
          <div className="textCenter">
            <p>Catch!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
