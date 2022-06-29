"use strict";

const url = "https://pokeapi.co/api/v2/pokemon";

//// get data on 1 pokemon =>
$.get(url + '/charizard').done(function(data) {
    console.log(data);
    console.log(data.id)
    console.log(data.name)

    const output = mapToDiv(data);
    $('#output-container').html(output);
});

//get all pokemon =>
// $.ajax('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').done(function (data, status) {
//     console.log("AJAX call completed successfully!");
//     console.log("Request status: " + status);
//     console.log("Data returned from server:");
//     console.log(data);
//
//     //// loop thru all pokemon data =>
//     data.results.forEach(data =>
//         // console.log(pokemon.url)
//         $.ajax('https://pokeapi.co/api/v2/pokemon/' + data.name).then(function (data, status) {
//
//             // const output = mapToDiv(data);
//             // $('#output-container').html(output);
//
//             console.log(data);
//         })
//     );
//
// }).fail(function (status, error) {
//     alert("There was an error! Check the console for details");
//     console.log("Response status: " + status);
//     console.log("Error object: " + error)
// }).always(function () {
//     // alert("Gotta catch 'em all!");
// });

const mapToDiv = (pokemon) => `<div id="pokemon${pokemon.id}" class="pokemon-card">

     <div class="title content">${pokemon.name}</div>
     <div class="content"><img src="${pokemon.sprites.front_default}" alt="pokemon"></div>
<!--     <div class="content">Weight: ${pokemon.weight} lbs</div>-->
     <div class="content">Type: ${getTypes(pokemon)}</div>
     <div class="content">Abilities: ${getAbilities(pokemon)}</div>
      
      </div>`;

function getTypes(pokemon){
    if (pokemon.types.length > 1){
        return pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
    } else {
        return pokemon.types[0].type.name;
    }
}

function getAbilities(pokemon){
    if (pokemon.types.length === 4) {
        return pokemon.abilities[0].ability.name
            + "/" + pokemon.abilities[1].ability.name
            + "/" + pokemon.abilities[2].ability.name
            + "/" + pokemon.abilities[3].ability.name;
    } else if (pokemon.types.length === 3){
        return pokemon.abilities[0].ability.name
            + "/" + pokemon.abilities[1].ability.name
            + "/" + pokemon.abilities[2].ability.name;
    } else  if (pokemon.types.length === 2) {
        return pokemon.abilities[0].ability.name
            + "/" + pokemon.abilities[1].ability.name;
    } else {
        return pokemon.abilities[0].ability.name;
    }
}
