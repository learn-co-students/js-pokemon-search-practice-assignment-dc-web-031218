document.addEventListener("DOMContentLoaded", function() {
	fetch("http://localhost:3000/pokemons")
	  .then(r=>r.json())
	  .then(json => {
	  	json.forEach(pokemon=>{
	  		let temp = new Pokemon(pokemon.name, 
	  					   pokemon.sprites.front, 
	  					   pokemon.sprites.back);
	  	});
	  })
	  .then(() => {
	    let searchBar = document.querySelector('#pokemon-search-input');
	    let pokeDiv = document.querySelector('#pokemon-container');
	    let matchedPokemon = [];
		searchBar.addEventListener('input', event=>{
			matchedPokemon = allPokemon.filter(p=> p.name.includes(event.target.value));
			console.log(matchedPokemon);
			renderPokemon(matchedPokemon);
		})

		pokeDiv.addEventListener('click', event=>{
			if(event.target.classList.contains('flip')){
				console.log("Flipped!");
				console.log(event.target);
				console.log(event.target.dataset.id);
				Pokemon.flipPokemon(event.target.dataset.id);
				let divIdStr = "[" + `data-did="${event.target.dataset.id}"`+"]";
				let tempDiv = document.querySelector(divIdStr);
				let newUrl = Pokemon.getPokemon(event.target.dataset.id).activeSprite;
				tempDiv.children[0].src = newUrl;		
			}
		})
	  })
 
});



let pokemonId = 0;
let allPokemon = [];

class Pokemon{
	constructor(name, frontSprite, backSprite){
		this.id = ++pokemonId;
		this.name = name;
		this.frontSprite = frontSprite;
		this.backSprite = backSprite;
		this.activeSprite = frontSprite;
		allPokemon.push(this);
	}
	static getPokemon(id){
		return allPokemon.find(p=>p.id === parseInt(id));
	}
	static flipPokemon(id){
		let temp = Pokemon.getPokemon(id);
		temp.activeSprite === temp.frontSprite ? temp.activeSprite = temp.backSprite : temp.activeSprite = temp.frontSprite
	}	
}

function renderPokemon(arr){
	let str = "";
	arr.forEach(p=> str+= `<div data-did=${p.id}><img src=${p.activeSprite}></br>${p.name}<button class="flip" data-id=${p.id}>Flip</button></div>`);
	document.querySelector('#pokemon-container').innerHTML = str;
}