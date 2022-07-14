"use strict";

const url = "https://pokeapi.co/api/v2/pokemon/";
const url2 = "https://pokeapi.co/api/v2/pokemon";

function searchPokemon(pokemon){
    $.ajax(url + pokemon).done(function (data, status) {
        console.log("AJAX call completed successfully!");
        console.log("Request status: " + status);
        console.log("Data returned from server:");
        console.log(data);
        // console.log(data.sprites)
        console.log(data.types);
        console.log(getTypes2(data.types));
        console.log(data.abilities);
        console.log(getAbilities2(data.abilities));

        $('#output-container').html(dataToDiv2(data));
    });
}

//get data on 1 pokemon using fetch but there are issues when looping due to promises =>
function fetchPokemon(pokemon){
    fetch(url + pokemon)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            $('#output-container').html(dataToDiv(data));
        });
}
// fetchPokemon();

//get all pokemon =>
function getAllPokemon(){
    $.ajax(url2 + '?limit=2000&offset=0').done(function (data, status) {
        console.log("AJAX call completed successfully!");
        console.log("Request status: " + status);
        console.log("Data returned from server:");
        console.log(data);

        //// loop thru all pokemon data =>
        data.results.forEach(pokemon =>
            // console.log(pokemon.url)
            $.ajax(url + pokemon.name).done(function (pokemon) {

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

//WIP: format data to form for db =>
function pokemonToForm(pokemon) {
    $.ajax(url + pokemon).done(function (data) {
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
    $("#output-container").html("");
}

//clear favorite output container =>
function clearPokemon2(){
    $("#favorites").html("");
}

//search bar function on click =>
$("#search-btn").click(function (e) {
    e.preventDefault();
    clearPokemon();
    let pokemon = $("#search-input").val();
    searchPokemon(pokemon);
});

// //search on enter/return key press =>
// $("#search-input").keyup(function (e) {
//     if (e.keyCode === 13){
//         e.preventDefault();
//         clearPokemon();
//         const pokemon = $("#search-input").val();
//         searchPokemon(pokemon);
//    
// });

////responsive search =>
$("#search-input").keyup(function (e) {
    e.preventDefault();
    clearPokemon();
    let pokemon = $("#search-input").val();
    searchPokemon(pokemon);
});

//redirect to singular view from db on click =>
function viewPokemon(pokemon){
    // alert(pokemon);
    window.location.href = "/pokemon/" + pokemon;
}

//single view of pokemon on click =>
function viewPokemon2(pokemon){
    // alert(pokemon);
    clearPokemon();
    clearPokemon2();
    getPokemon2(pokemon);
}

//single view of pokemon sprites on click =>
function viewPokemon3(pokemon){
    // alert(pokemon);
    clearPokemon();
    getPokemon3(pokemon);
}

//get all pokemon on click =>
$("#view-all-pokemon").click(function () {
    clearPokemon();
    getAllPokemon();
});

//get all Kanto pokemon on click =>
$("#view-kanto-pokemon").click(function () {
    clearPokemon();
    getKantoPokemon();
});

//get all Johto pokemon on click =>
$("#view-johto-pokemon").click(function () {
    clearPokemon();
    getJohtoPokemon();
});

//get all Hoenn pokemon on click =>
$("#view-hoenn-pokemon").click(function () {
    clearPokemon();
    getHoennPokemon();
});

//get all Sinnoh pokemon on click =>
$("#view-sinnoh-pokemon").click(function () {
    clearPokemon();
    getSinnohPokemon();
});

//get all Unova pokemon on click =>
$("#view-unova-pokemon").click(function () {
    clearPokemon();
    getUnovaPokemon();
});

//get all Kalos pokemon on click =>
$("#view-kalos-pokemon").click(function () {
    clearPokemon();
    getKalosPokemon();
});

//get all Alola pokemon on click =>
$("#view-alola-pokemon").click(function () {
    clearPokemon();
    getAlolaPokemon();
});

//get all Galar pokemon on click =>
$("#view-galar-pokemon").click(function () {
    clearPokemon();
    getGalarPokemon();
});

//get all Hisui pokemon on click =>
$("#view-hisui-pokemon").click(function () {
    clearPokemon();
    getHisuiPokemon();
});

// get more data on 1 pokemon on main page =>
function getPokemon2(pokemon){
    $.ajax(url + pokemon).done(function(data) {
        console.log(data);
        console.log(data.id);
        console.log(data.name);

        $('#output-container').append(dataToDiv2(data));
    });
}

// get sprite data on 1 pokemon on click after using getPokemon2=>
function getPokemon3(pokemon){
    $.ajax(url + pokemon).done(function(data) {
        console.log(data);
        console.log(data.id);
        console.log(data.name);

        $('#output-container').append(dataToDiv3(data));
    });
}

// this fn is used by methods based on region:
// get data on 1 pokemon =>
function getPokemon(pokemon){
    $.ajax(url + pokemon).done(function(data) {
        // console.log(data);
        // console.log(data.id);
        // console.log(data.name);

        $('#output-container').append(dataToDiv(data));
    });
}

//loop through gen 1 Kanto pokemon by id =>
function getKantoPokemon() {
    clearPokemon();
    for (let i = 0; i <= 151; i++) {
        getPokemon(i);
    }
}

//loop through gen 2 Johto pokemon by id =>
function getJohtoPokemon() {
    clearPokemon();
    for (let i = 152; i <= 251; i++) {
        getPokemon(i);
    }
}

//loop through gen 3 Hoenn pokemon by id =>
function getHoennPokemon() {
    clearPokemon();
    for (let i = 252; i <= 386; i++) {
        getPokemon(i);
    }
}

//loop through gen 4 Sinnoh pokemon by id =>
function getSinnohPokemon() {
    clearPokemon();
    for (let i = 387; i <= 493; i++) {
        getPokemon(i);
    }
}

//loop through gen 5 Unova pokemon by id =>
function getUnovaPokemon() {
    clearPokemon();
    for (let i = 494; i <= 649; i++) {
        getPokemon(i);
    }
}

//loop through gen 6 Kalos pokemon by id =>
function getKalosPokemon() {
    clearPokemon();
    for (let i = 650; i <= 721; i++) {
        getPokemon(i);
    }
}

//loop through gen 7 Alolan pokemon by id =>
function getAlolaPokemon() {
    clearPokemon();
    for (let i = 722; i <= 809; i++) {
        getPokemon(i);
    }
}

//loop through gen 8 Galarian pokemon by id =>
function getGalarPokemon() {
    clearPokemon();
    for (let i = 810; i <= 898; i++) {
        getPokemon(i);
    }
}

//loop through Husian pokemon by id =>
function getHisuiPokemon() {
    clearPokemon();
    for (let i = 900; i <= 905; i++) {
        getPokemon(i);
    }
}

//output pokemon data to html view =>
const dataToDiv = (pokemon) => `<div id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-2" onclick="viewPokemon2('${pokemon.name}')">
    <div class="content pokemon-number">No. ${pokemon.id}</div>
    <div class="content pokemon-name">${getName(pokemon)}</div>
    <div class="content"><img src="${getPic(pokemon)}" alt="pokemon-official-artwork" class="main-pokemon-img"></div>
    <div class="content pokemon-number">(Click for details)</div>
    
    </div>`;

//output pokemon data to html view =>
const dataToDiv2 = (pokemon) => `<form action="/pokemon/save" method="POST">

    <div id="pokemon${pokemon.id}" class="view-pokemon-card mx-auto my-auto px-2 py-2">
        <div class="content pokemon-number">No. ${pokemon.id}</div>
        <div class="content view-pokemon-name">${getName(pokemon)}</div>
        <div class="content pokemon-number" onclick="viewPokemon3('${pokemon.name}')">(Click to view game sprites)</div>
        <div class="content mb-1" onclick="viewPokemon3('${pokemon.name}')"><img src="${getPic(pokemon)}" alt="pokemon-official-artwork" class="view-pokemon-img"></div>
        <div class="content">Type: ${getTypes(pokemon.types)}</div>
        <div class="content">Ability: ${getAbilities(pokemon.abilities)}</div>
        <div class="content">Height: ${convertHeight(pokemon)}</div>
        <div class="content">Weight: ${convertWeight(pokemon)} lbs</div>
        
        <input type="hidden" name="id" value="${pokemon.id}"/>
        <input type="hidden" name="name" value="${pokemon.name}"/>
        <input type="hidden" name="official-art" value="${getPic(pokemon)}"/>
        <input type="hidden" name="sprite" value="${getSprite(pokemon)}"/>
        <input type="hidden" name="sprite-shiny" value="${getShinySprite(pokemon)}"/>
        <input type="hidden" name="types" value="${getTypes2(pokemon.types)}"/>
        <input type="hidden" name="abilities" value="${getAbilities2(pokemon.abilities)}"/>
        <input type="hidden" name="height" value="${pokemon.height}">  
        <input type="hidden" name="weight" value="${pokemon.weight}">
        
        <div class="content mt-2">
            <button type="submit" class="btn btn-success">Favorite</button>
        </div>
        
    </div>
</form>`;

//output game sprites to view =>
const dataToDiv3 = (pokemon) => `<form th:action="" th:method="POST">

        <div id="pokemon${pokemon.id}" class="view-pokemon-card mx-auto px-2 py-2" onclick="viewPokemon2('${pokemon.id}')">
            <div class="content pokemon-number">No. ${pokemon.id}</div>
            <div class="content view-pokemon-name">${getName(pokemon)}</div>
            <div class="content">
                <img src="${getSprite(pokemon)}" alt="pokemon-sprite" class="main-pokemon-img">
                <img src="${getSprite2(pokemon)}" alt="pokemon" class="main-pokemon-img">
            </div>
            <div class="content">
                <img src="${getShinySprite(pokemon)}" alt="pokemon-sprite" class="main-pokemon-img">
                <img src="${getShinySprite2(pokemon)}" alt="pokemon-sprite" class="main-pokemon-img">
            </div>  
        
        </div>
    </form>`;

//output pokemon data to form for db =>
const dataToForm = (pokemon) => `<form id="pokemon${pokemon.id}" class="main-pokemon-card px-2 py-1">
    <input type="hidden" value="${pokemon.id}"/>
    <input type="hidden" value="${pokemon.name}"/>
    <input type="hidden" value="${getSprite(pokemon)}"/>
    <input type="hidden" value="${getShinySprite(pokemon)}"/>
    <input type="hidden" value="${getTypes2(pokemon.types)}"/>
    <input type="hidden" value="${getAbilities2(pokemon.abilities)}"/>
    <input type="hidden" value="${pokemon.height}">
    <input type="hidden" id="${pokemon.name}"/>
    
    </form>`;

//remove hyphens from names and cap first letter =>
function getName(pokemon) {
    if (pokemon.name === "meganium") {
        return "Meganium";
    }
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
    if (pokemon.name.includes("mr-mime")) {
        return "Mr. Mime";
    }
    if (pokemon.name.includes("mr-rime")) {
        return "Mr. Rime";
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
    if (pokemon.sprites.other["official-artwork"].front_default === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    } else {
       return pokemon.sprites.other["official-artwork"].front_default;
    }
}

//use default pic if nothing available =>
function getSprite(pokemon) {
    if (pokemon.sprites.front_default === null && pokemon.sprites.other["official-artwork"].front_default === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    }
    if (pokemon.sprites.front_default === null) {
        return pokemon.sprites.other["official-artwork"].front_default;
    } else {
        return pokemon.sprites.front_default;
    }
}

//use default pic if nothing available =>
function getSprite2(pokemon) {
    if (pokemon.sprites.back_default === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    } else {
        return pokemon.sprites.back_default;
    }
}

//get shiny variant pic or default if nothing available =>
function getShinySprite(pokemon) {
    if (pokemon.sprites.front_shiny === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    } else {
        return pokemon.sprites.front_shiny;
    }
}

//use default pic if nothing available =>
function getShinySprite2(pokemon) {
    if (pokemon.sprites.back_shiny === null) {
        return "https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png";
    } else {
        return pokemon.sprites.back_shiny;
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

//get only type names from array =>
function getTypes2(arr){
    let types =[];
    for (let i = 0; i < arr.length; i++){
        types.push(arr[i].type.name);
    }
    return types;
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

function getAbilities2(arr) {
    let abilities = [];
    for (let i = 0; i < arr.length; i++) {
        abilities.push(arr[i].ability.name);
    }
    return abilities;
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

function redirectToMain(pokemon){
    window.location = "/";
    // setTimeout(function () {
    //     viewPokemon2(pokemon)}, 5000);
}


