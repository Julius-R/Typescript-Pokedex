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
					backgroundColor: "rgba(30,29,29,1)",
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

	if (!pokemon.id) return <div>Loading...</div>;
	return (
		<div className="container">
			<section className="pokemon">
				<section className="pokemon__stats">
					<Bar data={data} height={250} />
				</section>

				<section className="pokemon__info">
					<section className="pokemon__heading">
						<p>{pokemon.name.toUpperCase()}</p>
						<p>#{trimId(pokemon.id)}</p>
					</section>

					<section className="pokemon__image">
						<img
							src={`${pokemon.sprites.front_default}`}
							alt={`default pic of ${pokemon.name}`}
						/>
					</section>

					<section className="pokemon__data">
						<section className="pokemon__types">
							{pokemon.types.length === 1 ? (
								<p>Type</p>
							) : (
								<p>Types</p>
							)}
							<ul>
								{pokemon.types.map((type: any) => (
									<li key={type.type.name}>
										{type.type.name}
									</li>
								))}
							</ul>
						</section>

						<section className="pokemon__biology">
							<p>Height: {parseMetrics(pokemon.height)}m</p>
							<p>Weight: {parseMetrics(pokemon.weight)}kg</p>
						</section>
					</section>

					<section className="toggle-btns">
						<button className="btn" onClick={previousPokemon}>
							Prev
						</button>
						<button className="btn" onClick={nextPokemon}>
							Next
						</button>
					</section>
				</section>
			</section>
		</div>
	);
};

export default App;
