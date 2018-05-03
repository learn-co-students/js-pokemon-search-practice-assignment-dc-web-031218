document.addEventListener("DOMContentLoaded", function() {

})


/***************************/
// dom manipulation

// update what pokemon are showing based on search bar content
let searchInputField = document.getElementById("pokemon-search-input");
let searchResultsDiv = document.getElementById("pokemon-container");
searchInputField.addEventListener("input", event => {
  // filter Pokemon.all by the current value of searchInputField
  console.log("searchInputField value is:", searchInputField.value)
  let filteredList = Pokemon.all.filter( pokemon => {
    // return those pokemon whose names include the string that is the value of searchInputField
    return pokemon.name.includes(searchInputField.value);
  }); // <-- end of filter

  // for each item in filteredList, display it in the DOM
  // need to use the Pokemon render method

  let mappedLis = filteredList.map(pokemon => pokemon.render());
  console.log("current mappedLis:", mappedLis);

  let joinedLis = mappedLis.join("")
  let finalString = "<ul>" + joinedLis + "</ul>";
  searchResultsDiv.innerHTML = joinedLis;

}); // <-- end of searchInputField.addEventListener

// be able to toggle which sprite is showing (use one event and do control flow, do not make 150)
// when clicking on the sprite
searchResultsDiv.addEventListener("click", event => {
  event.stopPropagation();
  console.log("event.target is:", event.target);
  if (event.target.classList.contains("sprite")) {
    // toggle that joint

    // have to grab correct Pokemon class instance
    // filter Pokemon.all for dataset.pokenum === pokemon.id (?)
    let targetPokemon = Pokemon.all.filter(pokemon => {
      return pokemon.order == event.target.dataset.pokenum;
    })[0]; // <-- end of Pokemon.all.filter, with 0th index selected

    // have to toggle activeSprite
    targetPokemon.spriteToggle();
    event.target.src = targetPokemon.activeSprite;
  } // <-- end of if statement
}); // <-- end of searchResultsDiv.addEventListener


/***************************/
// api interaction

let allPokemon= fetch("http://localhost:8000/db.json");
allPokemon.then(response => response.json()).then(json => {
  json.pokemons.forEach(pokemon => {
    new Pokemon(pokemon.name, pokemon.order, pokemon.sprites);
  }) // <-- end of forEach

}); // <-- end of .then chain


/***************************/
// data manipulation

class Pokemon {
  constructor (name, order, sprites) {
    this.name = name;
    this.order = order;
    this.frontSprite = sprites.front;
    this.backSprite = sprites.back;
    this.activeSprite = this.frontSprite;
    Pokemon.all.push(this);
  }

  // render method
  render () {
    // returns a string representing an li HTML element containing the Pokemon's name and image.
    return `<li><img data-pokenum="${this.order}" class="sprite" src="${this.activeSprite}"/>${this.name}</li>`;
  }

  // activeSprite functionality
  spriteToggle () {
    if (this.activeSprite === this.frontSprite) {
      this.activeSprite = this.backSprite;
    } else {
      this.activeSprite = this.frontSprite;
    };
  }
}

Pokemon.all = [];
