/******************************************************************************/
// interacting with DOM
document.addEventListener('DOMContentLoaded', () => {
  let filteredPokemon = [];
  const userSearchField = document.getElementById('pokemon-search-input');
  const pokemonContainer = document.getElementById('pokemon-container');
  userSearchField.addEventListener('input', e => {
    filteredPokemon = Pokemon.all.filter(pokemon => pokemon.name.includes(userSearchField.value));

    const pokemonLis = filteredPokemon.map(pokemon => pokemon.render()).join('');

    pokemonContainer.innerHTML = `<ul>${pokemonLis}</ul>`;
  });

  pokemonContainer.addEventListener('click', e => {
    if (e.target.className.includes('flip-sprite')) {
      let found = filteredPokemon.find(pokemon => pokemon.name === e.target.dataset.pokemonname);
      found.activeSprite = found.activeSprite === found.backSprite ? found.frontSprite : found.backSprite;

      const pokemonLis = filteredPokemon.map(pokemon => pokemon.render()).join('');
      pokemonContainer.innerHTML = `<ul>${pokemonLis}</ul>`;

    }
  });
});
/******************************************************************************/
// interacting with API
// const pokeEndpoint = require('../db.json');
fetch('http://localhost:3000/pokemons')
  .then(response => response.json())
  .then(responseJson => {
    console.log(responseJson[0].sprites.front);
    responseJson.forEach(
      pokemon => {
        new Pokemon(pokemon.name, pokemon.abilities, pokemon.sprites.front, pokemon.sprites.back)
        }
      );
    }
  );
/******************************************************************************/
// storing and manipulating objects in JS memory; browser memory
class Pokemon {
  constructor(name, abilities, frontSprite, backSprite) {
    this.name = name;
    this.abilities = abilities;
    this.frontSprite = frontSprite;
    this.backSprite = backSprite;
    this.activeSprite = this.frontSprite;
    Pokemon.all.push(this);
  }

  render() {
    return `<li>
    <img src="${this.activeSprite}" />
    ${this.name}
    <button class="flip-sprite a" data-pokemonName="${this.name}">Flip It™️</button>
  </li>`;
  }
}

Pokemon.all = [];
