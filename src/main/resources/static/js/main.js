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
$.ajax(url + '?limit=100000&offset=0').done(function (data, status) {
    console.log("AJAX call completed successfully!");
    console.log("Request status: " + status);
    console.log("Data returned from server:");
    console.log(data);

    //// loop thru all pokemon data =>
    data.results.forEach(pokemon =>
        // console.log(pokemon.url)
        $.ajax('https://pokeapi.co/api/v2/pokemon/' + pokemon.name).done(function (pokemon, status) {

            const output = mapToDiv(pokemon);
            $('#output-container').append(output);

            console.log(pokemon);
        })
    );



}).fail(function (status, error) {
    alert("There was an error! Check the console for details");
    console.log("Response status: " + status);
    console.log("Error object: " + error)
}).always(function () {
    // alert("Gotta catch 'em all!");
});

// function sortPokemon(pokemon) {
//     let
// }

//output pokemon data to html view =>
const mapToDiv = (pokemon) => `<div id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-1">

     <div class="content">${getName(pokemon)}</div>
     <div class="content"><img src="${getPic(pokemon)}" alt="pokemon" class="main-pokemon-img"></div>
     <div class="content">Type: ${getTypes(pokemon)}</div>
     <div class="content">Ability: ${getAbilities(pokemon)}</div>
     <div class="content">Height: ${convertHeight(pokemon)}</div>
     <div class="content">Weight: ${convertWeight(pokemon)} lbs</div>   
      
      </div>`;

//remove hyphens from names =>
function getName(pokemon) {
    if (pokemon.name.includes("-")) {
        let hyphen = pokemon.name.indexOf("-");
        return pokemon.name.substring(0, hyphen);
    } else {
        return pokemon.name;
    }
}

//use default pic if nothing available =>
function getPic(pokemon) {
    if (pokemon.sprites.front_default === null){
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    } else {
        return pokemon.sprites.front_default;
    }
}

//get typing of pokemon since only some have two =>
function getTypes(pokemon) {
    if (pokemon.types.length > 1){
        return pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
    } else {
        return pokemon.types[0].type.name;
    }
}

//get abilities of a pokemon based on size of array =>
function getAbilities(pokemon) {
    if (pokemon.abilities.length === 4) {
        return pokemon.abilities[0].ability.name
            + "/" + pokemon.abilities[1].ability.name
            + "/" + pokemon.abilities[2].ability.name
            + "/" + pokemon.abilities[3].ability.name;
    } else if (pokemon.abilities.length === 3){
        return pokemon.abilities[0].ability.name
            + "/" + pokemon.abilities[1].ability.name
            + "/" + pokemon.abilities[2].ability.name;
    } else  if (pokemon.abilities.length === 2) {
        return pokemon.abilities[0].ability.name
            + "/" + pokemon.abilities[1].ability.name;
    } else if (pokemon.abilities.length === 1){
        return pokemon.abilities[0].ability.name;
    } else {
        return "N/A";
    }
}

function convertWeight(pokemon) {
    let hectogramToPound = pokemon.weight * 0.220462;
    return hectogramToPound.toFixed(0);
}

function convertHeight(pokemon) {
    let decimeterToInch = pokemon.height * 3.93701;

    let totalFeet = decimeterToInch * 0.083333;
    let feetArr = totalFeet.toString().split(".");
    let feet = feetArr[0];

    let inches2 = "0." + feetArr[1];
    let inchesLeftover = parseFloat(inches2) * 12;

    if (inchesLeftover >= 10 && feet >= 1) {
        let inches = inchesLeftover.toString().substring(0, 2);
        return feet + "\'" + inches + "\"";
    }
    if (inchesLeftover < 10 && feet >= 1) {
        let inches = inchesLeftover.toString().substring(0, 1);
        return feet + "\'" + inches + "\"";
    }
    if (inchesLeftover >= 10 && feet < 1) {
        let inches = inchesLeftover.toString().substring(0, 2);
        return inches + " inches";
    }
    if (inchesLeftover < 10 && feet < 1) {
        let inches = inchesLeftover.toString().substring(0, 1);
        return inches + " inches";
    }
}

