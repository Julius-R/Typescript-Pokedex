import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import {Pokemon} from './utils/types'
import './App.css';


const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [data, setData] = useState({} as any);
  const fetchPokemon = async (query: number | string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const {weight, types, sprites, name, id, height, stats} = await res.json();
    const dataSet = {
       labels: ['Hp', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
  datasets: [
    {
      label: 'Pokemon Stats',
      data: stats.map((stat: any) => stat.base_stat),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
    }
    setData(dataSet)
    setPokemon({weight, types, sprites, name, id, height, stats});
  }

  const nextPokemon = () => {
    pokemon.id === 898 ? fetchPokemon(1) : fetchPokemon(pokemon.id + 1);
  }
  const previousPokemon = () => {
    pokemon.id === 1 ? fetchPokemon(898) : fetchPokemon(pokemon.id - 1);
  }

  useEffect(() => {
    fetchPokemon(1);
  }, [])
  return (
    <div className="App">
      <p>{pokemon.name}</p>
      {/* <img src={pokemon.sprites.front_default} alt={`default pic of ${pokemon.name}`}/> */}
      <Bar data={data} width={20}
	height={10}/>
      <button onClick={(): void => {
        console.log(pokemon.sprites.front_default)
      }}>Click</button>
      <button onClick={previousPokemon}>Prev</button>
      <button onClick={nextPokemon}>Next</button>
    </div>
  );
}

export default App;
