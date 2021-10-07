type sprites = {
	front_default: string;
	back_default: string;
	front_shiny: string;
	back_shiny: string;
};

type pokeType = {
	name: string;
	url: string;
};

type stat = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
};

export interface Pokemon {
	weight: number;
	types: pokeType[];
	sprites: sprites;
	name: string;
	id: number;
	height: number;
	stats: stat[];
}
