package com.personal.pokeapp.controllers;

import com.personal.pokeapp.models.Ability;
import com.personal.pokeapp.models.Pokemon;
import com.personal.pokeapp.models.Type;
import com.personal.pokeapp.repositories.PokemonRepository;
import com.personal.pokeapp.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

}
