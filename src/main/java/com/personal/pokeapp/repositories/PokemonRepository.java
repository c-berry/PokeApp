package com.personal.pokeapp.repositories;

import com.personal.pokeapp.models.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

    Pokemon findByName(String name);


    boolean existsByApiId(long id);
}
