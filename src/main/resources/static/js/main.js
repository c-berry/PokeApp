"use strict";

const url = "https://pokeapi.co/api/v2/pokemon";

// get data on 1 pokemon =>
function getPokemon(pokemon){
    $.get(url + '/' + pokemon).done(function(data) {
        console.log(data);
        console.log(data.id);
        console.log(data.name);

        $('#output-container').append(dataToDiv(data));
    });
}

function searchPokemon(pokemon){
    $.ajax(url + '/' + pokemon).done(function (data, status) {
        console.log("AJAX call completed successfully!");
        console.log("Request status: " + status);
        console.log("Data returned from server:");
        console.log(data);
        // console.log(data.sprites)
        // console.log(data.abilities);

        $('#output-container').html(dataToDiv(data));
    });
}

//get data on 1 pokemon using fetch but there are issues when looping due to promises =>
function fetchOnePokemon(pokemon){
    fetch(url + "/" + pokemon)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            $('#output-container').html(dataToDiv(data));
        });
}
// fetchOnePokemon();

//get all pokemon =>
function getAllPokemon(){
    $.ajax(url + '?limit=2000&offset=0').done(function (data, status) {
        console.log("AJAX call completed successfully!");
        console.log("Request status: " + status);
        console.log("Data returned from server:");
        console.log(data);

        //// loop thru all pokemon data =>
        data.results.forEach(pokemon =>
            // console.log(pokemon.url)
            $.ajax(url + "/" + pokemon.name).done(function (pokemon) {

                $('#output-container').append(dataToDiv(pokemon));
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

function pokemonToForm(pokemon) {
    $.ajax(url + "/" + pokemon).done(function (data) {
        // const pokemon = {
        //     id: data.id,
        //     name: data.name,
        //     sprite: getPic(data),
        //     shinysprite: getShinyPic(data),
        //     types: data.types,
        //     abilities: data.abilities,
        //     height: data.height,
        //     weight: data.weight
        //
        // }

        $('#output-container').html(dataToForm(data));
        const form = document.getElementById("myForm");
        form.submit();
    });
}

//clear output container =>
function clearPokemon() {
    $("#output-container").html("")
}

//search bar function on click =>
$("#search-btn").click(function (e) {
    e.preventDefault();
    clearPokemon();
    const pokemon = $("#search-input").val();
    searchPokemon(pokemon);
});

//search on enter/return key press =>
$("#search-input").keyup(function (e) {
    if (e.keyCode === 13){
        e.preventDefault();
        clearPokemon();
        const pokemon = $("#search-input").val();
        searchPokemon(pokemon);
    }
});

////responsive search =>
// $("#search-input").keyup(function (e) {
//     e.preventDefault();
//     clearPokemon();
//     const pokemon = $("#search-input").val();
//     searchPokemon(pokemon);
// });

//redirect to singular view in click=>
function viewPokemon(name){
    // alert(name);
    window.location.href = "/pokemon/" + name;
}

//get all pokemon on click =>
$('#view-all-pokemon').click(function () {
    clearPokemon();
    getAllPokemon();
});

//loop through gen 1 Kanto pokemon by id =>
function getKantoPokemon() {
    for (let i = 0; i <= 151; i++) {
        getPokemon(i);
    }
}

//loop through gen 2 Johto pokemon by id =>
function getJohtoPokemon() {
    for (let i = 152; i <= 251; i++) {
        getPokemon(i);
    }
}

//loop through gen 3 Hoenn pokemon by id =>
function getHoennPokemon() {
    for (let i = 252; i <= 386; i++) {
        getPokemon(i);
    }
}

//loop through gen 4 Sinnoh pokemon by id =>
function getSinnohPokemon() {
    for (let i = 387; i <= 493; i++) {
        getPokemon(i);
    }
}

//loop through gen 5 Unova pokemon by id =>
function getUnovaPokemon() {
    for (let i = 494; i <= 649; i++) {
        getPokemon(i);
    }
}

//loop through gen 6 Kalos pokemon by id =>
function getKalosPokemon() {
    for (let i = 650; i <= 721; i++) {
        getPokemon(i);
    }
}

//loop through gen 7 Alolan pokemon by id =>
function getAlolaPokemon() {
    for (let i = 722; i <= 809; i++) {
        getPokemon(i);
    }
}

//loop through gen 8 Galarian pokemon by id =>
function getGalarPokemon() {
    for (let i = 810; i <= 898; i++) {
        getPokemon(i);
    }
}

//loop through Husian pokemon by id =>
function getHisuiPokemon() {
    for (let i = 900; i <= 905; i++) {
        getPokemon(i);
    }
}

//output pokemon data to html view =>
const dataToDiv = (pokemon) => `<div id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-1" onclick="viewPokemon('${pokemon.name}')">
     <div class="content pokemon-name">${getName(pokemon)}</div>
     <div class="content">#${pokemon.id}</div>
     <div class="content"><img src="${getPic(pokemon)}" alt="pokemon" class="main-pokemon-img"></div>
     <div class="content">Type: ${getTypes(pokemon.types)}</div>
     <div class="content">Ability: ${getAbilities(pokemon.abilities)}</div>
     <div class="content">Height: ${convertHeight(pokemon)}</div>
     <div class="content">Weight: ${convertWeight(pokemon)} lbs</div>  
     
     </div>`;

//output pokemon data to form for db =>
const dataToForm = (pokemon) => `<form id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-1">
     <input type="hidden">${pokemon.name}</div>
     <input type="hidden"><img src="${getPic(pokemon)}" alt="pokemon" class="main-pokemon-img"></div>
     <div class="content"><img src="${getShinyPic(pokemon)}" alt="pokemon" class="main-pokemon-img"></div>
     <input type="hidden">Type: ${getTypes(pokemon)}</div>
     <input type="hidden">Ability: ${pokemon.abilities}</div>
     <input type="hidden">Height: ${pokemon.height}</div>
     <input type="hidden" id="${pokemon.name}"/>
      
     </form>`;

//remove hyphens from names and cap first letter =>
function getName(pokemon) {
    if (pokemon.name.includes("mega")) {
        let hyphen = pokemon.name.indexOf("-");
        return pokemon.name.charAt(hyphen + 1).toUpperCase() + pokemon.name.slice(hyphen + 2)
            + " " + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, hyphen);
    }
    if (pokemon.name.includes("gmax")){
        let hyphen = pokemon.name.indexOf("-");
        return "G-Max"
            + " " + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, hyphen);
    }
    if (pokemon.name.includes("-")) {
        let hyphen = pokemon.name.indexOf("-");
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, hyphen);
    } else {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    }
}

//use default pic if nothing available =>
function getPic(pokemon) {
    if (pokemon.sprites.front_default === null && pokemon.sprites.other["official-artwork"].front_default === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    }
    if (pokemon.sprites.front_default === null) {
        return pokemon.sprites.other["official-artwork"].front_default;
    } else {
        return pokemon.sprites.front_default;
    }
}

//get shiny variant pic or default if nothing available =>
function getShinyPic(pokemon) {
    if (pokemon.sprites.front_shiny === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    } else {
        return pokemon.sprites.front_shiny;
    }
}

//format typing of pokemon based on size of array =>
function getTypes(arr) {
    if (arr.length > 1){
        return arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1)
            + "/" + arr[1].type.name.charAt(0).toUpperCase() + arr[1].type.name.slice(1);
    } else {
        return arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1)
    }
}

//format abilities of a pokemon based on size of array =>
function getAbilities(arr) {
    if (arr.length === 3){
        return arr[0].ability.name.charAt(0).toUpperCase() + arr[0].ability.name.slice(1)
            + "/" + arr[1].ability.name.charAt(0).toUpperCase() + arr[1].ability.name.slice(1)
            + "/" + arr[2].ability.name.charAt(0).toUpperCase() + arr[2].ability.name.slice(1);
    } else  if (arr.length === 2) {
        return arr[0].ability.name.charAt(0).toUpperCase() + arr[0].ability.name.slice(1)
            + "/" + arr[1].ability.name.charAt(0).toUpperCase() + arr[1].ability.name.slice(1)
    } else if (arr.length === 1){
        return arr[0].ability.name.charAt(0).toUpperCase() + arr[0].ability.name.slice(1);
    } else {
        return "N/A";
    }
}

//format weight =>
function convertWeight(pokemon) {
    let hectogramToPound = pokemon.weight * 0.220462;
    return hectogramToPound.toFixed(0);
}

//format height =>
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
