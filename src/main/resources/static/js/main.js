"use strict";

const url = "https://pokeapi.co/api/v2/pokemon";

// get data on 1 pokemon =>
function getCharizard(){
    $.get(url + '/charizard').done(function(data) {
        console.log(data);
        console.log(data.id);
        console.log(data.name);
        console.log(data.abilities);

        const output = dataToDiv(data);
        $('#output-container').html(output);
    });
}
// getCharizard();

//get data on 1 pokemon using fetch =>
function getOnePokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            // const output = dataToDiv(data);
            // $('#output-container').html(output);
        });
}
// getOnePokemon();

//get all pokemon =>
function getAllPokemon(){
    $.ajax(url + '?limit=150&offset=0').done(function (data, status) {
        console.log("AJAX call completed successfully!");
        console.log("Request status: " + status);
        console.log("Data returned from server:");
        console.log(data);

        //// loop thru all pokemon data =>
        data.results.forEach(pokemon =>
            // console.log(pokemon.url)
            $.ajax('https://pokeapi.co/api/v2/pokemon/' + pokemon.name).done(function (pokemon, status) {

                const output = dataToDiv(pokemon);
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

}
// getAllPokemon();


//output pokemon data to html view =>
const dataToDiv = (pokemon) => `<div id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-1">
     <div class="content">${getName(pokemon)}</div>
     <div class="content"><img src="${getPic(pokemon)}" alt="pokemon" class="main-pokemon-img"></div>
     <div class="content">Type: ${getTypes(pokemon)}</div>
     <div class="content">Ability: ${getAbilities(pokemon)}</div>
     <div class="content">Height: ${convertHeight(pokemon)}</div>
     <div class="content">Weight: ${convertWeight(pokemon)} lbs</div>  
     
     <input type="hidden" id="name" value="${pokemon.name}">
     <button class="view content" data-id="${pokemon.name}" >View</button>
     
      </div>`;

//redirect to singular view =>
// function viewPokemon(){
//     $(".view").on("click", function () {
//         let name = $("#name").val();
//         window.location.href = "/pokemon/" + name;
//     });
// }

function viewPokemon2(){

}

function viewPokemon3(name){
    window.location.href = "/pokemon/" + name;
}

// $(".view").click(function (e) {
//
//     alert("yo!");
//     const clickedId = e.target.dataset.id;
//     console.log(clickedId);
// });

document.querySelector('.view').addEventListener('click', function (e) {
    alert("yo!");
    const clickedId = e.target.dataset.id;
    console.log(clickedId);
});

const dataToForm = (pokemon) => `<form id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-1">
     <input type="hidden">${pokemon.name}</div>
     <input type="hidden"><img src="${getPic(pokemon)}" alt="pokemon" class="main-pokemon-img"></div>
     <input type="hidden">Type: ${getTypes(pokemon)}</div>
     <input type="hidden">Ability: ${pokemon.abilities}</div>
     <input type="hidden">Height: ${pokemon.height}</div>
     <input type="hidden" id="${pokemon.name}"/>
      
      </form>`;



//remove hyphens from names and cap first letter =>
function getName(pokemon) {
    if (pokemon.name.includes("-")) {
        let hyphen = pokemon.name.indexOf("-");
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(0, hyphen);
    } else {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
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


//does not work with loop:
// fetch(url + '/charizard')
//     .then(response => response.json())
//     .then(response =>
//
//         // response.results.forEach(response => {
//         //     $('#output-container').append(dataToDiv(response))
//         // })
//         $('#output-container').html(dataToDiv(response))
//
//     )
//     .catch(err => console.error(err));