// Vamos lá!
const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

/*
async function getApi() {
  //const dados = await fetch(getPokemonUrl);
  //console.log(dados);

  fetch(getPokemonUrl)
    .then((response) => response.json())
    .then((dados) => console.log(dados));
}

getApi();
*/

const fetchPokemon = () => {
  const pokemonPromises = [];

  for (let i = 1; i <= 151; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  Promise.all(pokemonPromises).then((pokemons) => {
    const listPokemons = pokemons.reduce((acummulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      acummulator += `
                        <li class = "card ${types[0]}">
                        <img class "card-image" alt="${pokemon.name}"
                        src="https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${
                          pokemon.id
                        }.png">
                        <h2 class = "card-tittle">${pokemon.id} ${
        pokemon.name
      }</h2>
                        <p class="card-subtittle">${types.join(" | ")}</p>
                        </li>`;
      return acummulator;
    }, "");

    const ul = document.querySelector('[data="pokedex"]');
    ul.innerHTML = listPokemons;
  });
};

fetchPokemon();
