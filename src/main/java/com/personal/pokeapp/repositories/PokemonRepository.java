package com.personal.pokeapp.repositories;

import com.personal.pokeapp.models.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

    Pokemon findByName(String name);

    boolean existsByApiId(long id);

    @Query(value = "SELECT * FROM pokemon_db.pokemon p ORDER BY p.api_id", nativeQuery = true)
    List<Pokemon> findAllFavorites();

}
