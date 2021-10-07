import React, { useState, useEffect } from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { Radar } from "react-chartjs-2";
import { Pokemon } from "./utils/types";
import "./App.css";

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
	return (
		<Box bg="green.400" maxW="3xl" borderWidth="1px" borderRadius="lg">
			<Flex justifyContent="space-between" alignItems="center" mb="2">
				<Box>
					<Radar data={data} width={40} height={30} />
				</Box>
				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Text fontSize="2xl">{pokemon.name.toUpperCase()}</Text>
						<Text fontSize="2xl">#{trimId(pokemon.id)}</Text>
					</Flex>
					<Image
						boxSize="200px"
						objectFit="cover"
						src={`${pokemon.sprites.front_default}`}
						alt={`default pic of ${pokemon.name}`}
					/>
					<Flex justifyContent="space-between" alignItems="center">
						<Text fontSize="2xl">
							Height: {parseMetrics(pokemon.height)}m
						</Text>
						<Text fontSize="2xl">
							Weight: {parseMetrics(pokemon.weight)}kg
						</Text>
					</Flex>

					{pokemon.types.map((type: any) => (
						<Text fontSize="2xl" key={type.type.name}>
							{type.type.name}
						</Text>
					))}

					<button
						onClick={(): void => {
							console.log(pokemon.sprites.front_default);
						}}>
						Click
					</button>
					<button onClick={previousPokemon}>Prev</button>
					<button onClick={nextPokemon}>Next</button>
				</Box>
			</Flex>
		</Box>
	);
};

export default App;
