import React, { useState, useEffect } from 'react';
import "./PokemonList.css";
import White from '../../Images/White.png';

const PokemonList = ({ onPokemonSelect }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('http://localhost:3000/pokemonList');
        const { success, pokemon } = await response.json();
        if (success) {
          setPokemonList(pokemon);
        } else {
          console.error('Error fetching Pokemon list');
        }
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleCardClick = (pokemon) => {
    onPokemonSelect(pokemon);
  };

  return (
    <div className="pokemon-list-container">
      {pokemonList.map((pokemon, index) => (
        <div id='container' key={index} onClick={() => handleCardClick(pokemon)}>
          <div id='all'>
            <div id='imageName'>
              <img src={pokemon.image} alt={pokemon.name} />
              <div id='id'>
                <p>No. {pokemon.id}</p>
              </div>
            </div>   
            <div id='name'>
              <p>{pokemon.name}</p>
            </div> 
            <div id='caught'>
              <img src={White} alt='pokeball' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
