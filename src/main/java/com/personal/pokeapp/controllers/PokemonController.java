package com.personal.pokeapp.controllers;

import com.personal.pokeapp.models.Pokemon;
import com.personal.pokeapp.repositories.PokemonRepository;
import com.personal.pokeapp.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.MapsId;

@Controller
@RequestMapping("/pokemon")
public class PokemonController {

    private final PokemonRepository pokemonDao;
    private final UserRepository userDao;

    public PokemonController(PokemonRepository pokemonDao, UserRepository userDao) {
        this.pokemonDao = pokemonDao;
        this.userDao = userDao;
    }

    @GetMapping("/{name}")
    public String viewPokemon(@PathVariable String name, Model model) {

        Pokemon pokemon = pokemonDao.findByName(name);

        model.addAttribute("pokemon", pokemon);

        return "index/pokemon";
    }

}
