package com.personal.pokeapp.controllers;

import com.personal.pokeapp.repositories.PokemonRepository;
import com.personal.pokeapp.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {

    private final PokemonRepository pokemonDao;
    private final UserRepository userDao;

    public MainController(PokemonRepository pokemonDao, UserRepository userDao) {
        this.pokemonDao = pokemonDao;
        this.userDao = userDao;
    }

    @GetMapping
    public String main(){

        return "index/main";
    }


}
