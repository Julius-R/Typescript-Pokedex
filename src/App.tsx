import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Pokemon } from "./utils/types";
import "./styles/styles.sass";

const App = () => {
	const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
	const [data, setData] = useState({} as any);
	const fetchPokemon = async (query: number | string) => {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
		const { weight, types, sprites, name, id, height, stats } =
			await res.json();
		const dataSet = {
			labels: [
				"Hp",
				"Attack",
				"Defense",
				"Sp. Attack",
				"Sp. Defense",
				"Speed"
			],
			datasets: [
				{
					label: `${name.toUpperCase()} Stats`,
					data: stats.map((stat: any) => stat.base_stat),
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1
				}
			]
		};
		setData(dataSet);
		setPokemon({ weight, types, sprites, name, id, height, stats });
	};

	const nextPokemon = () => {
		pokemon.id === 898 ? fetchPokemon(1) : fetchPokemon(pokemon.id + 1);
	};
	const previousPokemon = () => {
		pokemon.id === 1 ? fetchPokemon(898) : fetchPokemon(pokemon.id - 1);
	};

	const parseMetrics = (num: number): string => {
		return `${+(num / 10).toFixed(2)}`;
	};

	const trimId = (id: number): string => {
		if (id < 10) {
			return `00${id}`;
		} else if (id < 100) {
			return `0${id}`;
		} else {
			return `${id}`;
		}
	};

	useEffect(() => {
		fetchPokemon(1);
	}, []);
	console.log(pokemon);
	if (!pokemon.id) return <div>Loading...</div>;
	return (
		<>
			<Bar data={data} width={1} height={5} />

			<p>{pokemon.name.toUpperCase()}</p>
			<p>#{trimId(pokemon.id)}</p>

			<img
				src={`${pokemon.sprites.front_default}`}
				alt={`default pic of ${pokemon.name}`}
			/>

			<p>Height: {parseMetrics(pokemon.height)}m</p>
			<p>Weight: {parseMetrics(pokemon.weight)}kg</p>

			{pokemon.types.map((type: any) => (
				<p key={type.type.name}>{type.type.name}</p>
			))}

			<button
				onClick={(): void => {
					console.log(pokemon.sprites.front_default);
				}}>
				Click
			</button>
			<button onClick={previousPokemon}>Prev</button>
			<button onClick={nextPokemon}>Next</button>
		</>
	);
};

export default App;
