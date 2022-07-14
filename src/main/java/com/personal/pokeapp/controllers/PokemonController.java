package com.personal.pokeapp.controllers;

import com.personal.pokeapp.models.Ability;
import com.personal.pokeapp.models.Pokemon;
import com.personal.pokeapp.models.Type;
import com.personal.pokeapp.repositories.PokemonRepository;
import com.personal.pokeapp.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.persistence.MapsId;
import java.text.DecimalFormat;
import java.util.List;

@Controller
@RequestMapping("/pokemon")
public class PokemonController {

    private final PokemonRepository pokemonDao;
    private final UserRepository userDao;
    private static final DecimalFormat df = new DecimalFormat("0.00");

    public PokemonController(PokemonRepository pokemonDao, UserRepository userDao) {
        this.pokemonDao = pokemonDao;
        this.userDao = userDao;
    }

    @GetMapping("/{name}")
    public String viewPokemon(@PathVariable String name, Model model) {

        Pokemon pokemon = pokemonDao.findByName(name);
        List<Ability> abilities = pokemon.getAbility();
        List<Type> types = pokemon.getType();
        String heightInches = df.format(pokemon.getHeight() * 3.93701);
        String weightLbs = df.format(pokemon.getWeight() * 0.220462);

        model.addAttribute("pokemon", pokemon);
        model.addAttribute("abilities", abilities);
        model.addAttribute("types", types);
        model.addAttribute("height", heightInches);
        model.addAttribute("weight", weightLbs);

        return "index/pokemon";
    }

    @PostMapping("/save")
    public String savePokemon(
            @RequestParam(name = "id") long id,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "weight") int weight,
            @RequestParam(name = "height") int height,
            @RequestParam(name = "official-art") String officalart,
            @RequestParam(name = "sprite") String sprite,
            @RequestParam(name = "sprite-shiny") String spriteshiny,
            @RequestParam(name = "types") List<Type> types,
            @RequestParam(name = "abilities") List<Ability> abilities) {

        Pokemon pokemon = new Pokemon(id, name, weight, height, officalart, sprite, spriteshiny, types, abilities);

        if(pokemonDao.existsByApiId(id)){
            return "redirect:/pokemon";
        }

        pokemonDao.save(pokemon);

        return "redirect:/pokemon";
    }

    @GetMapping()
    public String viewFavorites(Model model) {

        List<Pokemon> favoritePokemon = pokemonDao.findAll();

        model.addAttribute("favoritePokemon", favoritePokemon);

        return "index/favorites";
    }

} //end of Controller

